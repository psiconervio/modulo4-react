// routes/users.mjs
import express from 'express';
import User from '../models/User.mjs';
import Role from '../models/Role.mjs';
import { authenticate, authorize } from '../middleware/auth.mjs';

const router = express.Router();

// Obtener todos los usuarios (solo admin)
router.get('/', 
  authenticate, 
  authorize('users', 'read'), 
  async (req, res) => {
    try {
      const users = await User.find().select('-password').populate('roles');
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
    }
});

// Obtener usuario por ID
router.get('/:id', 
  authenticate, 
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select('-password').populate('roles');
      
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      
      // Permitir al usuario ver su propio perfil o a un admin ver cualquier perfil
      const isOwnProfile = req.user._id.toString() === req.params.id;
      const isAdmin = req.user.roles.some(role => role.name === 'admin');
      
      if (!isOwnProfile && !isAdmin) {
        return res.status(403).json({ message: 'Acceso denegado' });
      }
      
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener usuario', error: error.message });
    }
});

// Actualizar roles de usuario (solo admin)
router.patch('/:id/roles', 
  authenticate, 
  authorize('users', 'update'), 
  async (req, res) => {
    try {
      const { roles } = req.body;
      
      if (!roles || !Array.isArray(roles)) {
        return res.status(400).json({ message: 'Se requiere un array de roles' });
      }
      
      // Verificar que los roles existan
      const foundRoles = await Role.find({ name: { $in: roles } });
      
      if (foundRoles.length !== roles.length) {
        return res.status(400).json({ message: 'Uno o más roles no existen' });
      }
      
      // Actualizar roles del usuario
      const roleIds = foundRoles.map(role => role._id);
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id, 
        { roles: roleIds },
        { new: true }
      ).select('-password').populate('roles');
      
      if (!updatedUser) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar roles', error: error.message });
    }
});

// Eliminar usuario (solo admin)
router.delete('/:id', 
  authenticate, 
  authorize('users', 'delete'), 
  async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      
      if (!deletedUser) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      
      res.json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar usuario', error: error.message });
    }
});

export default router;