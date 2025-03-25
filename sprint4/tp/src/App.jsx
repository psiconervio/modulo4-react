import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { useState } from "react";
import WatchlistModal from "./components/WatchlistModal";
import MovieList from "./components/MovieList";
import { useEffect, useContext } from "react";
import { useAuth } from "./context/AuthContext";
import ProductList from "./components/ProductList";
import { Cart } from "./components/Cart";
import { FetchCharacters } from "./components/FetchCharacters";
import { FormSearch } from "./components/FormSearch";
import { FavPersonajeModal } from "./components/FavPersonajeModal";
import { toast,ToastContainer } from "react-toastify";

function App() {
  // const { isAuthenticated } = useAuth();
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [watchlist, setWatchlist] = useState([]);
  // const [cart, setCart] = useState([]);
  // const [isModalOpenCart, setIsModalOpenCart] = useState(false);
  const [isModalFav, setIsModalFav] = useState(false);
  const [personajes, setPersonajes] = useState([]);

  //ver si hay peliculas en la watchlist en localstorage
  // useEffect(() => {
  //   const storedWatchlist = localStorage.getItem("watchlist");
  //   if (storedWatchlist) {
  //     setWatchlist(JSON.parse(storedWatchlist)); // Convierte la cadena en un objeto/array
  //   }
  // }, []);

  // //Cargar desde localstorage
  // useEffect(() => {
  //   const storeCart = localStorage.getItem("cart");
  //   if (storeCart) {
  //     setCart(JSON.parse(storeCart));
  //   }
  // }, []);

  useEffect(() => {
    const storedPersonajes = localStorage.getItem("personajes");
    if (storedPersonajes) {
      setPersonajes(JSON.parse(storedPersonajes));
    }
  }, []);
  return (
    <>
      <Navbar />
      <Header
        // setIsModalOpen={setIsModalOpen}
        // setIsModalOpenCart={setIsModalOpenCart}
        isModalFav={isModalFav}
        setIsModalFav={setIsModalFav}
      />
      <ToastContainer />
      <FormSearch />
      <FetchCharacters
        isModalFav={isModalFav}
        setIsModalFav={setIsModalFav}
        personajes={personajes}
        setPersonajes={setPersonajes}
      />
      <FavPersonajeModal
        personajes={personajes}
        setPersonajes={setPersonajes}
        isModalFav={isModalFav}
        setIsModalFav={setIsModalFav}
      />
      {/* <ProductList />
      <Cart
        isModalOpenCart={isModalOpenCart}
        setIsModalOpenCart={setIsModalOpenCart}
        cart={cart}
        setCart={setCart}
      /> */}
      {/* {!isAuthenticated ? (
          <p>isAuthenticated : false</p>
        ) : (
          <p> isAuthenticated : true </p>
        )} */}
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
