const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware.protect);

router.get('/conversations', chatController.getConversations);
router.get('/:conversationId/messages', chatController.getMessages);

module.exports = router;