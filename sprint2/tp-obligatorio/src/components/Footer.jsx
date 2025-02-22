import { useState } from "react";

const Footer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }

  return (
    <footer className={`bg-opacity-30 backdrop-blur-md py-4 ${isOpen ? "bg-gray-900" : "bg-gray-700"}`}>
      <div className="container mx-auto text-center">
        <p>Hecho con React por Augusto Del Campo &copy;</p>
        <nav>
          <ul className="flex justify-center space-x-4">
            <li><a href="#privacy" className="hover:underline">Privacidad</a></li>
            <li><a href="#terms" className="hover:underline">Términos</a></li>
            <li><a href="#contact" className="hover:underline">Contacto</a></li>
            <button onClick={toggleMenu}>
    boton
            </button>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;