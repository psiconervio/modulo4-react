import React, { useEffect } from "react";
import { useItem } from "../context/ItemContext";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ItemList = () => {
  const { items, heroesfav, handleAddToFavorites } = useItem();

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
              <button
                onClick={() => {
                  if (heroesfav.some((hero) => hero.id === item.id)) {
                    Swal.fire({
                      title: "Good job!",
                      text: "You clicked the button!",
                      icon: "success"
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
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ItemList;
