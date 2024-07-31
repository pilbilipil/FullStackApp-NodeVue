const express = require('express');
const router = express.Router();
const productControler = require('../controller/productControler');
const errorHandler = require('../middleware/errorHandler');

/// get all Product API
router.get('/', productControler.getProduct);

/// create new Product API
router.post('/', productControler.createProduct);

/// get,put,delete by id APIs
router.get('/:id', productControler.getProductById);
router.delete('/:id', productControler.deleteProductById);
router.put('/:id', productControler.updateProduct);

router.use(errorHandler);

module.exports = router;