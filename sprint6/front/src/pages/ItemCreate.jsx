import React, { useState } from "react";
import { useItem } from "../context/ItemContext";
import { toast } from "react-toastify";


const ItemCreate = () => {
  const { addItem } = useItem();

  // Estados para los inputs
  const [nombreSuperHeroe, setNombreSuperHeroe] = useState("");
  const [nombreReal, setNombreReal] = useState("");
  const [edad, setEdad] = useState("");
  const [planetaOrigen, setPlanetaOrigen] = useState("Desconocido");
  const [debilidad, setDebilidad] = useState("");
  const [poderes, setPoderes] = useState("");
  const [aliados, setAliados] = useState("");
  const [enemigos, setEnemigos] = useState("");

  const handlesubmit = (e) => {
    e.preventDefault();

    // Crear el objeto con los datos del formulario
    const newHeroe = {
      nombreSuperHeroe,
      nombreReal,
      edad: parseInt(edad, 10), // Convertir edad a número
      planetaOrigen,
      debilidad,
      poderes: poderes.split(","), // Convertir a array separando por comas
      aliados: aliados.split(","), // Convertir a array separando por comas
      enemigos: enemigos.split(","), // Convertir a array separando por comas
    };

    addItem(newHeroe);
    toast.success("Superhéroe agregado correctamente");

    // Limpiar los campos después de agregar
    setNombreSuperHeroe("");
    setNombreReal("");
    setEdad("");
    setPlanetaOrigen("Desconocido");
    setDebilidad("");
    setPoderes("");
    setAliados("");
    setEnemigos("");
  };

  return (
    <div className="bg-gray-800 text-white p-4 rounded shadow-md mb-4 mx-3">
      <h1 className="text-xl font-bold">Crear Jugador</h1>
      <form className="" onSubmit={handlesubmit}>
        <div className="mx-4 my-4">
          <input
            type="text"
            placeholder="Nombre del Superhéroe"
            className="text-white p-2 border border-gray-700 rounded"
            value={nombreSuperHeroe}
            onChange={(e) => setNombreSuperHeroe(e.target.value)}
          />
          <input
            type="text"
            placeholder="Nombre Real"
            className="text-white p-2 border border-gray-700 rounded"
            value={nombreReal}
            onChange={(e) => setNombreReal(e.target.value)}
          />
          {/* <input
            type="number"
            placeholder="Edad"
            className="text-white p-2 border border-gray-700 rounded"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
          />
          <input
            type="text"
            placeholder="Planeta de Origen"
            className="text-white p-2 border border-gray-700 rounded"
            value={planetaOrigen}
            onChange={(e) => setPlanetaOrigen(e.target.value)}
          />
          <input
            type="text"
            placeholder="Debilidad"
            className="text-white p-2 border border-gray-700 rounded"
            value={debilidad}
            onChange={(e) => setDebilidad(e.target.value)}
          />
          <input
            type="text"
            placeholder="Poderes (separados por comas)"
            className="text-white p-2 border border-gray-700 rounded"
            value={poderes}
            onChange={(e) => setPoderes(e.target.value)}
          />
          <input
            type="text"
            placeholder="Aliados (separados por comas)"
            className="text-white p-2 border border-gray-700 rounded"
            value={aliados}
            onChange={(e) => setAliados(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enemigos (separados por comas)"
            className="text-white p-2 border border-gray-700 rounded"
            value={enemigos}
            onChange={(e) => setEnemigos(e.target.value)}
          /> */}
        </div>
        <button
          type="submit"
          className="mx-2 bg-amber-600 rounded p-2 text-lg font-semibold cursor-pointer"
        >
          Agregar
        </button>
      </form>
    </div>
  );
};

export default ItemCreate;
