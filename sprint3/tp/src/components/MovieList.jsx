import React from "react";
import movies from "../api/movies.json";

const MovieList = ({ watchlist, setWatchlist }) => {


  const addWatchlist = (movies) => {
    if (!watchlist.some(item => item.id === movie.id)) { 
    const updatedWatchlist = [...watchlist, movies]; // Actualiza la lista
    setWatchlist(updatedWatchlist); // Actualiza el estado
    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist)); // Guarda en localStorage
    }
    else {
      alert("Ya se encuentra en la watchlist")
    }
  };

  return (
    <div className=" text-white p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {movies.map((movie) => (
        <div
          key={movie.id}
          className="bg-gray-800 p-4 rounded shadow-md text-center"
        >
          <img src={`src/assets/img/${movie.img}.jpg`} alt="" />
          <p>{movie.name}</p>
          <button
            className="bg-green-500 text-white px-4 py-2"
            onClick={() => addWatchlist(movie)}
          >
            Agregar
          </button>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
