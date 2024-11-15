const express = require('express');
const path = require('path');
const fs = require('fs');
const spaMiddleware = require('@ucd-lib/spa-router-middleware');
const config = require('../config');
const fetch = require('node-fetch');
const authUtils = require('../lib/auth');
const appConfig = require('../lib/fcrepo-app-config');

const {seo, models, logger} = require('@ucd-lib/fin-service-utils');
const crypto = require('crypto');

// const transform = seo.recordTransform;
// const collectionTransform = seo.collectionTransform;

appConfig.reload(true);

let jsBundleHash = '';


module.exports = async (app) => {
  let assetsDir = path.join(__dirname, '..', 'client', config.client.assets);
  logger.info('CLIENT_ENV='+config.client.env.CLIENT_ENV+', Serving static assets from '+assetsDir);
  loadJsBundleHash(assetsDir);

  let collectionModel = await models.get('collection');
  collectionModel = collectionModel?.model;

  let recordModel = await models.get('item');
  recordModel = recordModel?.model;

  /**
   * Setup SPA app routes
   */
  spaMiddleware({
    app: app,
    htmlFile : path.join(assetsDir, 'index.html'),
    isRoot : true,
    appRoutes : config.client.appRoutes,
    getConfig : async (req, res, next) => {
      let user = req.user;

      if( user ) {
        if( !user.roles ) user.roles = [];
        if( user.roles.includes('admin') ) user.admin = true;
        user.loggedIn = true;
      } else {
        user = {loggedIn: false};
      }

      next({
        collectionLabels : await collectionModel.allLabels(),
        user : user,
        appRoutes : config.client.appRoutes,
        // recordCount: (await records.rootCount()).count,
        featuredImages : config.client.featuredImages,
        env : config.client.env,
        fcAppConfig : appConfig.config,
        title : config.client.title,
        logger : config.client.logger
      });
    },
    template : async (req, res, next) => {
      let jsonld = '';
      let isRecord = false;
      let isCollection = false;

      let parts = req.originalUrl.split('/').filter(p => p ? true : false);

      if( parts[0] === 'collection' ) {
        isCollection = '/'+parts.join('/');
      } else if( parts[0] === 'item' ) {
        isRecord = true;
      } else if( parts[0] === 'search' ) {
        isCollection = isSearchCollectionReq(req);
      }

      if( !isRecord && !isCollection ) {
        return next({
          jsonld,
          title : config.client.title,
          description : '',
          jsBundleHash
        });
      }

      try {
        if( isCollection ) {
          let collection = await collectionModel.get(isCollection);
          jsonld = JSON.stringify(collection, '  ', '  ');
    
          return next({
            jsonld,
            title : collection.name + ' - '+ config.client.title,
            description : collection.description || '',
            jsBundleHash
          })

        } else {
          let id = req.originalUrl;
          let record = await recordModel.get(id);
          record = record['@graph'].filter(r => r['@id'] === id)[0];
          jsonld = JSON.stringify(record, '  ', '  ');

          return next({
            jsonld,
            title : (record.name || record.title) + ' - '+ config.client.title,
            description : record.description || '',
            jsBundleHash
          })

        }
      } catch(e) {
        console.error(e);
        return next({
          jsonld,
          title : 'Server Error',
          description : 'Invalid URL: '+req.originalUrl
        })
      }
    }
  });

  /**
   * Setup static asset dir
   */
  app.use(express.static(assetsDir, {
    immutable: true,
    maxAge: '1y'
  }));
}

function loadJsBundleHash(assetsDir) {
  let hashFile = path.join(assetsDir, 'js', 'bundle.js');
  if( fs.existsSync(hashFile) ) {
    const fileBuffer = fs.readFileSync(hashFile);
    const hashSum = crypto.createHash('sha256');
    hashSum.update(fileBuffer);
    jsBundleHash = hashSum.digest('hex').toString().substring(0, 8);
    logger.info('Loaded js bundle hash: '+jsBundleHash);
  } else {
    setTimeout(() => {
      loadJsBundleHash(assetsDir);
    }, 5000);
  }
}

function isSearchCollectionReq(req) {
  if( !req.originalUrl.match(/^\/search/) ) {
    return false;
  } 

  // IMPORTANT note this is the request 
  // /search//%5B%5B"isPartOf.%40id"%2C"or"%2C"%2Fcollection%2Fexample_1-pets"%5D%5D//10/
  // but express returns this
  // /search/%5B%5B"isPartOf.%40id"%2C"or"%2C"%2Fcollection%2Fexample_1-pets"%5D%5D/10/
  // but if there is test in the query it would look like this
  // /search/test/%5B%5B"isPartOf.%40id"%2C"or"%2C"%2Fcollection%2Fexample_1-pets"%5D%5D//10/
  // so make sure to check type on JSON parse
  let [empty, path, filter] = req.originalUrl.split('/');
  if( !filter ) return false;

  try {
    filter = JSON.parse(decodeURIComponent(filter));
  } catch(e) {
    return false;
  }

  if( !Array.isArray(filter) ) return false;
  if( filter.length === 0 ) return false;
  filter = filter[0];

  if( filter.length < 3 ) return false;

  if( filter[0] === 'isPartOf.@id' && 
      filter[1] === 'or' &&
      filter[2].match(/^\/collection\//) ) {
    return filter[2];
  }

  return false;
}