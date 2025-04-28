// models/Cart.js
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 1 }
  }],
  total: { type: Number, default: 0 }
});

// Asegúrate de exportar el modelo correctamente
module.exports = mongoose.model('Cart', cartSchema); // <-- Esta línea es clave