import jwt from 'jsonwebtoken';
import User from '../models/User.mjs';
import Role from '../models/Role.mjs';

// Middleware para proteger rutas
export const protect = async (req, res, next) => {
  let token;

  // Verificar si hay token en el header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Verificar si existe el token
  if (!token) {
    return res.status(401).json({ 
      success: false, 
      error: 'No estás autorizado para acceder a este recurso' 
    });
  }

  try {
    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Obtener usuario del token
    req.user = await User.findById(decoded.id).populate('role');
    
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        error: 'No se encontró el usuario con este token' 
      });
    }

    next();
  } catch (err) {
    return res.status(401).json({ 
      success: false, 
      error: 'No estás autorizado para acceder a este recurso' 
    });
  }
};

// Middleware para autorización basada en roles
export const authorize = (resource, action) => {
  return async (req, res, next) => {
    // Verificar si el usuario tiene el rol y permiso necesario
    const role = await Role.findById(req.user.role);
    
    if (!role) {
      return res.status(403).json({
        success: false,
        error: 'No tienes un rol asignado'
      });
    }

    // Buscar el permiso para el recurso
    const permission = role.permissions.find(p => p.resource === resource);
    
    if (!permission || !permission.actions.includes(action)) {
      return res.status(403).json({
        success: false,
        error: 'No tienes permiso para realizar esta acción'
      });
    }

    next();
  };
};

// Middleware para crear un superadmin (solo uso administrativo)
export const createSuperAdmin = async (req, res) => {
  try {
    // Verificar si ya existe un rol superadmin
    let adminRole = await Role.findOne({ name: 'superadmin' });
    
    if (!adminRole) {
      // Crear rol superadmin con todos los permisos
      adminRole = await Role.create({
        name: 'superadmin',
        description: 'Super Administrador con todos los permisos',
        permissions: [
          { 
            resource: 'users', 
            actions: ['create', 'read', 'update', 'delete'] 
          },
          { 
            resource: 'roles', 
            actions: ['create', 'read', 'update', 'delete'] 
          }
          // Añadir más recursos y permisos según sea necesario
        ]
      });
    }

    // Crear usuario superadmin
    const adminExists = await User.findOne({ email: 'admin@example.com' });
    
    if (!adminExists) {
      await User.create({
        username: 'superadmin',
        email: 'admin@example.com',
        password: 'admin123456',
        role: adminRole._id
      });
      
      return res.status(201).json({
        success: true,
        message: 'SuperAdmin creado exitosamente'
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'SuperAdmin ya existe'
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
};import jwt from 'jsonwebtoken';
import User from '../models/User.mjs';
import Role from '../models/Role.mjs';

// Middleware para proteger rutas
export const protect = async (req, res, next) => {
  let token;

  // Verificar si hay token en el header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Verificar si existe el token
  if (!token) {
    return res.status(401).json({ 
      success: false, 
      error: 'No estás autorizado para acceder a este recurso' 
    });
  }

  try {
    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Obtener usuario del token
    req.user = await User.findById(decoded.id).populate('role');
    
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        error: 'No se encontró el usuario con este token' 
      });
    }

    next();
  } catch (err) {
    return res.status(401).json({ 
      success: false, 
      error: 'No estás autorizado para acceder a este recurso' 
    });
  }
};

// Middleware para autorización basada en roles
export const authorize = (resource, action) => {
  return async (req, res, next) => {
    // Verificar si el usuario tiene el rol y permiso necesario
    const role = await Role.findById(req.user.role);
    
    if (!role) {
      return res.status(403).json({
        success: false,
        error: 'No tienes un rol asignado'
      });
    }

    // Buscar el permiso para el recurso
    const permission = role.permissions.find(p => p.resource === resource);
    
    if (!permission || !permission.actions.includes(action)) {
      return res.status(403).json({
        success: false,
        error: 'No tienes permiso para realizar esta acción'
      });
    }

    next();
  };
};

// Middleware para crear un superadmin (solo uso administrativo)
export const createSuperAdmin = async (req, res) => {
  try {
    // Verificar si ya existe un rol superadmin
    let adminRole = await Role.findOne({ name: 'superadmin' });
    
    if (!adminRole) {
      // Crear rol superadmin con todos los permisos
      adminRole = await Role.create({
        name: 'superadmin',
        description: 'Super Administrador con todos los permisos',
        permissions: [
          { 
            resource: 'users', 
            actions: ['create', 'read', 'update', 'delete'] 
          },
          { 
            resource: 'roles', 
            actions: ['create', 'read', 'update', 'delete'] 
          }
          // Añadir más recursos y permisos según sea necesario
        ]
      });
    }

    // Crear usuario superadmin
    const adminExists = await User.findOne({ email: 'admin@example.com' });
    
    if (!adminExists) {
      await User.create({
        username: 'superadmin',
        email: 'admin@example.com',
        password: 'admin123456',
        role: adminRole._id
      });
      
      return res.status(201).json({
        success: true,
        message: 'SuperAdmin creado exitosamente'
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'SuperAdmin ya existe'
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
};