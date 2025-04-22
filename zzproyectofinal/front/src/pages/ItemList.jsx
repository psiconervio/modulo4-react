import React, { useEffect } from "react";
import { useItem } from "../context/ItemContext";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ItemList = () => {
  const { items, heroesfav, handleAddToFavorites,
    getItem,
    addItem,
    removeItem,
    clearItems,
    busqueda,
    setBusqueda,
    setHeroesfav,
    loading,
    error, } = useItem();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const url = import.meta.env.VITE_API_URL;
  //   console.log(url);
  // },[]);

  return (
    <>
      <div className="mx-4 my-4">
        <h1 className="text-2xl font-bold">Todos los heroes</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div key={item.id} className="bg-gray-800 p-4 rounded-lg shadow-md">
              <h1 className="text-white text-xl font-bold">
                Nombre: {item.Nombre}
              </h1>
              <h2 className="text-gray-400">Nombre real: {item.NombreReal}</h2>
              <p className="text-gray-300">Edad: {item.Edad}</p>
              <p className="text-gray-300">
                Planeta de Origen: {item.PlanetaOrigen}
              </p>
              <p className="text-gray-300">Debilidad: {item.Debilidad}</p>
              <p className="text-gray-300">id: {item.id}</p>
              {/* <button
                onClick={() => {
                  if (heroesfav.some((hero) => hero.id === item.id)) {
                    Swal.fire({
                      title: "Good job!",
                      text: "You clicked the button!",
                      icon: "success",
                    });
                  } else {
                    toast.success("Agregado a favoritos");
                  }
                  handleAddToFavorites(item);
                }}
                className=""
              >
                {heroesfav.some((hero) => hero.id === item.id)
                  ? "Quitar de favoritos"
                  : "Agregar a favoritos"}
              </button> */}
              <button
                onClick={() => navigate(`/items/${item.id}`)}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
              >
                Ver detalles
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ItemList;
