const {dataModels, logger} = require('@ucd-lib/fin-service-utils');
const model = require('./model.js');
const {defaultEsApiGenerator} = dataModels;
const {Router} = require('express');

let router = Router();


router.get('/all-labels', async (req, res) => {
  try {
    let labels = await model.allLabels();
    res.json(labels);
  } catch(e) {
    res.json(errorResponse(e, 'Error with '+model.id+' labels retrieval'));
  }
});

// router.get(/\/edits\/.*/, async (req, res) => {
//   try {
//     let labels = await model.getEdits(req.path.replace(/^\/edits\//, ''));
//     res.json(labels);
//   } catch(e) {
//     res.json(errorResponse(e, 'Error with '+model.id+' edit retrieval'));
//   }
// });

function errorResponse(e, message) {
  logger.error(e);
  return {
    error: true, 
    message, 
    details : errorToDetails(e)
  }
}

function errorToDetails(e) {
  return {
    message : e.message,
    details : e.details,
    stack : e.stack
  }
}

defaultEsApiGenerator(model, {router});

module.exports = router;