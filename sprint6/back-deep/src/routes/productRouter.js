const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');

router.route('/')
  .get(productController.getProducts)
  .post(authMiddleware.protect, authMiddleware.checkRole(['seller', 'admin']), productController.createProduct);

module.exports = router;