
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p>&copy; 2023 Mi Aplicación. Todos los derechos reservados.</p>
        <nav>
          <ul className="flex justify-center space-x-4">
            <li><a href="#privacy" className="hover:underline">Privacidad</a></li>
            <li><a href="#terms" className="hover:underline">Términos</a></li>
            <li><a href="#contact" className="hover:underline">Contacto</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;