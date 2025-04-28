const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.post('/:productId/conversations', chatController.startConversation);
router.get('/conversations', chatController.getConversations);
router.get('/:conversationId/messages', chatController.getMessages);

module.exports = router;