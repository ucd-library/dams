// create express router
const express = require('express');
const router = express.Router();
const model = require('../lib/model.js');

const REQUIRED_START_METADATA = [
  'fin-path', 'fin-host'
];
const WORKFLOW_TYPES = {
  'pdf-to-ia-reader' : model.startPdfToIaReaderWorkflow
}

router.post('/init/:workflow/:filename', async (req, res) => {

  try {
    let metadata = req.query;
    let missing = REQUIRED_START_METADATA.filter(p => !metadata[p]);
    if( missing.length ) {
      throw new Error(`Missing required workflow metadata: ${missing.join(', ')}`);
    }
    
    let workflow = WORKFLOW_TYPES[req.params.workflow];
    if( !workflow ) {
      throw new Error(`Invalid workflow type: ${req.params.workflow}`);
    }
    
    let workflowInfo = await workflow(req, req.params.filename, metadata);
    res.json(workflowInfo);
  } catch(e) {
    res.status(500).json({
      error : e.message,
      stack : e.stack
    });
  }

});

router.get('/:workflowId', async (req, res) => {
  try {
    res.json(await model.getWorkflowInfo(req.params.workflowId));
  } catch(e) {
    res.status(500).json({
      error : e.message,
      stack : e.stack
    });
  }
});

router.delete('/:workflowId', async (req, res) => {
  try {
    res.json(await model.cleanupWorkflow(req.params.workflowId));
  } catch(e) {
    res.status(500).json({
      error : e.message,
      stack : e.stack
    });
  }
});

router.post('/pdf-to-ia-reader/:workflowId/:page', async (req, res) => {
  try {    
    let files = await model.runPdfToIaReaderPage(req.params.workflowId, req.params.page);
    res.json({success: true, files});
  } catch(e) {
    res.status(500).json({
      error : e.message,
      stack : e.stack
    });
  }

});

module.exports = router;