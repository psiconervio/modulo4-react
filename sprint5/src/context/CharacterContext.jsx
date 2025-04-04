// charactercontext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { featchpersonaje } from "../services/rymapi";

const PersonajeContext = createContext();

export const PersonajeProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // estado para la busqueda de personajes
  const [busqueda, setBusqueda] = useState("");
  // estados para personajes que se visualizaran en favpersonajemodal
  const [personajes, setPersonajes] = useState(() => {
    return JSON.parse(localStorage.getItem("personajes")) || [];
  });
  // estado para los resultados de la busqueda
  const [resultados, setResultados] = useState([]);

  const getPersonaje = async (name) => {
    setLoading(true);
    try {
      const data = await featchpersonaje(name);
      //extrae el array de results
      setResultados(data.results);
      setError(null);
      console.log(data);
    } catch (error) {
      console.error("Error fetching personaje:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // guardamos los personajes en el localstorage
  useEffect(() => {
    localStorage.setItem("personajes", JSON.stringify(personajes));
  }, [personajes]);

  return (
    <PersonajeContext.Provider
      value={{
        busqueda,
        setBusqueda,
        personajes,
        setPersonajes,
        getPersonaje,
        resultados,
        loading,
        error,
      }}
    >
      {children}
    </PersonajeContext.Provider>
  );
};

export const usePersonaje = () => useContext(PersonajeContext);

// //charactercontext.jsx
// import { createContext } from "react";
// import { useContext, useState, useEffect } from "react";
// import { featchpersonaje } from "../services/rymapi";

// const PersonajeContext = createContext();

// export const PersonajeProvider = ({ children }) => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [busqueda, setBusqueda] = useState();
//   const [personajes, setPersonajes] = useState(() => {
//     return JSON.parse(localStorage.getItem("personajes")) || [];
//   });

//   const getPersonaje = async (name) => {
//     setLoading(true);
//     try {
//       const data = await featchpersonaje(name);
//       setBusqueda(data);
//       setError(null);
//       setLoading(false);
//       console.log(data);
//     } catch (error) {
//       console.error("Error fetching personaje:", error);
//       setError(error);
//       setLoading(false);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // useEffect(() => {
//   //   localStorage.setItem("personajes", JSON.stringify(personajes));
//   // });
// // buscar todos personajes
//   const buscarpersonaje = () => {};

//   return (
//     <PersonajeContext.Provider value={{busqueda, setBusqueda, personajes, setPersonajes, getPersonaje, buscarpersonaje, loading, error}}>
//       {children}
//     </PersonajeContext.Provider>
//   );
// };

// export const usePersonaje = () => useContext(PersonajeContext);
