const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
  const { name, price, category, description, image } = req.body;
  const product = await Product.create({ seller: req.user._id, name, price, category, description, image });
  res.status(201).json(product);
};

exports.getProducts = async (req, res) => {
  const { category, minPrice, maxPrice } = req.query;
  const filter = {};
  if (category) filter.category = category;
  if (minPrice || maxPrice) filter.price = {};
  if (minPrice) filter.price.$gte = minPrice;
  if (maxPrice) filter.price.$lte = maxPrice;

  const products = await Product.find(filter).populate('seller', 'username');
  res.json(products);
};
