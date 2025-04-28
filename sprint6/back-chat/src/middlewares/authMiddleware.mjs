import jwt from 'jsonwebtoken';
import User from '../models/User.mjs';
import { JWT_SECRET } from '../config.js';

export const protect = async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }
  if (!token) {
    return res.status(401).json({ message: 'No autorizado, falta token' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch {
    return res.status(401).json({ message: 'Token inválido' });
  }
};

// Ahora puedes autorizar combinations: admin siempre tendrá acceso donde figure
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Acceso denegado' });
    }
    next();
  };
};
