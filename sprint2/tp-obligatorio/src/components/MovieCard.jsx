const MovieCard = ({ movie, onAdd }) => (

  <div className="border p-4 rounded shadow-md">
    <img
      src={movie.img}
      alt={movie.name}
      className="w-full h-40 object-cover"
    />
    <h3 className="text-lg font-bold">{movie.name}</h3>
    <button
      className="bg-blue-500 text-white px-4 py-2 mt-2"
      onClick={() => onAdd(movie)}
    >
      Agregar a mi lista
    </button>
  </div>
);

export default MovieCard;
