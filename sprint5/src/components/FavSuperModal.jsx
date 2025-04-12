import React from "react";
import { useItem } from "../context/ItemContext";

const FavSuperModal = () => {
  const { heroesfav } = useItem();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
      <div className="bg-black p-6 w-11/12 max-w-md relative rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Heroes Favoritos</h2>
        {heroesfav.length === 0 ? (
          <p>No hay heroes en la lista de favoritos</p>
        ) : (
          <div className="space-y-4">
            {heroesfav.map((hero) => (
              <div
                key={hero.id}
                className="flex items-center space-x-4 border p-2 rounded"
              >
                {hero.image && (
                  <img
                    src={hero.image}
                    alt={hero.Nombre}
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
                <div className="flex-1">
                  <p className="font-semibold">{hero.Nombre}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavSuperModal;
