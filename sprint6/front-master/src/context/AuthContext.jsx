import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
} from "react";
import api, { loginUser } from "../data/apis";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { rolemap } from "../utils/rolemap";

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

  // Initialize auth from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      try {
        const decoded = jwtDecode(storedToken);
        const roledata = rolemap[String(decoded.role)] || {
          name: "desconocido",
          permissions: [],
        };
        const parsedUser = JSON.parse(storedUser);
        const enriched = {
          ...parsedUser,
          role: roledata.name,
          permissions: roledata.permissions,
        };
        api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
        setToken(enriched);
        // setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Invalid token in storage", err);
        clearAuth();
      }
    }
    setIsLoading(false);
  }, []);

  const clearAuth = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    delete api.defaults.headers.common["Authorization"];
  };

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const { data } = await loginUser({ email, password });
      const { token: newToken, user: rawUser } = data;

      const decoded = jwtDecode(newToken);
      const { role } = decoded;
      const { name: roleName, permissions } = rolemap[role] || {
        name: "Unknown",
        permissions: [],
      };

      const enrichedUser = {
        ...rawUser,
        role: roleName,
        permissions,
      };

      // Persist
      localStorage.setItem("token", newToken);
      localStorage.setItem("user", JSON.stringify(enrichedUser));

      // Apply
      api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
      setToken(newToken);
      setUser(enrichedUser);

      return enrichedUser;
    } catch (error) {
      console.error("Login failed:", error.response || error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    clearAuth();
    navigate("/login");
  };

  const value = useMemo(
    () => ({ user, token, isAuthenticated: !!user, isLoading, login, logout }),
    [user, token, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

// import { createContext, useState, useContext, useEffect } from "react";
// import api, { loginUser } from "../data/apis";
// import { jwtDecode } from "jwt-decode";
// import { useNavigate } from "react-router-dom";
// import { rolemap } from "../utils/rolemap";

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const navigate = useNavigate();
//   // const [isAuthenticated, setisAuthenticated] = useState();
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(null);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     setIsLoading(true);
//     const storedUser = localStorage.getItem("user");
//     const token = localStorage.getItem("token");
//     if (token) {
//       const decodificartoken = jwtDecode(token);
//       setUser(decodificartoken);
//       api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//     }
//     if (storedUser) {
//       setCurrentUser(JSON.parse(storedUser));
//     }
//     setIsLoading(false);
//   }, []);

//   const login = async (email, password) => {
//     try {
//       setIsLoading(true);
//       const response = await loginUser({ email, password });
//       const { token, user: rawuser } = response.data;
//       // decodifica el token
//       const decoded = jwtDecode(token);
//       // console.log("Decoded role:", decoded.role);
//       // console.log("Role data from rolemap:", rolemap[decoded.role]);
//       const roledata = rolemap[String(decoded.role)] || {
//         name: "Unknown",
//         permissions: [],
//       };

//       const enrichedUser = {
//         ...rawuser,
//         role: roledata.name,
//         permissions: roledata.permissions,
//       };

//       const userData = response.data.user;
//       const tokenData = response.data.token;

//       setUser(enrichedUser);
//       //codigo anterior
//       // setUser(decodificartoken);
//       setToken(tokenData);
//       localStorage.setItem("token", token);
//       localStorage.setItem("user", JSON.stringify(enrichedUser));
//       // localStorage.setItem("user", JSON.stringify(userData));
//       console.log("User data:", userData);
//       console.log("Token data:", tokenData);
//       setCurrentUser(userData);
//       api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//       return { token, user: enrichedUser }; // Retorna el token y el usuario
//       // return true;
//     } catch (error) {
//       console.error("Login failed:", error);
//       return false;
//     } finally {
//       setIsLoading(false); // Finaliza el estado de carga
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     setCurrentUser(null);
//     api.defaults.headers.common["Authorization"] = null;
//     // setisAuthenticated(false);
//     setToken(null);
//     navigate("/");
//     window.location.reload();
//   };

//   const value = {
//     user,
//     currentUser,
//     isAuthenticated: !!currentUser,
//     isLoading,
//     login,
//     logout,
//   };
//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export const useAuth = () => useContext(AuthContext);
