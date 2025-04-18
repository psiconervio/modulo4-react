import React from "react";
import { useNavigate } from "react-router-dom";

const ItemCard = ({ id, nombreReal, nombreSuperHeroe, Edad }) => {
  const navigate = useNavigate();

  console.log("ID", id);
  console.log("nombreReal", nombreReal);
  console.log("nombreSuperHeroe", nombreSuperHeroe);
  console.log("Edad", Edad);

  return (
    <div className=" text-white border border-gray-300 rounded-lg shadow-md p-4 hover:shadow-lg transition duration-200">
      <h1 className="text-lg font-bold  mb-2">
        NombreSuperheroe:{nombreSuperHeroe}
      </h1>
      <h2 className="text-sm mb-1">Nombre Real: {nombreReal}</h2>
      <h3 className="text-sm mb-1">Edad: {Edad}</h3>
      <button
        onClick={() => navigate(`/items/${id}/edit`)}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
      >
        Editar
      </button>
      <button
        className="bg-green-500 mx-2 p-2 rounded"
        onClick={() => navigate(`/items/${id}`)}
      >
        Ver Detalles
      </button>
    
    </div>
  );
};

export default ItemCard;
// // ItemCard.jsx
// import React, { useContext, useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useItem } from "../context/ItemContext";

// const ItemCard = (
//   id = "",
//   nombreReal = "",
//   nombreSuperHeroe = "",
//   edad = ""
// ) => {
//   const { heroesfav, items, setHeroesfav } = useItem();
// //   const { id } = useParams(); // Extrae el id de la URL
//   const [loading, setLoading] = useState(true); // Estado para manejar la carga
//   const navigate = useNavigate();

//   return (
//     <div>
//       <h1>Detalle del héroe</h1>
//       <h1>{items.nombreSuperHeroe}</h1>
//       <h2>{items.nombreReal}</h2>
//       <h3>{items.edad}</h3>
//       <h3>{items.id}</h3>
//       {/* <h4>{planetaOrigen}</h4>
//       <h5>{debilidad}</h5> */}
//       <button onClick={() => navigate(`edit`)}>editar</button>
//     </div>
//   );
// };

// export default ItemCard;
