const express = require('express');
const router = express.Router();
const { addToCart, getCart } = require('../controllers/cartController');
const { protect, authorize } = require('../middlewares/authMiddleware');

router.post('/', protect, authorize('buyer'), addToCart);
router.get('/', protect, authorize('buyer'), getCart);

module.exports = router;
