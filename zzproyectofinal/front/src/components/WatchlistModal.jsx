/* eslint-disable react/prop-types */
import React from "react";

const WatchlistModal = ({
  isModalOpen,
  setIsModalOpen,
  watchlist,
  setWatchlist,
}) => {
  // Verifica si la variable `isModalOpen` es falsa o no está definida
  if (!isModalOpen)
    // Si `isModalOpen` es falsa, retorna `null` y no renderiza nada
    return null;

  const onClose = () => setIsModalOpen(false); // cerrar modal
  const removerFromWatchlist = (id) => {
    setWatchlist(watchlist.filter((movie) => movie.id !== id));
  };

  return (
    <div className=" fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center <-50">
      <div className="bg-white p-6 w-11/12 max-wmd relative rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold">Peliculas</h2>
        <p>WatchlistModal</p>

        {watchlist.length === 0 ? (
          <p>No hay peliculas en la watchlist</p>
        ) : (
          watchlist.map((movie) => (
            <div className="my-2" key={movie.id}>
              <p>{movie.name}</p>
              <button
                className="bg-red-500 text-white px-4 py-2"
                onClick={() => removerFromWatchlist(movie.id)}
              >
                remover{" "}
              </button>
            </div>
          ))
        )}
        <button className="bg-gray-500 text-white px-4 py-2" onClick={onClose}>
          CERRAR{" "}
        </button>
      </div>
    </div>
  );
};

export default WatchlistModal;
