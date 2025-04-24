// middleware/auth.mjs
import jwt from 'jsonwebtoken';
import User from '../models/User.mjs';
import Role from '../models/Role.mjs';

export const authenticate = async (req, res, next) => {
  try {
    // Obtener token del header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token, autenticación denegada' });
    }

    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Buscar usuario y popular roles
    const user = await User.findById(decoded.userId).populate('roles');
    
    if (!user) {
      return res.status(401).json({ message: 'Token inválido' });
    }

    // Añadir usuario a la solicitud
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido o expirado' });
  }
};

// Middleware para verificar permisos
export const authorize = (resource, action) => {
  return async (req, res, next) => {
    try {
      const user = req.user;
      
      // Verificar que el usuario tenga los roles necesarios
      let hasPermission = false;
      
      for (const role of user.roles) {
        // Buscar el permiso en el rol actual
        for (const permission of role.permissions) {
          if (permission.resource === resource && 
              (permission.actions.includes(action) || permission.actions.includes('manage'))) {
            hasPermission = true;
            break;
          }
        }
        
        if (hasPermission) break;
      }
      
      if (!hasPermission) {
        return res.status(403).json({ message: 'Acceso denegado: no tiene los permisos necesarios' });
      }
      
      next();
    } catch (error) {
      res.status(500).json({ message: 'Error al verificar permisos' });
    }
  };
};

// Helper para inicializar roles por defecto
export const initRoles = async () => {
  try {
    const count = await Role.estimatedDocumentCount();
    
    // Solo crear roles si no existen
    if (count === 0) {
      // Crear roles predeterminados
      await Promise.all([
        new Role({
          name: 'user',
          permissions: [
            { resource: 'posts', actions: ['read'] },
            { resource: 'comments', actions: ['create', 'read'] }
          ],
          description: 'Usuario estándar'
        }).save(),
        
        new Role({
          name: 'editor',
          permissions: [
            { resource: 'posts', actions: ['create', 'read', 'update'] },
            { resource: 'comments', actions: ['create', 'read', 'update', 'delete'] }
          ],
          description: 'Editor de contenido'
        }).save(),
        
        new Role({
          name: 'moderator',
          permissions: [
            { resource: 'posts', actions: ['read'] },
            { resource: 'comments', actions: ['read', 'update', 'delete'] },
            { resource: 'users', actions: ['read'] }
          ],
          description: 'Moderador de contenido'
        }).save(),
        
        new Role({
          name: 'admin',
          permissions: [
            { resource: 'posts', actions: ['manage'] },
            { resource: 'comments', actions: ['manage'] },
            { resource: 'users', actions: ['manage'] },
            { resource: 'roles', actions: ['manage'] }
          ],
          description: 'Administrador con acceso completo'
        }).save()
      ]);
      
      console.log('Roles inicializados correctamente');
    }
  } catch (error) {
    console.error('Error al inicializar roles:', error);
  }
};