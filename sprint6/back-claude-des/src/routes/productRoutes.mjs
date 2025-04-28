import { Router } from 'express';
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct
} from '../controllers/productController.mjs';
import { protect, authorizeRoles } from '../middlewares/authMiddleware.mjs';

const router = Router();

router.get('/', getProducts);
// tanto seller como admin pueden crear
router.post('/',   protect, authorizeRoles('seller','admin'), createProduct);
// update y delete: seller (dueño) o admin
router.put('/:id',    protect, authorizeRoles('seller','admin'), updateProduct);
router.delete('/:id', protect, authorizeRoles('seller','admin'), deleteProduct);

export default router;
