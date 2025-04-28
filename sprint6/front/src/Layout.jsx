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
import Chat from "./components/Chat";

const Layout = () => {
  const productId = "681002829e356fe6176d3ed0"; // ID del producto
  const userId = "6810008f9e356fe6176d3ec6"; // ID del usuario autenticado
  const username = "nuevo_usuario"; // Nombre del usuario autenticado
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MTAwMDhmOWUzNTZmZTYxNzZkM2VjNiIsInJvbGUiOiI2ODBmZmRjMDQ3ZGIyNWRlOTdhMzQwYjciLCJpYXQiOjE3NDU4NzkyMDIsImV4cCI6MTc0NTk2NTYwMn0.jkW_Otq2_uQUENm5PVa-QXtqUd3eoDfHBCheEwUgCy4"; // Token JWT del usuario autenticado
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
      <h1>Chat del Producto</h1>
      <Chat
        productId={productId}
        userId={userId}
        username={username}
        token={token}
      />
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
      <FavSuperModal isModalFav={isModalFav} setIsModalFav={setIsModalFav} />
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
