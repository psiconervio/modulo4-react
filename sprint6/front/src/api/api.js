import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
})

const urlbase = "https://rickandmortyapi.com/api/character";

// {
//     characters: "https://rickandmortyapi.com/api/character",
//     locations: "https://rickandmortyapi.com/api/location",
//     episodes: "https://rickandmortyapi.com/api/episode"
// }
export default api
export const apiss = async () => {
  const response = await fetch(urlbase);
  const data = await response.json();
  return data;
};

export const loginUser = (credentials) => api.post("/auth/ login", credentials);
export const registerUser = async (userData) => api.post("/register", userData);