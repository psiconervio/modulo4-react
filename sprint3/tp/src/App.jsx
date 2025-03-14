// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import EjemploMotion from "./components/EjemploMotion";
import { useState } from "react";
import WatchlistModal from "./components/WatchlistModal";
import MovieList from "./components/MovieList";
import { useEffect } from "react";
import { useAuth } from "./context/AuthContext";

function App() {
  const { isAuthenticated } = useAuth();
  // const [count, setCount] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [watchlist, setWatchlist] = useState([]);

  //ver si hay peliculas en la watchlist en localstorage
  useEffect(() => {
    const storedWatchlist = localStorage.getItem("watchlist");
    if (storedWatchlist) {
      setWatchlist(JSON.parse(storedWatchlist)); // Convierte la cadena en un objeto/array
    }
  }, []);

  return (
    <>
      <Navbar />
      <Header setIsModalOpen={setIsModalOpen} />
      {!isAuthenticated ? (
        <p>isAuthenticated : false</p>
      ) : (
        <p> isAuthenticated : true </p>
      )}
      {/* <WatchlistModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        watchlist={watchlist}
        setWatchlist={setWatchlist}
      /> */}
      {/* <MovieList watchlist={watchlist} setWatchlist={setWatchlist} /> */}
      {/* <EjemploMotion /> */}
      <Main />
      <Footer />
    </>
  );
}

export default App;
