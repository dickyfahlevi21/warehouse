const express = require('express');
const router = express.Router();
const verify = require('../middleware/verifyToken')

const ProductController = require('../controllers/productController');

router
    .get('/', verify, ProductController.getProducts)
    .get('/:id', verify, ProductController.getProduct)
    .post('/', verify, ProductController.saveProduct)
    .delete('/del/:id', verify, ProductController.deleteProduct)
    .patch('/:id', verify, ProductController.updateProduct)

module.exports = router;