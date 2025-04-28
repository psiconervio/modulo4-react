import Cart from '../models/Cart.mjs';

export const addToCart = async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  let cart = await Cart.findOne({ buyer: req.user._id });
  if (!cart) cart = new Cart({ buyer: req.user._id, items: [] });

  const idx = cart.items.findIndex(i => i.product.toString() === productId);
  if (idx > -1) {
    cart.items[idx].quantity += Number(quantity);
  } else {
    cart.items.push({ product: productId, quantity });
  }
  await cart.save();
  res.json(cart);
};

export const getCart = async (req, res) => {
  const cart = await Cart.findOne({ buyer: req.user._id }).populate('items.product');
  res.json(cart || { items: [] });
};

export const removeFromCart = async (req, res) => {
  const { productId } = req.params;
  const cart = await Cart.findOne({ buyer: req.user._id });
  if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });

  cart.items = cart.items.filter(i => i.product.toString() !== productId);
  await cart.save();
  res.json(cart);
};
