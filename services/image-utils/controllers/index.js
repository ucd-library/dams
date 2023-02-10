const express = require('express');
const router = express.Router();

router.use('/workflow', require('./workflow.js'));

module.exports = router;