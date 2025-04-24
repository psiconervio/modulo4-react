// frontend/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { 
  ProtectedRoute, 
  RoleProtectedRoute, 
  PermissionProtectedRoute 
} from './components/ProtectedRoute';

// Importar componentes de páginas
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import UserProfile from './pages/UserProfile';
import PostsManager from './pages/PostsManager';
import Unauthorized from './pages/Unauthorized';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          
          {/* Rutas que requieren autenticación */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<UserProfile />} />
          </Route>
          
          {/* Rutas que requieren roles específicos */}
          <Route element={<RoleProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin" element={<AdminPanel />} />
          </Route>
          
          {/* Rutas que requieren permisos específicos */}
          <Route element={<PermissionProtectedRoute resource="posts" action="create" />}>
            <Route path="/posts/create" element={<PostsManager />} />
          </Route>
          
          {/* Ruta 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;