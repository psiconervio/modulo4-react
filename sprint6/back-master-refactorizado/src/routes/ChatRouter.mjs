import express from 'express';
import { getChatMessages } from '../controllers/chatController.mjs';
import { authenticateToken } from '../middleware/authMiddleware.mjs';

const router = express.Router();

router.get('/:productId', authenticateToken, getChatMessages); // Obtener historial de mensajes para un producto

export default router;