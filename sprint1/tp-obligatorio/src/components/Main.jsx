import  { useState } from 'react';
import { motion } from 'framer-motion';

const Main = () => {
  // Estado para manejar la visibilidad de la lista
  const [showList, setShowList] = useState(true);
  // Estado para manejar el contador de "me gusta"
  const [likes, setLikes] = useState(0);

  // Lista de secciones
  const sections = [
    { id: 1, title: 'Sección 1', content: 'Contenido de la sección 1.' },
    { id: 2, title: 'Sección 2', content: 'Contenido de la sección 2.' },
    { id: 3, title: 'Sección 3', content: 'Contenido de la sección 3.' },
  ];

  // Función para alternar la visibilidad de la lista
  const toggleList = () => {
    setShowList(!showList);
  };

  // Función para incrementar el contador de "me gusta"
  const incrementLikes = () => {
    setLikes(likes + 1);
  };

  return (
    <main className="bg-gray-100 p-8 text-black">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-4">Bienvenido a Mi Aplicación</h2>
        <p className="text-lg mb-4">
          Esta es una sección principal de la aplicación. Aquí puedes agregar el contenido que desees.
        </p>
        <button onClick={toggleList} className="bg-blue-500  px-4 py-2 rounded mb-4">
          {showList ? 'Ocultar Lista' : 'Mostrar Lista'}
        </button>
        <button onClick={incrementLikes} className="bg-green-500  px-4 py-2 rounded mb-4 ml-4">
          ¡Me Gusta! 👍 ({likes})
        </button>
        {showList && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {sections.map((section) => (
              <div key={section.id} className="bg-white p-4 rounded shadow">
                <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
                <p>{section.content}</p>
              </div>
            ))}
          </motion.div>
        )}
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