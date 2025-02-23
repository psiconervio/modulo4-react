import React from "react";

const MovieCard = ({ movie, onAdd }) => (
  <div>
    <h3>{movie.title}</h3>
    <button onClick={() => onAdd(movie)}>Agregar a mi lista</button>
  </div>
);
