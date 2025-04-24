// client/src/components/CreateUserForm.js
import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';

const CreateUserForm = () => {
  const { createUser, user, rolePermissions, hasPermission } = useContext(AuthContext);
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user'
  });
  
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  
  const { username, email, password, role } = formData;
  
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const onSubmit = async e => {
    e.preventDefault();
    setMessage('');
    setError('');
    
    try {
      const res = await createUser(formData);
      setMessage(`Usuario ${res.user.username} creado exitosamente como ${res.user.role}`);
      setFormData({
        username: '',
        email: '',
        password: '',
        role: 'user'
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Error al crear usuario');
    }
  };
  
  // Determinar qué roles puede crear el usuario actual
  const allowedRoles = () => {
    if (user.role === 'superadmin') {
      return ['user', 'editor', 'admin', 'superadmin'];
    }
    
    const roles = ['user'];
    
    if (hasPermission('create:editor')) {
      roles.push('editor');
    }
    
    if (hasPermission('create:admin')) {
      roles.push('admin');
    }
    
    return roles;
  };
  
  return (
    <div className="create-user-form">
      <h2>Crear Nuevo Usuario</h2>
      
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Nombre de Usuario</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={onChange}
            required
            className="form-control"
          />
        </div>
        
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
            className="form-control"
          />
        </div>
        
        <div className="form-group">
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
            className="form-control"
            minLength="6"
          />
        </div>
        
        <div className="form-group">
          <label>Rol</label>
          <select
            name="role"
            value={role}
            onChange={onChange}
            className="form-control"
          >
            {allowedRoles().map(role => (
              <option key={role} value={role}>
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </option>
            ))}
          </select>
        </div>
        
        <button type="submit" className="btn btn-primary mt-3">
          Crear Usuario
        </button>
      </form>
      
      {rolePermissions && (
        <div className="mt-4">
          <h3>Permisos del rol seleccionado:</h3>
          <ul>
            {rolePermissions[role]?.map(permission => (
              <li key={permission}>{permission}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CreateUserForm;