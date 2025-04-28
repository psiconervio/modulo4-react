import express from 'express';
import { 
  getUsers, 
  getUser, 
  createUser, 
  updateUser, 
  deleteUser, 
  getRoles,
  createRole
} from '../controllers/userController.mjs';
import { protect, authorize } from '../middleware/authMiddleware.mjs';

const router = express.Router();

// Aplicar middleware de protección a todas las rutas
router.use(protect);

// Rutas de usuarios con autorización por recursos y acciones
router.get('/', authorize('users', 'read'), getUsers);
router.get('/:id', authorize('users', 'read'), getUser);
router.post('/', authorize('users', 'create'), createUser);
router.put('/:id', authorize('users', 'update'), updateUser);
router.delete('/:id', authorize('users', 'delete'), deleteUser);

// Rutas de roles
router.get('/roles/all', authorize('roles', 'read'), getRoles);
router.post('/roles', authorize('roles', 'create'), createRole);

export default router;