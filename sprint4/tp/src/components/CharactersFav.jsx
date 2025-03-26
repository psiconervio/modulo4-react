import React from "react";
import { usePersonaje } from "../context/CharacterContext";

export const FormSearch = () => {
  const { personajes, getPersonajes, buscarpersonaje, loading, error } =
    usePersonaje();
  if (loading) return <p>cargando</p>;
  if (error) return <p>error{error}</p>;
  if (!personajes) return null;


const { name, episode    } = personajes

  return (
    <div className="flex justify-center items-center h-screen">
      <input
        type="text"
        placeholder="Buscar personaje"
        className="border border-gray-400 rounded p-2"
        onChange={(e) => buscarpersonaje(e.target.value)}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => getPersonajes()}
      >
        Buscar
      </button>
    </div>
  );
};
