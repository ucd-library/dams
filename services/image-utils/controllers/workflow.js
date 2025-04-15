// create express router
const express = require('express');
const router = express.Router();
const fs = require('fs');
// const model = require('../lib/model.js');
const serviceUtils = require('../lib/workflow-service-utils.js');
const getNumPdfPages = require('../lib/get-num-pdf-pages');
const damsImageProductsWorkflow = require('../models/dams-image-products-workflow.js');

// router.delete('/:workflowId', async (req, res) => {
//   try {
//     res.json(await model.cleanupWorkflow(req.params.workflowId));
//   } catch(e) {
//     res.status(500).json({
//       error : e.message,
//       stack : e.stack
//     });
//   }
// });

// for debugging - dont' remove
// router.post('/ia-reader/:workflowId/:page', async (req, res) => {
//   try {    
//     let files = await model.runPdfToIaReaderPage(req.params.workflowId, req.params.page);
//     res.json({success: true, files});
//   } catch(e) {
//     res.status(500).json({
//       error : e.message,
//       stack : e.stack
//     });
//   }

// });

router.get('/pdf/getNumPages/:workflowId', async (req, res) => {
  let localFile;
  try {
    localFile = await serviceUtils.getLocalFile(req.params.workflowId);
    let pageCount = await getNumPdfPages(localFile);
    res.json({success: true, pageCount});
  } catch(e) {
    res.status(500).json({
      error : e.message,
      stack : e.stack
    });
  }

  try {
    if( fs.existsSync(localFile) ) {
      fs.unlinkSync(localFile);
    }
  } catch(e) {
    console.error('Error deleting local file: '+localFile);
    console.error(e);
  }
});

router.get('/pdf/finalize/:workflowId', async (req, res) => {
  try {    
    let result = await serviceUtils.finalizePdfWorkflow(req.params.workflowId);
    res.json({success: true, result});
  } catch(e) {
    res.status(500).json({
      error : e.message,
      stack : e.stack
    });
  }
});

router.get('/process-image/:workflowId', async (req, res) => {
  try {    
    let result = await damsImageProductsWorkflow({
      workflowInfo: req.params.workflowId
    });
    res.json({success: true, result});
  } catch(e) {
    res.status(500).json({
      error : e.message,
      stack : e.stack
    });
  }
});

router.get('/process-image/:workflowId/:page', async (req, res) => {
  try {    
    let result = await damsImageProductsWorkflow({
      workflowInfo: req.params.workflowId,
      page: req.params.page
    });
    res.json({success: true, result});
  } catch(e) {
    res.status(500).json({
      error : e.message,
      stack : e.stack
    });
  }
});

// router.get('/:workflowId', async (req, res) => {
//   try {
//     res.json(await model.getWorkflowInfo(req.params.workflowId));
//   } catch(e) {
//     res.status(500).json({
//       error : e.message,
//       stack : e.stack
//     });
//   }
// });

module.exports = router;