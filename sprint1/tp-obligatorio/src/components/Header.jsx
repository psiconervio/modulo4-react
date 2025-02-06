import  { useState } from 'react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Mi Aplicación</h1>
        <button 
          className="md:hidden text-white focus:outline-none" 
          onClick={toggleMenu}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
          </svg>
        </button>
        <nav className={`md:flex md:items-center ${isOpen ? 'block' : 'hidden'}`}>
          <ul className="md:flex md:space-x-4">
            <li><a href="#home" className="block py-2 px-4 hover:bg-blue-700">Inicio</a></li>
            <li><a href="#about" className="block py-2 px-4 hover:bg-blue-700">Acerca de</a></li>
            <li><a href="#contact" className="block py-2 px-4 hover:bg-blue-700">Contacto</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;