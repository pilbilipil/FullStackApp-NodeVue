const express = require('express');
const router = express.Router();
const productControler = require('../controller/productControler');

/// get all Product API
router.get('/', productControler.getProduct);

/// create new Product API
router.post('/', productControler.createProduct);

/// get product by name API
router.get('/:name', productControler.getProductByName);

/// get,put,delete by id APIs
router.get('/:id', productControler.getProductById);
router.delete('/:id', productControler.deleteProductById);
router.put('/:id', productControler.updateProduct);

module.exports = router;