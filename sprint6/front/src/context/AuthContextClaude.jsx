// frontend/src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Crear contexto
const AuthContext = createContext();

// Hook personalizado para usar el contexto
export const useAuth = () => {
  return useContext(AuthContext);
};

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Configurar axios con el token
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Cargar usuario desde el token guardado
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const res = await axios.get(`${API_URL}/auth/me`);
          setCurrentUser(res.data);
        } catch (err) {
          console.error('Error al cargar usuario:', err);
          localStorage.removeItem('token');
          setToken(null);
          setCurrentUser(null);
        }
      }
      setLoading(false);
    };

    loadUser();
  }, [token]);

  // Registrar usuario
  const register = async (username, email, password) => {
    try {
      setError('');
      const res = await axios.post(`${API_URL}/auth/register`, {
        username,
        email,
        password
      });
      
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      setToken(token);
      setCurrentUser(user);
      return user;
    } catch (err) {
      setError(err.response?.data?.message || 'Error al registrarse');
      throw err;
    }
  };

  // Login de usuario
  const login = async (email, password) => {
    try {
      setError('');
      const res = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      });
      
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      setToken(token);
      setCurrentUser(user);
      return user;
    } catch (err) {
      setError(err.response?.data?.message || 'Error al iniciar sesión');
      throw err;
    }
  };

  // Logout de usuario
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setCurrentUser(null);
  };

  // Comprobar si el usuario tiene un rol específico
  const hasRole = (role) => {
    if (!currentUser || !currentUser.roles) return false;
    return currentUser.roles.includes(role);
  };

  // Comprobar si el usuario tiene permiso para una acción
  const checkPermission = (resource, action) => {
    // Esta es una implementación simplificada
    // En una app real, podrías querer verificar contra permisos específicos
    
    if (!currentUser || !currentUser.roles) return false;
    
    // Admin tiene todos los permisos
    if (currentUser.roles.includes('admin')) return true;
    
    // Permisos por rol (simplificados)
    const rolePermissions = {
      'editor': {
        'posts': ['create', 'read', 'update'],
        'comments': ['create', 'read', 'update', 'delete']
      },
      'moderator': {
        'comments': ['read', 'update', 'delete'],
        'users': ['read']
      },
      'user': {
        'posts': ['read'],
        'comments': ['create', 'read']
      }
    };
    
    // Verificar si alguno de los roles del usuario tiene el permiso necesario
    return currentUser.roles.some(role => {
      const permissions = rolePermissions[role];
      return permissions && 
             permissions[resource] && 
             permissions[resource].includes(action);
    });
  };

  const value = {
    currentUser,
    loading,
    error,
    register,
    login,
    logout,
    hasRole,
    checkPermission
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};