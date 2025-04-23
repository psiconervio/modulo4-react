// src/layouts/MainLayout.jsx
import "./App.css";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Main from "./components/Main";
import SearchForm from "./components/SearchForm";
import { PersonajesSearch } from "./components/PersonajesSearch";
import { ToastContainer } from "react-toastify";
import { FavPersonajeModal } from "./components/FavPersonajeModal";
import FavSuperModal from "./components/FavSuperModal";

const Layout = () => {
  const [isModalFav, setIsModalFav] = useState(false);
  const [personajes, setPersonajes] = useState([]);

  useEffect(() => {
    const storedPersonajes = localStorage.getItem("personajes");
    if (storedPersonajes) {
      setPersonajes(JSON.parse(storedPersonajes));
    }
  }, []);
  return (
    <>
      <Navbar />
      <Header isModalFav={isModalFav} setIsModalFav={setIsModalFav} />
      <ToastContainer />
      <SearchForm />
      <PersonajesSearch
        isModalFav={isModalFav}
        setIsModalFav={setIsModalFav}
        personajes={personajes}
        setPersonajes={setPersonajes}
      />
      {/* Aquí se renderizará el contenido de la ruta específica */}
      <main>
        <Outlet />
      </main>
      <FavSuperModal
      isModalFav={isModalFav}
      setIsModalFav={setIsModalFav}
      />
      {/* <FavPersonajeModal
        personajes={personajes}
        setPersonajes={setPersonajes}
        isModalFav={isModalFav}
        setIsModalFav={setIsModalFav}
      /> */}
      <Main />
      <Footer />
    </>
  );
};

export default Layout;
