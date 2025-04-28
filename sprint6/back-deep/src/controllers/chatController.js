// controllers/chatController.js
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const asyncHandler = require('express-async-handler');

// Obtener conversaciones del usuario
exports.getConversations = asyncHandler(async (req, res) => {
  const conversations = await Conversation.find({
    $or: [{ buyer: req.user.id }, { seller: req.user.id }]
  })
  .populate('product', 'name images')
  .populate('buyer seller', 'name avatar')
  .sort('-updatedAt');

  res.json(conversations);
});

// Obtener mensajes de una conversación
exports.getMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find({
    conversation: req.params.conversationId
  })
  .populate('sender', 'name avatar')
  .sort('createdAt');

  res.json(messages);
});