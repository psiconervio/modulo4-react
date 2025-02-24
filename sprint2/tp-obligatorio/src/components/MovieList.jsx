import MovieCard from "./MovieCard";

const MovieList = ({ movies, addToWatchlist }) => (
    
  <div className="grid grid-cols-3 gap-4">
    {movies.map((movie) => (
      <MovieCard key={movie.id} movie={movie} onAdd={addToWatchlist} />
    ))}
  </div>
);

export default MovieList;
