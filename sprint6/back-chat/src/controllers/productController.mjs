import Product from '../models/Product.mjs';

export const createProduct = async (req, res) => {
  const { name, price, category, description, image } = req.body;
  const product = await Product.create({
    seller: req.user._id,
    name, price, category, description, image
  });
  res.status(201).json(product);
};

export const getProducts = async (req, res) => {
  const { category, minPrice, maxPrice } = req.query;
  const filter = {};
  if (category) filter.category = category;
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }
  const products = await Product.find(filter)
    .populate('seller', 'username email');
  res.json(products);
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const product = await Product.findById(id);
  if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

  // Si no es admin y no es dueño, denegado
  if (req.user.role !== 'admin' && product.seller.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'No puedes editar este producto' });
  }

  Object.assign(product, updates);
  await product.save();
  res.json(product);
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

  // Admin o dueño
  if (req.user.role !== 'admin' && product.seller.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'No puedes eliminar este producto' });
  }

  await product.remove();
  res.json({ message: 'Producto eliminado' });
};
