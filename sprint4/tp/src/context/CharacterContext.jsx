import { createContext } from "react";
import { useContext, useEffect } from "react";

const PersonajeContext = createContext();

export const Personaje = ({ children }) => {
  const [personajes, setPersonajes] = useState(() => {
    return JSON.parse(localStorage.getItem("personajes")) || [];
  });

  useEffect(() => {
    localStorage.setItem("personajes", JSON.stringify(personajes));
  });

  const buscarpersonaje = () => {};


  
  return (
    <PersonajeContext.Provider value={personaje}>
      {children}
    </PersonajeContext.Provider>
  );
};
