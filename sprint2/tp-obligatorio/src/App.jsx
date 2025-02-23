// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import EjemploMotion from './components/EjemploMotion'
import MovieCard from './components/MovieCard'



function App() {
  const [watchlist, setWatchlist] = useState([]);

// Para agregar una película:
const addToWatchlist = (movie) => {
setWatchlist([...watchlist, movie]);
localStorage.setItem("watchlist", JSON.stringify([...watchlist, movie]));
};

// Para eliminar una película:
const removeFromWatchlist = (id) => {
const updatedList = watchlist.filter(movie => movie.id !== id);
setWatchlist(updatedList);
localStorage.setItem("watchlist", JSON.stringify(updatedList));
};

// Para cargar los datos desde Local Storage cuando la página se recarga:
useEffect(() => {
const savedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [
setWatchlist(savedWatchlist)];
}, []);

  return (
    <>
    <Navbar />
    <Header />
    <MovieCard movie={movie} onAdd={addToWatchlist}/>
    <EjemploMotion  />
    <Main />
    <Footer />
    </>
  )
}

export default App
