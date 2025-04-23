import { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { apidbmongo, apidbmongoNombre } from "../services/jugadoresapi"; // Import your API function here
const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  //busqueda por id
  const [busqueda, setBusqueda] = useState("");
  //modal favoritos
  const [heroesfav, setHeroesfav] = useState([]);
  const [resultadosbusqueda, setResultadosbusqueda] = useState([]);
  //estado para fetchear base de datos
  const [items, setItems] = useState(() => {
    return JSON.parse(localStorage.getItem("items")) || [];
  });
  useEffect(() => {
    console.log("Resultados de búsqueda:", resultadosbusqueda);
  }, [resultadosbusqueda]);
  //obtener heroe db por id
  const getItem = async (nombre) => {
    setLoading(true);
    try {
      const data = await apidbmongoNombre(nombre);
      console.log("Data fetched:", data);
      setResultadosbusqueda(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching items:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  //cargar base de datos en state items
  useEffect(() => {
    const fetchItemsFromDatabase = async () => {
      setLoading(true);
      try {
        const data = await apidbmongo();
        setItems(data);
        toast.success("Base de datos cargada correctamente");
        setError(null);
      } catch (error) {
        console.error("Error fetching items from database:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchItemsFromDatabase();
  }, []);
  // Guardar favoritos en el almacenamiento local cuando cambien
  useEffect(() => {
    localStorage.setItem("heroesfav", JSON.stringify(heroesfav));
  }, [heroesfav]);

  // const handleAddToFavorites = (item) => {
  //   const existingHero = heroesfav.find((hero) => hero.id === item.id);
  //   if (existingHero) {
  //     setHeroesfav((prevHeroes) =>
  //       prevHeroes.filter((hero) => hero.id !== item.id)
  //     );
  //     toast.error("Quitar de favoritos");
  //   } else {
  //     setHeroesfav((prevHeroes) => [...prevHeroes, item]);
  //     toast.success("Agregado a favoritos");
  //   }
  // };
  // Cargar favoritos desde el almacenamiento local al montar el contexto
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("heroesfav")) || [];
    setHeroesfav(storedFavorites);
  }, []);

  // Añadir personaje
  const addItem = async (newheroe) => {
    try {
      const response = await fetch(
        "https://nodofullstack-m3-0w08.onrender.com/api/heroes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newheroe),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add hero");
      }

      const savedHero = await response.json();

      setHeroesfav((prevHeroes) => {
        const existingHero = prevHeroes.find(
          (hero) => hero.id === savedHero.id
        );
        if (existingHero) {
          const updatedHeroes = prevHeroes.map((hero) =>
            hero.id === savedHero.id ? { ...hero, ...savedHero } : hero
          );
          toast.error("Quitar de favoritos");
          return updatedHeroes;
        } else {
          toast.success("Agregado a favoritos");
          return [...prevHeroes, savedHero];
        }
      });
    } catch (error) {
      console.error("Error adding hero:", error);
    }
  };

  const removeItem = (itemId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const clearItems = () => {
    setItems([]);
  };

  return (
    <ItemContext.Provider
      value={{
        items,
        getItem,
        addItem,
        removeItem,
        clearItems,
        busqueda,
        setBusqueda,
        heroesfav,
        setHeroesfav,
        resultadosbusqueda,
        loading,
        error,
        // handleAddToFavorites,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};

export const useItem = () => useContext(ItemContext);
