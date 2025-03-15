import React from "react";

import { AuthProvider, useAuth } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";

const Header = ({ setIsModalOpen, setIsModalOpenCart }) => {
  const onOpenModal = () => {
    // console.log('onOpenModal')
    setIsModalOpen(true);
  };
  //Funcion para manejar  setIsModalOpenCart y pasarle al boton
  const onOpenModalCart = () => {
    console.log("isModalOpenCart");
    setIsModalOpenCart(true);
  };
  // extraer los valores de el contexto
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated);

  return (
    <header className="bg-blue-900/40 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">¡Hola mundo!</h1>
        <button
          className="bg-green-500 text-white px-4 py-2"
          onClick={onOpenModal}
        >
          ver watchlist
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2"
          onClick={onOpenModalCart}
        >
          Carrito
        </button>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
