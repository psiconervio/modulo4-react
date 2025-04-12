import React, { useContext, useState } from "react";
import { useItem } from "../context/ItemContext";

const ItemCreate = () => {
  const { addItem } = useItem();

  // Estados para los inputs
  const [name, setName] = useState("");
  const [poder, setPoder] = useState("");
  const [edad, setEdad] = useState("");

  const handlesubmit = (e) => {
    e.preventDefault();
    const id = Math.floor(Math.random() * 1000);
    const newheroe = { id, name, poder, edad };
    addItem(newheroe);

    // Limpiar los campos después de agregar
    setName("");
    setPoder("");
    setEdad("");
  };

  return (
    <div>
      <h1>ItemCreate</h1>
      <form onSubmit={handlesubmit}>
        <div className="mx-4 my-4">
          <input
            type="text"
            placeholder="Nombre"
            className="text-white p-2 border border-gray-700 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)} // Actualiza el estado
          />
          <input
            type="text"
            placeholder="Poder"
            className="text-white p-2 border border-gray-700 rounded"
            value={poder}
            onChange={(e) => setPoder(e.target.value)} // Actualiza el estado
          />
          <input
            type="text"
            placeholder="Edad"
            className="text-white p-2 border border-gray-700 rounded"
            value={edad}
            onChange={(e) => setEdad(e.target.value)} // Actualiza el estado
          />
        </div>
        <button
          type="submit"
          className="mx-2 border border-amber-600 rounded-lg text-lg font-semibold cursor-pointer"
        >
          Agregar
        </button>
      </form>
    </div>
  );
};

export default ItemCreate;
