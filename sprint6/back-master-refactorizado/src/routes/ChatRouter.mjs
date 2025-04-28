import express from 'express';
import { getChatMessages } from '../controllers/ChatController.mjs';
import { authenticateToken } from '../middleware/authMiddleware.mjs';

const router = express.Router();

router.get('/:productId', authenticateToken, getChatMessages); // Obtener historial de mensajes para un producto

export default router;