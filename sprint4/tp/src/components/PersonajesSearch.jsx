import React, { useState, useEffect } from "react";
import SearchForm from "./SearchForm";
import { ToastContainer, toast } from "react-toastify";
import { api } from "../api/api";

export const PersonajesSearch = ({ personajes, setPersonajes }) => {
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState(null);
  const [ischaracters, setIscharacters] = useState([]);

//   // console.log(personajes)
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await api();
//         // console.log(data);
//         setIscharacters(data.results);
//         toast.success("Personajes cargados correctamente");
//       } catch (error) {
//         console.error("Error fetching characters:", error);
//         toast.error("Error al cargar los personajes");
//       }
//     };

//     fetchData();
//   }, []);

  const añadirPersonajesFav = (personaje) => {
    if (!personajes.some((item) => item.id === personaje.id)) {
      const updatedPersonajes = [...personajes, personaje];
      setPersonajes(updatedPersonajes);
      localStorage.setItem("personajes", JSON.stringify(updatedPersonajes));
      toast.success("Personaje agregado a favoritos");
    } else {
      toast.error("El personaje ya se encuentra en la lista de favoritos");
    }
  };

  const fetchCharacters = async (name) => {
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/?name=${name}`
      );
      const data = await response.json();
      setCharacters(data.results || []);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Error al buscar personajes");
    }
  };

  return (
    <div className="mx-4 my-4 text-white ">
      <h1>Buscar Personajes de Rick y Morty</h1>
      <SearchForm onSearch={fetchCharacters} />
      {error && <p>{error}</p>}
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
        {characters.map((character) => (
          <li
            className="bg-gray-700 p-4 rounded-lg shadow-m"
            key={character.id}
          >
            <div className="flex items-center justify-center">
              <img src={character.image} alt={character.name} width={50} />
            </div>
            {character.name}
            <button
              onClick={() => añadirPersonajesFav(character)}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              <i className="bi bi-heart-fill"></i> Agregar a Favoritos
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
