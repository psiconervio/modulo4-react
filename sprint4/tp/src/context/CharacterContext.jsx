// charactercontext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { featchpersonaje } from "../services/rymapi";

const PersonajeContext = createContext();

export const PersonajeProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [personajes, setPersonajes] = useState(() => {
    return JSON.parse(localStorage.getItem("personajes")) || [];
  });
  const [resultados, setResultados] = useState([]); // Almacena el array de personajes

  const getPersonaje = async (name) => {
    setLoading(true);
    try {
      const data = await featchpersonaje(name);
      // Extraemos solo el array de resultados
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

  // Guardamos los personajes en el localStorage
  useEffect(() => {
    localStorage.setItem("personajes", JSON.stringify(personajes));
  }, [personajes]);

  const buscarpersonaje = () => {
    // Lógica adicional si es necesario
  };

  return (
    <PersonajeContext.Provider
      value={{
        busqueda,
        setBusqueda,
        personajes,
        setPersonajes,
        getPersonaje,
        buscarpersonaje,
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