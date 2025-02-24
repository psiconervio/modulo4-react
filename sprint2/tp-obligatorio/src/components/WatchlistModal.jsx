const WatchlistModal = ({ watchlist, onClose, removeFromWatchlist }) => (
    
  <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-6 rounded shadow-lg w-96">
      <h2 className="text-xl font-bold">Mi Watchlist</h2>
      <ul>
        {watchlist.map((movie) => (
          <li key={movie.id} className="flex justify-between mt-2">
            {movie.title}
            <button
              className="text-red-500"
              onClick={() => removeFromWatchlist(movie.id)}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
      <button
        className="mt-4 bg-gray-500 text-white px-4 py-2"
        onClick={onClose}
      >
        Cerrar
      </button>
    </div>
  </div>
);

export default WatchlistModal;
