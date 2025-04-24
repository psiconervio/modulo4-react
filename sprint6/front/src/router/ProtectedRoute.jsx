import { Navigate, Outlet } from "react-router-dom"; // Importa componentes de React Router. 'Navigate' redirige a otra ruta, y 'Outlet' representa las rutas hijas.
import { useAuth } from "../context/AuthContext"; // Importa un hook personalizado para acceder al contexto de autenticación.

const ProtectedRoute = ({ allowedRoles, allowedPermissions }) => {
  // Este componente recibe dos props opcionales:
  // - allowedRoles: un array de roles permitidos.
  // - allowedPermissions: un array de permisos requeridos.

  const { isAuthenticated, role, permissions } = useAuth();
  // Extrae del contexto de autenticación:
  // - isAuthenticated: indica si el usuario está autenticado.
  // - role: el rol del usuario actual.
  // - permissions: los permisos del usuario actual.

  if (!isAuthenticated) {
    // Si el usuario no está autenticado, redirige a la página de inicio de sesión.
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    // Si se especificaron roles permitidos y el rol del usuario no está en la lista,
    // redirige a la página de "no autorizado".
    return <Navigate to="/unauthorized" />;
  }

  if (
    allowedPermissions &&
    !allowedPermissions.every((perm) => permissions.includes(perm))
  ) {
    // Si se especificaron permisos requeridos y el usuario no tiene todos esos permisos,
    // redirige a la página de "no autorizado".
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
  // Si el usuario pasa todas las verificaciones, renderiza las rutas hijas (Outlet).
};

export default ProtectedRoute;
// Exporta el componente para que pueda ser usado en otras partes de la aplicación.