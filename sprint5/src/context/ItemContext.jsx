import { useContext, useState, useEffect } from "react";

const ItemContext = useContext();

const ItemProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    useEffect(() => {
      localStorage.setItem("items", JSON.stringify(items));
    }, [items]);
    return JSON.parse(localStorage.getItem("items")) || [];
  });

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
    <ItemContext.Provider value={{ items, addItem, removeItem, clearItems }}>
      {children}
    </ItemContext.Provider>
  );
};
