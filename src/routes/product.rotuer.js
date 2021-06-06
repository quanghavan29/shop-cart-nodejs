const express = require('express');

const router = express.Router();

const productController = require('../controllers/product.controller');

router.get('/list-by-category', productController.findByCategory);
router.get('/detail', productController.findById);

module.exports = router;