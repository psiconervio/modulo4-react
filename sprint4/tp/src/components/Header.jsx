import React, { useContext } from "react";
import { ThemeProvider } from "../context/ThemeContext";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
const Header = ({ setIsModalOpen, setIsModalOpenCart }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  // extraer los valores de el contexto
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated);
  //Funcion para manejar  setIsModalOpen y pasarle al boton
  const onOpenModal = () => {
    setIsModalOpen(true);
  };
  //Funcion para manejar  setIsModalOpenCart y pasarle al boton
  const onOpenModalCart = () => {
    setIsModalOpenCart(true);
  };

  return (
    // <header className="bg-blue-900/40 text-white p-4">
    <header
      className={
        theme === "dark"
          ? "bg-gray-800 text-white p-4"
          : "bg-gray-600 text-white p-4"
      }
    >
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold ">Api rick y morty</h1>
        {/* <button
          className="bg-green-500 text-white px-4 py-2"
          onClick={onOpenModal}
        >
          ver watchlist
        </button> */}
        <div>
          <button
            className="mx-5 bg-green-500 text-white px-4 py-2"
            onClick={onOpenModalCart}
          >
            <i className="bi bi-bag"></i>
          </button>
          {/* <button
            className={
              theme === "dark"
                ? "bg-gray-900 text-white"
                : "bg-white text-black"
            }
            onClick={toggleTheme}
          >
            {theme === "light" ? (
              <i className="bi bi-toggle-off"></i>
            ) : (
              <i className="bi bi-toggle-on"></i>
            )}
          </button> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
