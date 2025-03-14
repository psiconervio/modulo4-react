import React, { createContext, useContext, useState } from 'react';

// 1 crear contexto de autenticacion
const AuthContext = createContext();

// 2 crear provider, que va a envolver la aplicacion y va a manejar el state global
export const AuthProvider = ({ children }) => {

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // funcion para manejar el estado
const login = () => setIsAuthenticated(true)
const logout = () => setIsAuthenticated(false)

  // custom hook para usar el contexto
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );

};

 // 3 crear custom hook para poder usarlo mas facilmente
export const useAuth = () => useContext(AuthContext);
