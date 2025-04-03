import { useContext, useState } from "react";

import { ThemeContext } from "../context/ThemeContext";
const Footer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <footer
      className={`bg-opacity-30  text-white py-4 ${
        isOpen ? "bg-gray-900" : "bg-gray-800"
      }`}
    >
      <div className="container mx-auto text-center">
        <p
          className={
            theme === "dark"
              ? "text-white p-4"
              : "text-white p-4"
          }
        >
          Hecho con React por Augusto Del Campo &copy;
        </p>
        <nav>
          <ul className="flex justify-center space-x-4">
            <li>
              <a href="#privacy" className="hover:underline ">
                Privacidad
              </a>
            </li>
            <li>
              <a href="#terms" className="hover:underline">
                Términos
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:underline">
                Contacto
              </a>
            </li>
            <button onClick={toggleMenu}>boton</button>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
