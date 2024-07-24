const express = require('express');
const router = express.Router();
const orderControler = require('../controller/orderControler');

/// get all Order API
router.get('/', orderControler.getOrder);

module.exports = router;