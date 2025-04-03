import { useState } from "react";
import SearchForm from "./SearchForm";
import { toast } from "react-toastify";
import { usePersonaje } from "../context/CharacterContext";

// export const PersonajesSearch = ({ personajes, setPersonajes }) => {
export const PersonajesSearch = () => {
  const { personajes,setPersonajes, getPersonaje, buscarpersonaje, loading, error } = usePersonaje()
  const [characters, setCharacters] = useState([]);

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
  console.log(personajes)
  // const { getPersonaje, personajes } = personajes
  // const fetchCharacters = async (name) => {
  //   // funcion para buscar personajes en la API el parametro onSearch de searchForm
  //   try {
  //     const response = await fetch(
  //       `https://rickandmortyapi.com/api/character/?name=${name}`
  //     );
  //     const data = await response.json();
  //     setCharacters(data.results || []);
  //     setError(null);
  //   } catch (err) {
  //     console.error(err);
  //     setError("Error al buscar personajes");
  //   }
  // };
  return (
    <div className="mx-4 my-4 text-white ">
      <h1>Buscar Personajes de Rick y Morty</h1>
      {/* <SearchForm onSearch={fetchCharacters} /> */}
      <SearchForm />
      {/* Componente `SearchForm` que recibe la función `fetchCharacters` como prop.
          Esta función se ejecutará cuando el usuario realice una búsqueda. */}
      {error && <p>{error}</p>}
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 items-center justify-center">
        {characters.map((character) => (
          <li
            className="bg-gray-700 p-4 rounded-lg shadow-m flex items-center justify-center flex-col"
            key={character.id}
          >
            <div className="flex items-center justify-center">
              <img
                src={character.image}
                alt={character.name}
                className="w-50"
              />
            </div>
            <div>{character.name}</div>
            <button
              // onClick={() => añadirPersonajesFav(character)}
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
// import React, { useState, useEffect } from "react";
// import SearchForm from "./SearchForm";
// import { toast } from "react-toastify";

// export const PersonajesSearch = ({ personajes, setPersonajes }) => {
//   const [characters, setCharacters] = useState([]);
//   const [error, setError] = useState(null);

//   const añadirPersonajesFav = (personaje) => {
//     if (!personajes.some((item) => item.id === personaje.id)) {
//       const updatedPersonajes = [...personajes, personaje];
//       setPersonajes(updatedPersonajes);
//       localStorage.setItem("personajes", JSON.stringify(updatedPersonajes));
//       toast.success("Personaje agregado a favoritos");
//     } else {
//       toast.error("El personaje ya se encuentra en la lista de favoritos");
//     }
//   };

//   const fetchCharacters = async (name) => {
//     try {
//       const response = await fetch(
//         `https://rickandmortyapi.com/api/character/?name=${name}`
//       );
//       const data = await response.json();
//       setCharacters(data.results || []);
//       setError(null);
//     } catch (err) {
//       console.error(err);
//       setError("Error al buscar personajes");
//     }
//   };

//   return (
//     <div className="mx-4 my-4 text-white ">
//       <h1>Buscar Personajes de Rick y Morty</h1>
//       <SearchForm onSearch={fetchCharacters} />
//       {error && <p>{error}</p>}
//       <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 items-center justify-center">
//         {characters.map((character) => (
//           <li
//             className="bg-gray-700 p-4 rounded-lg shadow-m flex items-center justify-center flex-col"
//             key={character.id}
//           >
//             <div className="flex items-center justify-center">
//               <img src={character.image} alt={character.name} className="w-50" />
//             </div>
//             <div>
//             {character.name}

//             </div>
//             <button
//               onClick={() => añadirPersonajesFav(character)}
//               className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//             >
//               <i className="bi bi-heart-fill"></i> Agregar a Favoritos
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };
//Codigoo con debounce
// import React, { useState, useEffect } from "react";
// import SearchForm from "./SearchForm";
// import { toast } from "react-toastify";

// export const PersonajesSearch = ({ personajes, setPersonajes }) => {
//   const [characters, setCharacters] = useState([]);
//   const [error, setError] = useState(null);
//   const [name, setName] = useState(""); // Estado para el nombre ingresado

//   const añadirPersonajesFav = (personaje) => {
//     if (!personajes.some((item) => item.id === personaje.id)) {
//       const updatedPersonajes = [...personajes, personaje];
//       setPersonajes(updatedPersonajes);
//       localStorage.setItem("personajes", JSON.stringify(updatedPersonajes));
//       toast.success("Personaje agregado a favoritos");
//     } else {
//       toast.error("El personaje ya se encuentra en la lista de favoritos");
//     }
//   };

//   useEffect(() => {
//     if (!name) {
//       setCharacters([]); // Si el input está vacío, limpiar la lista
//       return;
//     }

//     const timeoutId = setTimeout(async () => {
//       try {
//         const response = await fetch(
//           `https://rickandmortyapi.com/api/character/?name=${name}`
//         );
//         const data = await response.json();
//         setCharacters(data.results || []);
//         setError(null);
//       } catch (err) {
//         console.error(err);
//         setError("Error al buscar personajes");
//       }
//     }, 500); // Espera 500ms después de que el usuario deje de escribir

//     return () => clearTimeout(timeoutId); // Limpia el timeout anterior si el usuario sigue escribiendo
//   }, [name]); // Ejecutar cada vez que cambia `name`

//   return (
//     <div className="mx-4 my-4 text-white ">
//       <h1>Buscar Personajes de Rick y Morty</h1>
//       <SearchForm name={name} setName={setName} />
//       {error && <p>{error}</p>}
//       <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
//         {characters.map((character) => (
//           <li className="bg-gray-700 p-4 rounded-lg shadow-m" key={character.id}>
//             <div className="flex items-center justify-center">
//               <img src={character.image} alt={character.name}  />
//             </div>
//             {character.name}
//             <button
//               onClick={() => añadirPersonajesFav(character)}
//               className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//             >
//               <i className="bi bi-heart-fill"></i> Agregar a Favoritos
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };
