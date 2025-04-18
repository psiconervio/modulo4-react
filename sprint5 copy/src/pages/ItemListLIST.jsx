import { useItem } from "../context/ItemContext";
import ItemCard from "../components/ItemCard";

const ItemList = () => {
  const { items } = useItem(); // Accede a los items desde el contexto

  // console.log("ITEMS", items);
  return (
    <div className="container mx-auto p-4 text-white">
      <h1 className="text-2xl font-bold text-gray-100 mb-6">Lista de Heroes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-white">
        {items.map((item) => (
          <ItemCard
            key={item.id}
            id={item.id}
            nombreReal={item.Nombre}
            nombreSuperHeroe={item.NombreReal}
            edad={item.Edad}
          />
        ))}
      </div>
    </div>
  );
};

export default ItemList;

// import React, { useEffect } from "react";
// import { useItem } from "../context/ItemContext";
// import { toast } from "react-toastify";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";
// import ItemCard from "../components/ItemCard.jsx";

// const ItemList = () => {
//   const { items, heroesfav, handleAddToFavorites } = useItem();
//   const navigate = useNavigate();

//   // useEffect(() => {
//   //   const url = import.meta.env.VITE_API_URL;
//   //   console.log(url);
//   // },[]);

//   return (
//     <>
//       <div className="mx-4 my-4">
//         <h1 className="text-2xl font-bold">Todos los heroes</h1>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {items.map((item) => (
//             <div key={item.id} className="bg-gray-800 p-4 rounded-lg shadow-md">
//               <ItemCard
//                 id={item.id}
//                 nombreReal={item.NombreReal}
//                 nombreSuperHeroe={item.Nombre}
//                 edad={item.Edad}
//               />
//               <button
//                 onClick={() => {
//                   if (heroesfav.some((hero) => hero.id === item.id)) {
//                     Swal.fire({
//                       title: "Good job!",
//                       text: "You clicked the button!",
//                       icon: "success",
//                     });
//                   } else {
//                     toast.success("Agregado a favoritos");
//                   }
//                   handleAddToFavorites(item);
//                 }}
//                 className=""
//               >
//                 {heroesfav.some((hero) => hero.id === item.id)
//                   ? "Quitar de favoritos"
//                   : "Agregar a favoritos"}
//               </button>
//               <button
//                 onClick={() => navigate(`/items/${item.id}`)}
//                 className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
//               >
//                 Ver detalles
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default ItemList;
