const express = require('express');
const router = express.Router();
const orderControler = require('../controller/orderControler');
const errorHandler = require('../middleware/errorHandler');

/// get all Order API
router.get('/', orderControler.getOrder);

/// create new Order API
router.post('/', orderControler.createOrder);

/// get,update,delete APIs order by id 
router.get('/:id', orderControler.getOrderById);
router.put('/:id', orderControler.updateOrderById);
router.delete('/:id', orderControler.deleteOrderById);

router.use(errorHandler);

module.exports = router;