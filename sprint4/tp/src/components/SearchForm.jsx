import React, { useState } from 'react'; 
// Importamos React y el hook useState. React es necesario para crear componentes, 
// y useState nos permite manejar el estado dentro de un componente funcional.

const SearchForm = ({ onSearch }) => { 
  // Declaramos un componente funcional llamado SearchForm. Este componente recibe una prop llamada `onSearch`, 
  // que es una función que se ejecutará cuando el formulario sea enviado.
  const [name, setName] = useState(''); 
  // Usamos el hook useState para crear una variable de estado llamada `name` y su función actualizadora `setName`. 
  // Inicialmente, `name` tiene un valor vacío ('').
  const handleSubmit = (e) => { 
    e.preventDefault(); 
    // Esta función se ejecuta cuando el formulario es enviado. 
    // `e.preventDefault()` evita que la página se recargue al enviar el formulario.
    onSearch(name); 
    // Llamamos a la función `onSearch` (pasada como prop) y le pasamos el valor actual de `name`. 
    // Esto permite que el componente padre reciba el valor buscado.
  };
  return (
    <form className='text-white mx-4 my-4' onSubmit={handleSubmit}> 
      {/* Creamos un formulario con clases de estilo (probablemente de Tailwind CSS) y asignamos la función `handleSubmit` al evento `onSubmit`. */}
     <input
        type="text" 
        value={name} 
        // El valor del input está vinculado al estado `name`. Esto lo convierte en un "input controlado".
        onChange={(e) => setName(e.target.value)} 
        // Cada vez que el usuario escribe algo, se actualiza el estado `name` con el valor actual del input.
        placeholder="Buscar personaje" 
        // Texto que aparece como sugerencia en el campo de entrada cuando está vacío.
        className='text-white p-2 border border-gray-700 rounded' 
        // Clases de estilo para el input.
      />
      <button type="submit">Buscar</button> 
      {/* Botón para enviar el formulario. Al hacer clic, se ejecuta `handleSubmit`. */}
    </form>
  );
};

export default SearchForm; 

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
