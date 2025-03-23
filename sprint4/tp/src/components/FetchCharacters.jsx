import React, { useEffect, useState } from "react";
import { api } from "../api/api";
import { toast } from "react-toastify";

export const FetchCharacters = () => {
  const [personajes, setPersonajes] = useState([]);

  useEffect(() => {
    api().then((data) => {
      console.log(data);
      setPersonajes(data.results);
      toast.success("Personajes cargados correctamente");
    });
  }, []);

  //   console.log(FetchCharacters);
  return (
    <>
      <div className="text-center text-white my-10 mx-8">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
          {personajes.map((personaje) => (
            <li className="bg-gray-700 p-4 rounded-lg shadow-m" key={personaje.id}>
              <div className="flex items-center justify-center">
                <img src={personaje.image} alt={personaje.name} />
              </div>
              <h2>{personaje.name}</h2>
              <p>{personaje.species}</p>
              <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Agregar a Favoritos
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
