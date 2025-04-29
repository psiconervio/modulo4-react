import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
})

const urlbase = "http://localhost.com/api/character";

export default api
export const apiss = async () => {
  const response = await fetch(urlbase);
  const data = await response.json();
  return data;
};

export const loginUser = (credentials) => api.post("/auth/login", credentials);
export const registerUser = async (userData) => api.post("/register", userData);

export const getProducts = async () => api.get("/products");