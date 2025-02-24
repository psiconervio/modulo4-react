// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";


function App() {


  return (
    <>
      <Navbar />
      <Header />
      {/* <EjemploMotion  /> */}
      <Main />
      <Footer />
    </>
  );
}

export default App;
