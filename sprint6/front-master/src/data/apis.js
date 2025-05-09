import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  // baseURL: "https://modulo4-react.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
})
export default api


const urlbase = "http://localhost.com/api/character";
export const apiss = async () => {
  const response = await fetch(urlbase);
  const data = await response.json();
  return data;
};
//login y register
export const loginUser = (credentials) => api.post("/auth/login", credentials);
export const registerUser = async (userData) => api.post("/auth/register", userData);
export const updateUser = async (id, data) => {return api.put(`auth/users/${id}`, data);
};
export const deleteuser = async (id) => api.delete(`auth/users/${id}`);
export const getUserById = async (id) => api.get(`/auth/users/${id}`);
export const getAllUsers = async () => api.get("/auth/users");


export const getProducts = async (credentials) => api.get("/products",credentials);
export const getProductById = async (id) => api.get(`/products/${id}`);
export const getUserProducts = async (userId) => api.get(`/users/${userId}/products`);
export const createProduct = async (productData) => api.post("/products", productData);
export const updateProduct = async (id, productData) => api.put(`/products/${id}`, productData);
export const deleteProduct = async (id) => api.delete(`/products/${id}`);
export const getCategories = async () => api.get("/categories");
export const getConversations = async (userId) => api.get(`/users/${userId}/conversations`);
export const getConversationById = async (conversationId) => api.get(`/conversations/${conversationId}`);