import { Router } from 'express';
import {
  addToCart,
  getCart,
  removeFromCart
} from '../controllers/cartcontroller.mjs';
import { protect, authorizeRoles } from '../middlewares/authMiddleware.mjs';

const router = Router();

// Sólo buyer puede ver y manejar su carrito
router.get('/',               protect, authorizeRoles('buyer'), getCart);
router.post('/',              protect, authorizeRoles('buyer'), addToCart);
router.delete('/:productId',  protect, authorizeRoles('buyer'), removeFromCart);

export default router;
