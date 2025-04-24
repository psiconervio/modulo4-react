// routes/auth.mjs
import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.mjs';
import Role from '../models/Role.mjs';
import { authenticate, authorize } from '../middleware/auth.mjs';

const router = express.Router();

// Registro de usuario
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });
    
    if (existingUser) {
      return res.status(400).json({ message: 'Usuario o email ya existen' });
    }

    // Obtener rol de usuario por defecto
    const userRole = await Role.findOne({ name: 'user' });

    // Crear nuevo usuario
    const user = new User({
      username,
      email,
      password,
      roles: [userRole._id]
    });

    await user.save();

    // Generar token JWT
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        roles: [userRole.name]
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
});

// Login de usuario
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario por email
    const user = await User.findOne({ email }).populate('roles');
    
    if (!user) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // Verificar contraseña
    const isMatch = await user.comparePassword(password);
    
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // Generar token JWT
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Extraer nombres de roles para la respuesta
    const roleNames = user.roles.map(role => role.name);

    res.json({
      message: 'Login exitoso',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        roles: roleNames
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
});

// Ruta protegida para probar autenticación
router.get('/me', authenticate, async (req, res) => {
  try {
    // El usuario ya está incluido en req.user desde el middleware
    const user = req.user;
    
    // Extraer nombres de roles
    const roleNames = user.roles.map(role => role.name);
    
    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      roles: roleNames
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
});

export default router;