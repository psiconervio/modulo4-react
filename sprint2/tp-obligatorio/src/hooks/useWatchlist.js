import { useState, useEffect } from "react";

const useWatchlist = () => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const savedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(savedWatchlist);
  }, []);

  const addToWatchlist = (movie) => {
    const updatedList = [...watchlist, movie];
    setWatchlist(updatedList);
    localStorage.setItem("watchlist", JSON.stringify(updatedList));
  };

  const removeFromWatchlist = (id) => {
    const updatedList = watchlist.filter(movie => movie.id !== id);
    setWatchlist(updatedList);
    localStorage.setItem("watchlist", JSON.stringify(updatedList));
  };

  return { watchlist, addToWatchlist, removeFromWatchlist };
};

export default useWatchlist;
