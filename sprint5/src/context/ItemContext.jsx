import React, { createContext, useState, useContext, useEffect } from "react";
import { apidbmongo } from "../services/jugadoresapi"; // Import your API function here
const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  //busqueda por id
  const [busqueda, setBusqueda] = useState();
  const [heroesfav, setHeroesfav] = useState([]);

  const [items, setItems] = useState(() => {
    return JSON.parse(localStorage.getItem("items")) || [];
  });

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
  //cargar base de datos
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
    console.log("items", items);
  }, [items]);

  // const addItem = (newheroe) => {
  //   setHeroesfav((prevHeroes) => {
  //     const existingHero = prevHeroes.find((hero) => hero.id === newheroe.id);
  //     if (existingHero) {
  //       return prevHeroes.map((hero) =>
  //         hero.id === newheroe.id ? { ...hero, ...newheroe } : hero
  //       );
  //     } else {
  //       return [...prevHeroes, newheroe];
  //     }
  //   });
  // };

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
        loading,
        error,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};

export const useItem = () => useContext(ItemContext);
