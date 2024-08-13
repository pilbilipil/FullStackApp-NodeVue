const express = require('express');
const router = express.Router();
const serviceControler = require('../controller/serviceControler');

///get all service API
router.get('/', serviceControler.getAllServiceList);

///create new service API
router.post('/', serviceControler.createService);

/// get,put,delete service by id APIs
router.get('/:id', serviceControler.getService);
router.put('/:id', serviceControler.updateService);
router.delete('/:id', serviceControler.deleteService);

module.exports = router;
