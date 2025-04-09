import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { useEffect, useContext ,useState } from "react";
// import { FetchCharacters } from "./components/FetchCharacters";
import { FavPersonajeModal } from "./components/FavPersonajeModal";
import { ToastContainer } from "react-toastify";
import { PersonajeProvider } from "./context/CharacterContext";
import { PersonajesSearch } from "./components/PersonajesSearch";
import SearchForm from "./components/SearchForm";
import AppRouter from "./router/AppRouter";

function App() {

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
      <PersonajeProvider>
        <Navbar />
        <AppRouter />
        <Header
          isModalFav={isModalFav}
          setIsModalFav={setIsModalFav}
        />
        <SearchForm />
        <PersonajesSearch
          isModalFav={isModalFav}
          setIsModalFav={setIsModalFav}
          personajes={personajes}
          setPersonajes={setPersonajes}
        />
        <ToastContainer />
        <FavPersonajeModal
          personajes={personajes}
          setPersonajes={setPersonajes}
          isModalFav={isModalFav}
          setIsModalFav={setIsModalFav}
        />
        <Main />
        <Footer />
      </PersonajeProvider>
    </>
  );
}

export default App;
