import React, { useState, useEffect } from "react";
// Importamos React y los hooks `useState` y `useEffect`.
// `useState` se usa para manejar estados locales y `useEffect` para manejar efectos secundarios.
import SearchForm from "./SearchForm";
// Importamos el componente `SearchForm`, que probablemente contiene el formulario de búsqueda.
import { toast } from "react-toastify";
// Importamos la librería `react-toastify` para mostrar notificaciones al usuario.

export const PersonajesSearch = ({ personajes, setPersonajes }) => {
  // Componente funcional `PersonajesSearch` que recibe dos props:
  // `personajes`: lista de personajes favoritos.
  // `setPersonajes`: función para actualizar la lista de personajes favoritos.
  const [characters, setCharacters] = useState([]);
  // Estado local `characters` para almacenar los personajes obtenidos de la API.
  // `setCharacters` es la función para actualizar este estado.
  const [error, setError] = useState(null);
  // Estado local `error` para manejar errores en la búsqueda de personajes.
  const añadirPersonajesFav = (personaje) => {
    // Función para añadir un personaje a la lista de favoritos.
    if (!personajes.some((item) => item.id === personaje.id)) {
      // Verifica si el personaje ya está en la lista de favoritos.
      const updatedPersonajes = [...personajes, personaje];
      // Si no está, crea una nueva lista con el personaje añadido.
      setPersonajes(updatedPersonajes);
     // Actualiza el estado global de personajes favoritos.
      localStorage.setItem("personajes", JSON.stringify(updatedPersonajes));
      // Guarda la lista actualizada en el `localStorage` para persistencia.
      toast.success("Personaje agregado a favoritos");
      // Muestra una notificación de éxito.
    } else {
      toast.error("El personaje ya se encuentra en la lista de favoritos");
      // Si el personaje ya está en la lista, muestra una notificación de error.
    }
  };
  const fetchCharacters = async (name) => {
    // Función para buscar personajes en la API de Rick and Morty, el parametro onSearch de searchForm
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/?name=${name}`
      );
      // Realiza una solicitud a la API con el nombre del personaje.
      const data = await response.json();
      // Convierte la respuesta en un objeto JSON.
      setCharacters(data.results || []);
      // Actualiza el estado `characters` con los resultados obtenidos.
      // Si no hay resultados, se asigna un array vacío.
     setError(null);
      // Limpia cualquier error previo.
    } catch (err) {
      console.error(err);
      // Muestra el error en la consola.
      setError("Error al buscar personajes");
      // Actualiza el estado `error` con un mensaje de error.
    }
  };
  return (
    <div className="mx-4 my-4 text-white ">
      {/* Contenedor principal con clases de estilo (probablemente de Tailwind CSS). */}
      <h1>Buscar Personajes de Rick y Morty</h1>
      {/* Título de la página. */}
      <SearchForm onSearch={fetchCharacters} />
      {/* Componente `SearchForm` que recibe la función `fetchCharacters` como prop.
          Esta función se ejecutará cuando el usuario realice una búsqueda. */}
      {error && <p>{error}</p>}
      {/* Si hay un error, se muestra un mensaje en pantalla. */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 items-center justify-center">
        {/* Lista de personajes mostrada en un diseño de cuadrícula. */}
        {characters.map((character) => (
          <li
            className="bg-gray-700 p-4 rounded-lg shadow-m flex items-center justify-center flex-col"
            key={character.id}
            // Cada elemento de la lista tiene un estilo y una clave única basada en el ID del personaje.
          >
            <div className="flex items-center justify-center">
              <img src={character.image} alt={character.name} className="w-50" />
              {/* Imagen del personaje con su respectivo nombre como texto alternativo. */}
            </div>
            <div>
              {character.name}
              {/* Nombre del personaje. */}
            </div>
            <button
              onClick={() => añadirPersonajesFav(character)}
              // Al hacer clic en el botón, se llama a la función `añadirPersonajesFav` con el personaje actual.
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              // Clases de estilo para el botón.
            >
              <i className="bi bi-heart-fill"></i> Agregar a Favoritos
              {/* Icono y texto del botón. */}
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

