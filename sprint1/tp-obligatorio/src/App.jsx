// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import EjemploMotion from './components/EjemploMotion'



function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    <Navbar />
    <EjemploMotion  />
    <Header />
    <Main />
    <Footer />
    </>
  )
}

export default App
