import axios from "axios";


export const featchPersonaId = async (id) => {
  const url = `https://67ef0b8dc11d5ff4bf7b9f43.mockapi.io/api/v1/users/${id}`;
  const response = await axios.get(url);
  return response.data;
};


export const featchPersonaName = async (id) => {
    const url = `https://67ef0b8dc11d5ff4bf7b9f43.mockapi.io/api/v1/users/${id}`;
    const response = await axios.get(url);
    return response.data;
  };