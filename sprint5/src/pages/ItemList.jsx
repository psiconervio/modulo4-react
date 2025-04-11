import React, { useEffect, useContext } from "react";
import { useSuper } from "../context/SuperContext";

const ItemList = () => {
  const { items, getItem } = useSuper();

  console.log(items);
  useEffect(() => {
    getItem();
  }, []);
  return (
    <>
      <div>ItemList</div>
      <button onClick={() => getItem()}> BOTONAPI</button>
    </>
  );
};

export default ItemList;
