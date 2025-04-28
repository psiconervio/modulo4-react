import express from 'express';
import { register, login, getMe } from '../controllers/authController.mjs';
import { protect, createSuperAdmin } from '../middleware/authMiddleware.mjs';

const router = express.Router();

// Rutas públicas
router.post('/register', register);
router.post('/login', login);
router.post('/setup-admin', createSuperAdmin);

// Rutas protegidas
router.get('/me', protect, getMe);

export default router;