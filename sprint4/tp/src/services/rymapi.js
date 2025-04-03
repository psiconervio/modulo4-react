import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY
const country = import.meta.env.VITE_COUNTRY

export const fetchWeather = async (city) => {
  const url = `https://rickandmortyapi.com/api/character/?name=${name}`;
  const response = await axios.get(url);
  return response.data;
};