const httpProxy = require('http-proxy');

const fcrepo = httpProxy.createProxyServer({
  selfHandleResponse: true,
  proxyTimeout: 30000,
  timeout: 30000
});

async function middleware(req, res, next) {
  if( req.url.match(/^\/fcrepo/) ) {
    let fcrepoPath = req.url.replace(/^\/fcrepo(\/rest)?/, '');

    let service = null;
    let servicePath = null;
    if( fcrepoPath.match(/\/svc:([a-zA-Z0-9]+)/) ) {
      service = fcrepoPath.match(/\/svc:([a-zA-Z0-9]+)/)[1];
      servicePath = fcrepoPath.replace(/.*\/svc:[a-zA-Z0-9]+/, '');
      fcrepoPath = fcrepoPath.replace(/\/svc:.*$/, '');
    }

    let method = req.method.toLowerCase();
    let headers = req.headers;
    let body = req.body;

    if( service === 'iiif' ) {
      // lookup cask hash path and redirect to iiif service with hashed path
    } else if( service === 'gcs' ) {
      // fetch from silver derivative products in cask
      // first part of the service path was the gcs bucket name, we can drop that
      servicePath = servicePath.replace(/^\/[a-zA-Z0-9]+/, '');
    } else if( service  ) {
      res.status(404).json({
        error : true,
        message : `Service not found: ${service}`
      });
    } else {
      // stream cask resource
    }

    return;
  }

  next();
}

module.exports = middleware;