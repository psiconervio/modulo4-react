import { createContext } from "react";
import { useContext, useState, useEffect } from "react";
import { api } from "../api/api";

const PersonajeContext = createContext();

export const PersonajeProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [personajes, setPersonajes] = useState(() => {
    return JSON.parse(localStorage.getItem("personajes")) || [];
  });

  const getPersonaje = async (personaje) => {
    setLoading(true);
    try {
      const data = await api(personaje);
      setPersonajes(data);
      setError(null);
      setLoading(false);
      console.log(data);
    } catch (error) {
      console.error("Error fetching personaje:", error);
      setError(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   localStorage.setItem("personajes", JSON.stringify(personajes));
  // });

  const buscarpersonaje = () => {};

  return (
    <PersonajeContext.Provider value={{personajes, getPersonaje, buscarpersonaje, loading, error}}>
      {children}
    </PersonajeContext.Provider>
  );
};

export const usePersonaje = () => useContext(PersonajeContext);