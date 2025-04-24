// frontend/src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Componente para proteger rutas que requieren autenticación
export const ProtectedRoute = () => {
  const { currentUser, loading } = useAuth();
  
  if (loading) return <div>Cargando...</div>;
  
  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

// Componente para proteger rutas que requieren roles específicos
export const RoleProtectedRoute = ({ allowedRoles }) => {
  const { currentUser, loading, hasRole } = useAuth();
  
  if (loading) return <div>Cargando...</div>;
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  // Verificar si el usuario tiene al menos uno de los roles permitidos
  const hasAllowedRole = allowedRoles.some(role => hasRole(role));
  
  return hasAllowedRole ? <Outlet /> : <Navigate to="/unauthorized" />;
};

// Componente para proteger rutas que requieren permisos específicos
export const PermissionProtectedRoute = ({ resource, action }) => {
  const { currentUser, loading, checkPermission } = useAuth();
  
  if (loading) return <div>Cargando...</div>;
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  // Verificar si el usuario tiene el permiso necesario
  const hasPermission = checkPermission(resource, action);
  
  return hasPermission ? <Outlet /> : <Navigate to="/unauthorized" />;
};