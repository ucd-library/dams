const config = require('../config');
const {logger, models} = require('@ucd-lib/fin-service-utils');
const cors = require('cors');
const v1CollectionLookup = require('./v1-collections.json');
let item, collection;

let idRegExp = /(ark|doi):\/?[a-zA-Z0-9\.]+\/[a-zA-Z0-9\.]+/;

module.exports = async (app) => {
  /**
   * listen for /ark: or /doi:
   */
  app.get(/^\/(ark|doi):*/, cors(), handleRequest);
  app.get(/^\/collection\//, checkForCollectionRedirect);
  item = (await models.get('item')).model;
  collection = (await models.get('collection')).model;
};

async function checkForCollectionRedirect(req, resp, next) {
  // if an ark, doi or skip
  if( req.originalUrl.match(idRegExp) ) {
    return next();
  }

  let fullId = req.originalUrl.replace(/\/collection\//, '');
  let id = fullId.split('/')[0];
  if( v1CollectionLookup[id] ) {
    resp.redirect(301, '/collection/'+v1CollectionLookup[id]+'?from=v1');
    return;
  }

  next();
}

/**
 * @function handleRequest
 * @description handle express request
 * 
 * @param {Object} req express request
 * @param {Object} resp express response
 */
async function handleRequest(req, resp) {
  let info = {};

  // split apart id, type and suffix from url
  try {
    info = req.url.split(idRegExp);
    info = {
      id : req.url.match(idRegExp)[0],
      type : info[1],
      suffix : info[2]
    }
  } catch(e) { 
    logger.info('error parsing ark/doi request: ', req.originalUrl, e);
    return resp.status(400).send('Bad request');
  }

  // request record from identifier field in elasticsearch
  let record;
  let isCollection = false;
  try {
    record = await item.getByArk(info.id);
    if( !record.results.length ) {
      record = await collection.getByArk(info.id);
      isCollection = true;
    }
  } catch(e) {
    logger.info('error looking up ark: ', info, e);
    return resp.status(500).json({error: true, message: e.message, stack: e.stack});
  }

  // if we dont find a record, send unknown id message
  if( !record.results.length ) {
    return resp.status(404).send(`Unknown ${info.type} identifier: ${info.id}`);
  }

  let id = record.results[0]['@id'];

  // if the Accept header contains text/html and there is no
  // suffix in the url, ie just the ark or doi is provided
  // redirect to ucd dams UI.  otherwise send to fcrepo UI
  if( (req.get('accept') || '').match(/text\/html/) ) {
    if( isCollection ) {
      resp.redirect(id);
    } else {
      resp.redirect(id+info.suffix);
    }
  } else {
    resp.redirect(config.fcrepo.root+id+info.suffix);
  }
};

