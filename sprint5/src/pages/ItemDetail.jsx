import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useItem } from "../context/ItemContext";

const ItemDetail = () => {
  const { id } = useParams(); // Extraemos el id de la URL
  const { items } = useItem(); // Obtenemos los ítems del contexto
  const navigate = useNavigate();

  // Buscamos el ítem correspondiente en la lista de items usando el id
  const item = items.find((item) => item.id === parseInt(id));

  // Si no se encuentra el ítem, mostramos un mensaje de error
  if (!item) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Ítem no encontrado</h1>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
        >
          Volver a la lista
        </button>
      </div>
    );
  }

  // Mostramos los detalles del ítem
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Detalles del Héroe</h1>
      <div className="border border-gray-300 rounded-lg shadow-md p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">{item.nombreSuperHeroe}</h2>
        <p className="text-gray-600 mb-2">Nombre Real: {item.nombreReal}</p>
        <p className="text-gray-600 mb-2">Edad: {item.edad}</p>
        <p className="text-gray-600 mb-4">ID: {item.id}</p>
        <button
          onClick={() => navigate(`/items/${item.id}/edit`)}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200 mr-2"
        >
          Editar
        </button>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
        >
          Volver a la lista
        </button>
      </div>
    </div>
  );
};

export default ItemDetail;
// import { useContext, useEffect, useState } from "react";
// import { useParams, Navigate, useNavigate } from "react-router-dom";
// import { useItem } from "../context/ItemContext";

// const ItemDetail = () => {
//   const { heroesfav, items, setHeroesfav } = useItem();
//   const { id } = useParams(); // Extrae el id de la URL
//   console.log("id", id);
//   const [loading, setLoading] = useState(true); // Estado para manejar la carga
//   const [error, setError] = useState(null); // Estado para manejar errores
//   const [itemdetalle, setItemdetalle] = useState([]); // Estado para manejar los detalles del item
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(
//           `https://nodofullstack-m3-0w08.onrender.com/api/heroes/id/${id}`
//           // `http://localhost:3000/api/heroes/id/${id}`
//         );
//         if (!response.ok) throw new Error("No se pudo obtener los datos.");
//         const data = await response.json();

//         // Si la API devuelve un objeto, conviértelo en un array
//         setItemdetalle(Array.isArray(data) ? data : [data]);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [id]);

//   if (loading) return <p>Cargando...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <>
//       <div className="mx-10 mt-5 w-50">
//       <h1>Detalle del héroe</h1>
//         {itemdetalle.map((item) => (
//           <div key={item.id}>
//             <h1>{item.nombreSuperHeroe}</h1>
//             <h2>{item.nombreReal}</h2>
//             <h3>{item.edad}</h3>
//             <h4>{item.planetaOrigen}</h4>
//             <h5>{item.debilidad}</h5>
//             <h6>{item.poderes}</h6>
//             <p>{item.aliados}</p>
//             <p>{item.enemigos}</p>
//           </div>
//         ))}
//         <button onClick={()=>navigate(`edit`)}>editar</button>
//       </div>
//     </>
//   );
// };

// export default ItemDetail;
