import { createContext, useContext, useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import api from "../api/api"; // Asegúrate de importar correctamente tu instancia de API
import { loginUser } from "../api/api";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwt.decode(token);
      setUser(decoded);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setIsAuthenticated(true);
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const res = await loginUser({ email, password });
      const { token } = res.data;
      const decoded = jwt.decode(token);
      setUser(decoded);
      localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error("Error during login:", error);
      setUser(null);
      setIsAuthenticated(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
