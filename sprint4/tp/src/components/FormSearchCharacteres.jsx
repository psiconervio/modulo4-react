import React from "react";
import { useState } from "react";
import { usePersonaje } from "../context/CharacterContext";

export const FormSearchCharacteres = () => {
  const [personaje, setPersonaje] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  const { getPersonaje } = usePersonaje();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if (!personaje.trim() === "") return;
    getPersonaje(personaje);
  };
//APLICAR FILTRO DE NOMBRES Y PERSONAJES Y MOSTRAR EN EL MODAL 
// MINUTO 46 CLASE CONSULTA 25-03
  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6" action="">
      <input
        type="text"
        value={personaje}
        onChange={(e) => setPersonaje(e.target.value)}
        placeholder=" Ingresar personaje"
        className="p-2 border border-gray-700 rounded"
      />
      <button
        type="submit"
        className="bg-white hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        buscarpersonaje
      </button>
    </form>
  );
};
