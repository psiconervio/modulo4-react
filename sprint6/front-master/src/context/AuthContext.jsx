import { createContext, useState, useContext, useEffect } from "react";
import api, { loginUser } from "../data/apis";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   // Check if user is already logged in from localStorage
  //   const storedUser = localStorage.getItem("user");
  //   if (storedUser) {
  //     setCurrentUser(JSON.parse(storedUser));
  //   }
  //   setIsLoading(false);
  // }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodificartoken = jwtDecode(token);
      setUser(decodificartoken);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await loginUser({ email, password });
      const { token } = response.data;
      const userData = response.data.user;
      const tokenData = response.data.token;

      // Decode the token to get user information
      // const decodedToken = jwtDecode(tokenData);
      const decodificartoken = jwtDecode(token);
      // const userId = decodedToken.id
      // const userRole = decodedToken.role
      // const userPermissions = decodedToken.permissions
      setUser(decodificartoken);
      setToken(tokenData);
      // Store user and token in localStorage
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };
  // const login = (userData) => {
  //   // For demonstration, we'll store the user in localStorage
  //   localStorage.setItem('user', JSON.stringify(userData))
  //   setCurrentUser(userData)
  //   return true
  // }

  const logout = () => {
    localStorage.removeItem("user");
    setCurrentUser(null);
    api.defaults.headers.common["Authorization"] = null;
    setToken(null);
  };

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
