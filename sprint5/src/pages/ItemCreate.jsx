import React, { useContext } from "react";
import { useItem } from "../context/ItemContext";
const ItemCreate = () => {
  const { addItem, heroesfav, setHeroesfav } = useItem();

  const handleAddItem = (e) => {
    e.preventDefault();
    const newItem = {
      id: Date.now(),
      name,
      poder,
      edad,
    };
    addItem(newItem);
  };

  const añadirSuperheroe = (e) => {

  }

  return (
    <div>
      <h1>ItemCreate</h1>
      <form action="">
        <div className="mx-4 my-4">
          <input
            type="text"
            placeholder="Nombre"
            className="text-white p-2 border border-gray-700 rounded"
            value={name}
          />
          <input
            type="text"
            placeholder="Poder"
            className="text-white p-2 border border-gray-700 rounded"
          />
          <input
            type="text"
            placeholder="Edad"
            className="text-white p-2 border border-gray-700 rounded"
          />
        </div>
        <button
          onClick={añadirSuperheroe}
          className="mx-2 border border-amber-600 rounded-lg text-lg font-semibold cursor-pointer"
        >
          Agregar
        </button>
      </form>
    </div>
  );
};

export default ItemCreate;
