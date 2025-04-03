// import React, { useEffect, useState } from "react";
// import { api } from "../api/api";
// import { toast } from "react-toastify";

// export const FetchCharacters = ({ personajes, setPersonajes }) => {
//   const [ischaracters, setIscharacters] = useState([]);

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
//   //   console.log(FetchCharacters);
//   return (
//     <>
//       <div className="text-center text-white my-10 mx-8">
//         <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
//           {ischaracters.map((character) => (
//             <li
//               className="bg-gray-700 p-4 rounded-lg shadow-m"
//               key={character.id}
//             >
//               <div className="flex items-center justify-center">
//                 <img src={character.image} alt={character.name} />
//               </div>
//               <h2>{character.name}</h2>
//               <p>{character.species}</p>
//               <button
//                 onClick={() => añadirPersonajesFav(character)}
//                 className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//               >
//                 <i className="bi bi-heart-fill"></i> Agregar a Favoritos
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </>
//   );
// };
