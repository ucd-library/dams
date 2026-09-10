const assert = require('assert');
const express = require('express');
const request = require('supertest');

const config = require('../../config.js');
const middleware = require('../../lib/fcrepo-middeware.js');

describe('lib/fcrepo-middeware.js', () => {
  let originalFetch;
  let proxyWebCalls;

  function app() {
    let app = express();
    app.use(middleware);
    app.use((req, res) => res.status(404).send('not reached'));
    return app;
  }

  beforeEach(() => {
    originalFetch = global.fetch;
    proxyWebCalls = [];
    middleware.proxy.web = (req, res, opts) => {
      proxyWebCalls.push(opts);
      res.status(200).send('proxied');
    };
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('passes non-/fcrepo requests through untouched', async () => {
    let res = await request(app()).get('/health');
    assert.equal(res.status, 404);
    assert.equal(res.text, 'not reached');
    assert.equal(proxyWebCalls.length, 0);
  });

  it('404s when the requested path cannot be resolved against CaskFS', async () => {
    global.fetch = async () => ({ ok: true, json: async () => ({ totalCount: 0, results: [] }) });
    let res = await request(app()).get('/fcrepo/rest/ark:/87287/dNOPE');
    assert.equal(res.status, 404);
    assert.equal(proxyWebCalls.length, 0);
  });

  it('404s for an unrecognized svc: name without calling CaskFS', async () => {
    let fetchCalled = false;
    global.fetch = async () => { fetchCalled = true; return { ok: true, json: async () => ({}) }; };

    let res = await request(app()).get('/fcrepo/rest/ark:/87287/d73035/svc:bogus/foo');
    assert.equal(res.status, 404);
    assert.equal(fetchCalled, false);
  });

  it('proxies a plain resource stream to the resolved CaskFS path', async () => {
    global.fetch = async (url) => {
      assert.ok(url.includes('/api/find'));
      return {
        ok: true,
        json: async () => ({ totalCount: 1, results: [{ filepath: '/gold/digital-dev/item-a/item.jsonld.json' }] })
      };
    };

    let res = await request(app()).get('/fcrepo/rest/ark:/87287/d73035');

    assert.equal(res.status, 200);
    assert.equal(proxyWebCalls.length, 1);
    assert.equal(
      proxyWebCalls[0].target,
      `${config.cask.url}${config.cask.pathPrefix}/api/fs/gold/digital-dev/item-a/item.jsonld.json`
    );
    assert.equal(proxyWebCalls[0].ignorePath, true);
    assert.deepEqual(proxyWebCalls[0].headers, { 'x-user': JSON.stringify({ username: config.cask.user }) });
  });

  it('resolves svc:iiif to the CAS-resolved fullPath and proxies to the IIIF service', async () => {
    let findCalls = 0, metadataCalls = 0;
    global.fetch = async (url) => {
      if( url.includes('/api/find') ) {
        findCalls++;
        return {
          ok: true,
          json: async () => ({ totalCount: 1, results: [{ filepath: '/gold/digital-dev/item-a/photo.tif' }] })
        };
      }
      if( url.includes('metadata=true') ) {
        metadataCalls++;
        return { ok: true, json: async () => ({ fullPath: '/cas/ab/cd/abcd1234' }) };
      }
      throw new Error('unexpected fetch call: ' + url);
    };

    let res = await request(app()).get('/fcrepo/rest/ark:/87287/d73035/photo.tif/svc:iiif/info.json');

    assert.equal(res.status, 200);
    assert.equal(findCalls, 1);
    assert.equal(metadataCalls, 1);
    assert.equal(proxyWebCalls.length, 1);

    let expectedQuery = new URLSearchParams({ IIIF: '/cas/ab/cd/abcd1234/info.json' }).toString();
    assert.equal(proxyWebCalls[0].target, `${config.iiif.host}/fcgi-bin/iipsrv.fcgi?${expectedQuery}`);
    assert.equal(proxyWebCalls[0].ignorePath, true);
  });

  it('404s the svc:iiif branch when the resolved file has no binary content', async () => {
    global.fetch = async (url) => {
      if( url.includes('/api/find') ) {
        return {
          ok: true,
          json: async () => ({ totalCount: 1, results: [{ filepath: '/gold/digital-dev/item-a/photo.tif' }] })
        };
      }
      return { ok: true, json: async () => ({}) };
    };

    let res = await request(app()).get('/fcrepo/rest/ark:/87287/d73035/photo.tif/svc:iiif/info.json');
    assert.equal(res.status, 404);
    assert.equal(proxyWebCalls.length, 0);
  });

  it('strips the legacy gcs bucket segment before proxying the svc:gcs branch', async () => {
    global.fetch = async () => ({
      ok: true,
      json: async () => ({ totalCount: 1, results: [{ filepath: '/silver/g/c/latest/item-a' }] })
    });

    let res = await request(app()).get('/fcrepo/rest/ark:/87287/d73035/svc:gcs/some-bucket/manifest.json');

    assert.equal(res.status, 200);
    assert.equal(
      proxyWebCalls[0].target,
      `${config.cask.url}${config.cask.pathPrefix}/api/fs/silver/g/c/latest/item-a/manifest.json`
    );
  });

  it('returns 502 when CaskFS itself errors', async () => {
    global.fetch = async () => { throw new Error('connection refused'); };
    let res = await request(app()).get('/fcrepo/rest/ark:/87287/d73035');
    assert.equal(res.status, 502);
  });
});
