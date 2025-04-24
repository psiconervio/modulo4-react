// client/src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rolePermissions, setRolePermissions] = useState(null);

  // Configurar axios con token
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  }, [token]);

  // Cargar usuario al inicio si hay token
  useEffect(() => {
    const loadUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get('/api/auth/me');
        setUser(res.data.user);
        
        // Si el usuario es admin o superadmin, cargar los roles y permisos disponibles
        if (res.data.user.role === 'admin' || res.data.user.role === 'superadmin') {
          try {
            const rolesRes = await axios.get('/api/roles');
            setRolePermissions(rolesRes.data);
          } catch (err) {
            console.error('Error al cargar roles y permisos:', err);
          }
        }
        
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Error al cargar el usuario');
        setToken(null);
        setLoading(false);
      }
    };

    loadUser();
  }, [token]);

  // Registro normal (siempre como 'user')
  const register = async (userData) => {
    try {
      const res = await axios.post('/api/auth/register', userData);
      setToken(res.data.token);
      setUser(res.data.user);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Error al registrarse');
      throw err;
    }
  };

  // Login
  const login = async (credentials) => {
    try {
      const res = await axios.post('/api/auth/login', credentials);
      setToken(res.data.token);
      setUser(res.data.user);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Error al iniciar sesión');
      throw err;
    }
  };

  // Logout
  const logout = () => {
    setToken(null);
    setUser(null);
    setRolePermissions(null);
  };

  // Crear un nuevo usuario con rol específico (para admin/superadmin)
  const createUser = async (userData) => {
    try {
      const res = await axios.post('/api/roles/create-user', userData);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Error al crear usuario');
      throw err;
    }
  };

  // Cambiar rol de un usuario
  const changeUserRole = async (userId, role) => {
    try {
      const res = await axios.patch(`/api/roles/change-role/${userId}`, { role });
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cambiar rol');
      throw err;
    }
  };

  // Personalizar permisos de un usuario
  const customizePermissions = async (userId, permissions) => {
    try {
      const res = await axios.patch(`/api/roles/customize-permissions/${userId}`, { permissions });
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Error al personalizar permisos');
      throw err;
    }
  };

  // Activar/desactivar usuario
  const toggleUserStatus = async (userId, isActive) => {
    try {
      const res = await axios.patch(`/api/roles/toggle-status/${userId}`, { isActive });
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cambiar estado del usuario');
      throw err;
    }
  };

  // Verificar si el usuario tiene cierto rol
  const hasRole = (role) => {
    if (!user) return false;
    if (Array.isArray(role)) return role.includes(user.role);
    return user.role === role;
  };

  // Verificar si el usuario tiene cierto permiso
  const hasPermission = (permission) => {
    if (!user) return false;
    if (user.role === 'superadmin') return true; // Superadmin tiene todos los permisos
    if (user.role === 'admin' && !permission.startsWith('superadmin:')) return true; // Admin tiene todos excepto los de superadmin
    return user.permissions.includes(permission);
  };

  // Verificar si es superadmin
  const isSuperAdmin = () => {
    return user?.role === 'superadmin';
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        rolePermissions,
        register,
        login,
        logout,
        createUser,
        changeUserRole,
        customizePermissions,
        toggleUserStatus,
        hasRole,
        hasPermission,
        isSuperAdmin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;