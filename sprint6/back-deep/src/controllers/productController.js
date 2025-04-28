const Product = require('../models/Product');
const asyncHandler = require('express-async-handler');

// @desc    Create product
// @route   POST /api/products
// @access  Private/Seller
exports.createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    ...req.body,
    seller: req.user.id
  });
  
  await product.save();
  res.status(201).json(product);
});

// @desc    Get all products
// @route   GET /api/products
// @access  Public
exports.getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().populate('seller', 'name email');
  res.json(products);
});