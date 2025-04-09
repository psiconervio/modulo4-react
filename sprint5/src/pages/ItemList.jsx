import React, { useEffect, useContext } from "react";
import { ItemContext } from "../context/ItemContext";

const ItemList = () => {
  const { items, getItems } = useContext(ItemContext);

//   console.log(items);
//   useEffect(() => {
//     getItems();
//   }, []);
  return <div>ItemList</div>;
};

export default ItemList;
