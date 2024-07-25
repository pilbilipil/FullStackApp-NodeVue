const express = require('express');
const router = express.Router();
const orderControler = require('../controller/orderControler');

/// get all Order API
router.get('/', orderControler.getOrder);

/// create new Order API
router.post('/', orderControler.createOrder);

/// get,update,delete APIs order by id 
router.get('/:id', orderControler.getOrderById);
router.put('/:id', orderControler.updateOrderById);


module.exports = router;