import axios from "axios";


export const featchpersonaje = async (name) => {
  const url = `https://rickandmortyapi.com/api/character/?name=${name}`;
  const response = await axios.get(url);
  return response.data;
};