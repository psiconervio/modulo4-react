import { useState, useContext } from "react"; // Importa el hook useState para manejar el estado del menú
import { ThemeContext } from "../context/ThemeContext";
import { Link } from "react-router"; // Importa el componente Link para la navegación entre rutas
import ItemCreate from "../pages/ItemCreate";
import ItemList from "../pages/ItemList"; // Importa el componente ItemList para la navegación entre rutas
import avatarbatman from "../assets/avatarbatman.svg"; // Importa una imagen desde la carpeta assets

const NavBar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  // Estado para controlar si el menú está abierto o cerrado (para la vista móvil)
  const [isOpen, setIsOpen] = useState(false);
  // console.log("isOpen -> ", isOpen); // Muestra en consola el estado actual de isOpen

  // Función para alternar entre abrir y cerrar el menú
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Lista de enlaces de navegación
  const navbarLinks = [
    { id: 1, title: "create", link: "/items/create", element: <ItemCreate /> },
    { id: 2, title: "items", link: "/", element: <ItemList /> },
    { id: 3, title: "Contacto", link: "/", element: <ItemCreate /> },
    { id: 4, title: "Soporte", link: "/", element: <ItemCreate /> },
  ];

  // Lista de enlaces a redes sociales con iconos de Bootstrap Icons
  const navbarRedes = [
    {
      id: 1,
      title: "Instagram",
      link: "https://www.instagram.com",
      icon: "bi bi-instagram",
    },
    {
      id: 2,
      title: "GitHub",
      link: "https://www.github.com",
      icon: "bi bi-github",
    },
  ];

  return (
    <nav
      className={`w-full backdrop-blur-md z-50 transition-all duration-300 ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-700"
      } bg-opacity-30 `}
    >
      {/* Vista para escritorio */}
      <div className="flex justify-between items-center sm:px-12 sm:py-6 px-4 py-3">
        <div className="flex items-center gap-2">
          <img src={avatarbatman} alt="Logo" className="w-[60px]" />
          <p className="text-white font-bold text-2xl ml-4">Super-Base</p>
        </div>

        {/* Botón del menú hamburguesa para móviles */}
        <button
          className="md:hidden text-white p-2 cursor-pointer"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? ( // Si el menú está abierto, muestra una "X"
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              // Si el menú está cerrado, muestra el icono de hamburguesa
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Enlaces de navegación (versión escritorio) */}
        <div className="hidden md:block">
          <ul className="flex space-x-4 px-4">
            {navbarLinks.map((link) => (
              <li key={link.id}>
                <Link
                  element={link.element}
                  to={link.link}
                  className="text-sm text-white hover:text-yellow-500 transition-transform duration-300 transform hover:scale-110 inline-block"
                >
                  {link.title}
                </Link>
              </li>
            ))}

          </ul>
        </div>

        {/* Enlaces a redes sociales (versión escritorio) */}
        <div className="hidden md:block">
          <ul className="flex space-x-4">
            {navbarRedes.map((link) => (
              <li key={link.id}>
                <a
                  href={link.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block transition-transform duration-300 transform hover:scale-125"
                >
                  <i
                    className={`${link.icon} sm:text-2xl text-lg text-white transition-all duration-300 hover:text-yellow-500`}
                  ></i>
                </a>
              </li>
            ))}
            <button
              className={
                theme === "dark" ? "bg-gray-900 text-white" : " text-white"
              }
              onClick={toggleTheme}
            >
              {theme === "light" ? (
                <i className="bi bi-toggle-off"></i>
              ) : (
                <i className="bi bi-toggle-on"></i>
              )}
            </button>
          </ul>
        </div>
      </div>

      {/* Vista para móviles */}
      <div
        className={`md:hidden absolute w-full bg-gray-800 bg-opacity-30 transition-all duration-300 
        ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
      >
        {/* Enlaces de navegación (versión móvil) */}
        <ul className="flex flex-col px-4 py-2">
          {navbarLinks.map((link) => (
            <li key={link.id} className="py-2 text-center">
              <a
                href={link.link}
                className="text-white hover:text-yellow-500 block"
                onClick={() => setIsOpen(false)}
              >
                {link.title}
              </a>
            </li>
          ))}
        </ul>

        {/* Enlaces a redes sociales (versión móvil) */}
        <ul className="flex space-x-4 px-4 py-2 border-t border-yellow-700 justify-center">
          {navbarRedes.map((link) => (
            <li key={link.id}>
              <a
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
                onClick={() => setIsOpen(false)}
              >
                <i
                  className={`${link.icon} text-lg text-white hover:text-yellow-500`}
                ></i>
              </a>
            </li>
          ))}
        </ul>
        <div className="h-14  flex justify-center">
          <button
            className={theme === "dark" ? " text-white" : " text-black"}
            onClick={toggleTheme}
          >
            {theme === "dark" ? (
              <i className="h-20 bi bi-toggle-off"></i>
            ) : (
              <i className="bi bi-toggle-on"></i>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

// import  { useState } from 'react'
// import batman from "../assets/batman.png";

// const NavBar = () => {

//   const [isOpen, setIsOpen] = useState(false)
//   console.log('isOpen -> ', isOpen)

//   const toggleMenu = () => {
//     setIsOpen(!isOpen)
//   }

//   const navbarLinks = [
//     {
//       id: 1,
//       title: "Inicio",
//       link: "/",
//     },
//     {
//       id: 2,
//       title: "Nosotros",
//       link: "/",
//     },
//     {
//       id: 3,
//       title: "Contacto",
//       link: "/",
//     },
//     {
//       id: 4,
//       title: "Soporte",
//       link: "/",
//     }
//   ]

//   const navbarRedes = [
//     {
//       id: 1,
//       title: "Instagram",
//       link: "https://www.instagram.com",
//       icon: "bi bi-instagram",
//     },
//     {
//       id: 2,
//       title: "GitHub",
//       link: "https://www.github.com",
//       icon: "bi bi-github",
//     },
//   ];

//   return (
//     <nav className='w-full bg-gray-900 bg-opacity-30 backdrop-blur-md z-50 transition-all duration-300'>
//       {/* VIEW DESKTOP  */}
//       <div className='flex justify-between items-center sm:px-12 sm:py-6 px-4 py-3'>
//         {/* LOGO  */}
//         <div className='flex items-center gap-2'>
//           <img src={batman}
//             alt='Logo'
//             className='w-[60px]'
//           />
//           <p className='text-white font-bold font-size-3xl'>Batman</p>
//         </div>

//         {/* BURGER BTN  */}
//         <button
//           className='md:hidden text-white p-2 cursor-pointer'
//           onClick={toggleMenu}
//         >
//           <svg
//             className='w-6 h-6'
//             fill='none'
//             stroke='currentColor'
//             viewBox='0 0 24 24' // cajita
//           >
//             {
//               isOpen ? (
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M6 18L18 6M6 6l12 12" // X
//                 />
//               ) : (
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M4 6h16M4 12h16M4 18h16" // Burger
//                 />
//               )
//             }

//           </svg>
//         </button>

//         {/* NAVIGATION LINKS DESKTOP */}
//         <div className='hidden md:block' >
//           <ul className='flex space-x-4 px-4'>
//             {navbarLinks.map((link) => (
//               <li key={link.id}>
//                 <a href='/' className='text-sm text-white hover:text-yellow-500 transition-transform duration-300 transform hover:scale-110 inline-block'>
//                   {link.title}
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* NAVIGATION SOCIAL  DESKTOP */}
//         <div className="hidden md:block">
//           <ul className="flex space-x-4">
//             {navbarRedes.map((link) => (
//               <li key={link.id}>
//                 <a
//                   href={link.link}
//                   target="_blank"
//                   rel="noopener noreferrer" // para no trackear desde que pagina venimos
//                   className="inline-block transition-transform duration-300 transform hover:scale-125"
//                 >
//                   <i
//                     className={`${link.icon} sm:text-2xl text-lg text-white transition-all duration-300 hover:text-yellow-500`}
//                   ></i>
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </div>

//       </div>

//       {/* VIEW MOBILE  */}
//       <div
//         className={`md:hidden absolute w-full bg-gray-800 bg-opacity-30 transition-all duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
//           }`}
//       >
//         {/* VIEW MOBILE LINKS */}
//         <ul className="flex flex-col px-4 py-2">
//           {navbarLinks.map((link) => (
//             <li key={link.id} className="py-2 text-center">
//               <a
//                 href={link.link}
//                 className="text-white hover:text-yellow-500 block"
//                 onClick={() => setIsOpen(false)}
//               >
//                 {link.title}
//               </a>
//             </li>
//           ))}
//         </ul>

//         {/* VIEW MOBILE SOCIAL  */}
//         <ul className="flex space-x-4 px-4 py-2 border-t border-yellow-700 justify-center">
//           {navbarRedes.map((link) => (
//             <li key={link.id}>
//               <a
//                 href={link.link}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-block"
//                 onClick={() => setIsOpen(false)}
//               >
//                 <i
//                   className={`${link.icon} text-lg text-white hover:text-yellow-500`}
//                 ></i>
//               </a>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </nav>
//   )
// }

// export default NavBar
