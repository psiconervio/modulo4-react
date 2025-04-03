import ProductList from "./ProductList";
// import Cart from "./Cart";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext"; 

const Main = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    // <main className="bg-gray-800 p-8 dark:text-white ligth:text-black">
    <main className={theme === "dark" ? "bg-gray-800 p-8 text-white" : "bg-gray-700 p-8 "}>
      {/* <Cart /> */}
      <div className="container mx-auto">
        <h2 className={theme=== "dark" ? "text-white text-3xl font-bold mb-4" : "text-white text-3xl font-bold mb-4"}>El señor de la noche</h2>
        <p className={theme === "dark" ? " text-white p-4" : "text-white  p-4"}>
          Batman es un hombre alto, caucásico, tiene una figura oscura e
          imponente, posee con cabello negro corto y ojos marrones. Él lleva un
          traje gris oscuro con el símbolo negro de un murciélago, en medio de
          el pecho. Batman también usa una capucha negra que lo cubre en todo
          momento para ocultar su identidad.
        </p>
      </div>
    </main>
  );
};

export default Main;

// const Main = () => {
//   return (
//     <main className="bg-gray-100 p-8">
//       <div className="container mx-auto">
//         <h2 className="text-3xl font-bold mb-4">Bienvenido a Mi Aplicación</h2>
//         <p className="text-lg mb-4">
//           Esta es una sección principal de la aplicación. Aquí puedes agregar el contenido que desees.
//         </p>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           <div className="bg-white p-4 rounded shadow">
//             <h3 className="text-xl font-semibold mb-2">Sección 1</h3>
//             <p>Contenido de la sección 1.</p>
//           </div>
//           <div className="bg-white p-4 rounded shadow">
//             <h3 className="text-xl font-semibold mb-2">Sección 2</h3>
//             <p>Contenido de la sección 2.</p>
//           </div>
//           <div className="bg-white p-4 rounded shadow">
//             <h3 className="text-xl font-semibold mb-2">Sección 3</h3>
//             <p>Contenido de la sección 3.</p>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default Main;
