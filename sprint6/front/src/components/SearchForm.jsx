// SearchForm.jsx
import { usePersonaje } from "../context/CharacterContext";
import { useItem } from "../context/ItemContext";

const SearchForm = () => {
  //importamos el contexto de personajes
  const { getItem, busqueda, setBusqueda } = useItem();

  const handleSubmit = (e) => {
    e.preventDefault();
    getItem(busqueda);
  };
  console.log("el nombre es", busqueda);

  return (
    <div className="mx-4 my-4">
      <form className="text-white mx-4 my-4" onSubmit={handleSubmit}>
        <input
          type="text"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar personaje"
          className="text-white p-2 border border-gray-700 rounded mx-2"
        />
        <button className=" bg-blue-600 rounded p-2 mx-2" type="submit">
          Buscar Personaje
        </button>
      </form>
    </div>
  );
};

export default SearchForm;

// // SearchForm.jsx
// import { useState } from "react";
// import { usePersonaje } from "../context/CharacterContext";

// const SearchForm = ( ) => {
//   const { getPersonaje, busqueda, setBusqueda } = usePersonaje();
//   const [character, setCharacter] = useState([])
//   const [name, setName] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     getPersonaje(busqueda);
//   };
//   console.log("el nombre es",busqueda)

//   return (
//     <form className="text-white mx-4 my-4" onSubmit={handleSubmit}>
//       <input
//         type="text"
//         value={busqueda}
//         onChange={(e) => setBusqueda(e.target.value)}
//         placeholder="Buscar personaje"
//         className="text-white p-2 border border-gray-700 rounded"
//       />
//       <button type="submit">Buscar</button>
//     </form>
//   );
// };
// export default SearchForm;

// import React, { useState } from 'react';
// const SearchForm = ({ onSearch }) => {
//   const [name, setName] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSearch(name);
//   };

//   return (
//     <form className='text-white mx-4 my-4' onSubmit={handleSubmit}>
//       <input
//         type="text"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         placeholder="Buscar personaje"
//         className='text-white p-2 border border-gray-700 rounded'
//       />
//       <button type="submit">Buscar</button>
//     </form>
//   );
// };

// export default SearchForm;

//Codigo con debounce
// import React from "react";

// const SearchForm = ({ name, setName }) => {
//   return (
//     <form className="text-white mx-4 my-4">
//       <input
//         type="text"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         placeholder="Buscar personaje"
//         className="text-white p-2 border border-gray-700 rounded"
//       />
//     </form>
//   );
// };

// export default SearchForm;

// import React from "react";
// import { useState } from "react";
// import { usePersonaje } from "../context/CharacterContext";

// export const FormSearchCharacteres = () => {
//   const [personaje, setPersonaje] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [busqueda, setBusqueda] = useState("");

//   const { getPersonaje } = usePersonaje();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     if (!personaje.trim() === "") return;
//     getPersonaje(personaje);
//   };
// //APLICAR FILTRO DE NOMBRES Y PERSONAJES Y MOSTRAR EN EL MODAL
// // MINUTO 46 CLASE CONSULTA 25-03
//   return (
//     <form onSubmit={handleSubmit} className="flex gap-2 mb-6" action="">
//       <input
//         type="text"
//         value={personaje}
//         onChange={(e) => setPersonaje(e.target.value)}
//         placeholder=" Ingresar personaje"
//         className="p-2 border border-gray-700 rounded"
//       />
//       <button
//         type="submit"
//         className="bg-white hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//       >
//         buscarpersonaje
//       </button>
//     </form>
//   );
// };
