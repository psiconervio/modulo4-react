import { useContext, useState, createContext } from "react";
import { apidbmongo } from "../services/jugadoresapi";

/// Crea un contexto para manejar el estado de los items
const SuperContext = createContext();
/// Proveedor del contexto que envuelve a los componentes hijos
/// y proporciona el estado y las funciones necesarias para interactuar con los items
export const SuperProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [busquedaitems, setBusquedaitems] = useState("");
  const [items, setItems] = useState(() => {
    return JSON.parse(localStorage.getItem("items")) || [];
  });

  //obtener items o items
  const getItem = async (id) => {
    setLoading(true);
    try {
      const data = await apidbmongo(id);
      setItems(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching items:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    // Proporciona el contexto a los componentes hijos
    // y permite acceder a los valores y funciones definidas en el contexto
    <SuperContext.Provider
      value={{
        loading,
        error,
        items,
        getItem,
        busquedaitems,
        setBusquedaitems,
      }}
    >
      {/* Renderiza los componentes hijos dentro del contexto */}
      {children}
    </SuperContext.Provider>
  );
};
/// Exporta el contexto para que pueda ser utilizado en otros componentes
export const useSuper = () => useContext(SuperContext);
