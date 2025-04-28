const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  lastMessage: String,
  updatedAt: { type: Date, default: Date.now }
});

conversationSchema.index({ buyer: 1, seller: 1, product: 1 }, { unique: true });

module.exports = mongoose.model('Conversation', conversationSchema);