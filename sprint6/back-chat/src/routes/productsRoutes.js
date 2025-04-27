const express = require('express');
const router = express.Router();
const { createProduct, getProducts } = require('../controllers/productController');
const { protect, authorize } = require('../middlewares/authMiddleware');

router.post('/', protect, authorize('seller'), createProduct);
router.get('/', getProducts);

module.exports = router;
