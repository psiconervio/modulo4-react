import { createContext, useState, useContext, useEffect, useMemo } from "react";
import api, { loginUser } from "../data/apis";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
// import { rolemap } from "../utils/rolemap";

const AuthContext = createContext({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('')

  const login = async (email, password) => {
    try {
      //login sin desencriptar usuario, porque ya trae los roles de la base de datos
      // pero este es un ejemplo de como se puede enriqueser el roll y los permisos al usuario
      // para hacer mas segura la aplicacion
      const { data } = await loginUser({ email, password });
      const { token: newToken, user: rawUser } = data;
      // const decoded = jwtDecode(newToken);
      // const roleKey = String(decoded.role);
      // const roleInfo = rolemap[roleKey] || { name: "desconocido", permissions: [] };
      // const roleInfo = roleKey || { name: "desconocido", permissions: [] };
      // const enrichedUser = {
      //   ...rawUser,
      //   role: roleInfo.name,
      //   permissions: roleInfo.permissions,
      // };
      // Persistir en localStorage
      localStorage.setItem("token", newToken);
      localStorage.setItem("user", JSON.stringify(rawUser));

      // Aplica header
      api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
      setToken(newToken);
      setUser(rawUser);
      return rawUser;
    } catch (error) {
      const backendMessage =
        error.response?.data?.message || "Error al iniciar sesión";
      setError(backendMessage); // Esto sí se muestra en pantalla
      console.error("Login failed:", error.response || error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedToken && storedUser) {
      try {
        // const decoded = jwtDecode(storedToken);
        // const roleKey = String(decoded.role);
        // // const roleInfo = rolemap[roleKey] || { name: "desconocido", permissions: [] };
        // const roleInfo = roleKey || { name: "desconocido", permissions: [] };
        // console.log(roleInfo)
        // const rawUser = JSON.parse(storedUser);
        // const enrichedUser = {
        //   ...rawUser,
        //   role: roleInfo.name,
        //   permissions: roleInfo.permissions,
        // };
        api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        // setUser(storedUser);
      } catch (err) {
        console.error("Invalid token in storage", err);
      }
    }
    setIsLoading(false);
  }, []);

  const clearAuth = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("products");
    delete api.defaults.headers.common["Authorization"];
    setToken(null);
    setUser(null);
  };

  const logout = () => {
    clearAuth();
    navigate("/");
    window.location.reload(); // Recarga la página
  };

  const value = useMemo(
    () => ({ user, token, isAuthenticated: !!user, isLoading, login, logout }),
    [user, token, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
