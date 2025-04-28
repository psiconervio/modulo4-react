const asyncHandler = require('express-async-handler');
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');

exports.startConversation = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  
  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error('Producto no encontrado');
  }

  const existingConversation = await Conversation.findOne({
    product: productId,
    buyer: req.user.id
  });

  if (existingConversation) {
    return res.json(existingConversation);
  }

  const conversation = new Conversation({
    product: productId,
    buyer: req.user.id,
    seller: product.seller
  });

  await conversation.save();
  res.status(201).json(conversation);
});

exports.getConversations = asyncHandler(async (req, res) => {
  const conversations = await Conversation.find({
    $or: [{ buyer: req.user.id }, { seller: req.user.id }]
  })
  .populate('product', 'name price images')
  .populate('buyer seller', 'name email avatar')
  .sort('-updatedAt');

  res.json(conversations);
});

exports.getMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find({
    conversation: req.params.conversationId
  })
  .populate('sender', 'name avatar')
  .sort('createdAt');

  res.json(messages);
});