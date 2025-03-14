import React, { createContext, useContext, useState } from 'react';
// 1 crear contexto de autenticacion
// 2 crear provider, que va a envolver la aplicacion y va a manejar el state global
// 3 crear custom hook para poder usarlo mas facilmente

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
