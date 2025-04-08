import React, { createContext, useState } from "react";
import { featchPersonaId } from "../services/jugadoresapi";

const ItemContext = createContext();

const ItemProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [items, setItems] = useState(() => {
    return JSON.parse(localStorage.getItem("items")) || [];
  });

  const getItem = async (id) => {
    setLoading(true);
    try {
      const data = await featchPersonaId(id);
      setItems(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching items:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const addItem = (item) => {
    setItems((prevItems) => [...prevItems, item]);
  };

  const removeItem = (itemId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const clearItems = () => {
    setItems([]);
  };

  return (
    <ItemContext.Provider
      value={{ items, getItem, addItem, removeItem, clearItems, loading, error }}
    >
      {children}
    </ItemContext.Provider>
  );
};

export { ItemProvider, ItemContext };
