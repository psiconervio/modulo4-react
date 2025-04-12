import React, { useEffect, useContext } from "react";
import { useItem } from "../context/ItemContext";

const ItemList = () => {
  // const { items, getItem } = useSuper();
  const { items, getItem, heroesfav, setHeroesfav } = useItem();

  console.log(items);
  console.log("heroesfav", heroesfav);

  const handleAddToFavorites = (item) => {
    const existingHero = heroesfav.find((hero) => hero.id === item.id);
    if (existingHero) {
      setHeroesfav((prevHeroes) =>
        prevHeroes.filter((hero) => hero.id !== item.id)
      );
    } else {
      setHeroesfav((prevHeroes) => [...prevHeroes, item]);
    }
  };

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
              {/* <p className="text-gray-300">Poderes: {item.poderes.join(", ")}</p>
              <p className="text-gray-300">Aliados: {item.aliados.join(", ")}</p>
              <p className="text-gray-300">Enemigos: {item.enemigos.join(", ")}</p> */}
              <button onClick={() => handleAddToFavorites(item)} className="">
                Agregar a favoritos
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ItemList;
