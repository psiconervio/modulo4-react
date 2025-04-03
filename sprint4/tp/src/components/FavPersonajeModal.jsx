/* eslint-disable react/prop-types */
// FavPersonajeModal.jsx
import { useEffect } from "react";
import { toast } from "react-toastify";

export const FavPersonajeModal = ({
  setPersonajes,
  personajes,
  isModalFav,
  setIsModalFav,
}) => {
  useEffect(() => {
    if (isModalFav) {
      const savedFavorites = JSON.parse(localStorage.getItem("personajes")) || [];
      setPersonajes(savedFavorites);
    }
  }, [isModalFav, setPersonajes]);

  if (!isModalFav) return null;

  const onClose = () => setIsModalFav(false);

  const removerFromFav = (id) => {
    const updatedPersonajes = personajes.filter(
      (personaje) => personaje.id !== id
    );
    setPersonajes(updatedPersonajes);
    localStorage.setItem("personajes", JSON.stringify(updatedPersonajes));
    toast.success("Personaje removido de favoritos");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
      <div className="bg-white p-6 w-11/12 max-w-md relative rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Personajes Favoritos</h2>
        {personajes.length === 0 ? (
          <p>No hay personajes en la lista de favoritos</p>
        ) : (
          <div className="space-y-4">
            {personajes.map((personaje) => (
              <div
                key={personaje.id}
                className="flex items-center space-x-4 border p-2 rounded"
              >
                {personaje.image && (
                  <img
                    src={personaje.image}
                    alt={personaje.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
                <div className="flex-1">
                  <p className="font-semibold">{personaje.name}</p>
                </div>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => removerFromFav(personaje.id)}
                >
                  Remover
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-end mt-6">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};



// // FavPersonajeModal.jsx
// import { toast } from "react-toastify";
// export const FavPersonajeModal = ({
//   setPersonajes,
//   personajes,
//   isModalFav,
//   setIsModalFav,
// }) => {
//   // TODO: Implementar componente modal para mostrar personajes favoritos
//   if (!isModalFav) return null;
//   //funcion para cerrar el modal
//   const onClose = () => setIsModalFav(false); // cerrar modal

//   const removerFromFav = (id) => {
//     const updatedPersonajes = personajes.filter((personaje) => personaje.id !== id);
//     setPersonajes(updatedPersonajes);
//     localStorage.setItem("personajes", JSON.stringify(updatedPersonajes));
//     toast.success("Personaje removido de favoritos");
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black/70">
//       <div className="bg-white p-6 w-11/12 max-w-md relative rounded-lg shadow-lg">
//         <h2 className="text-2xl font-bold">Personajes Favoritos</h2>
//         <p>FavPersonajeModal</p>
//         {personajes.length === 0 ? (
//           <p>No hay personajes en la lista de favoritos</p>
//         ) : (
//           personajes.map((personaje) => (
//             <div className="my-2" key={personaje.id}>
//               <p>{personaje.name}</p>
//               <button
//                 className="bg-red-500 text-white px-4 py-2"
//                 onClick={() => removerFromFav(personaje.id)}
//               >
//                 remover
//               </button>
//             </div>
//           ))
//         )}
//         <div className="flex justify-end mt-10">
//           <button
//             className="bg-gray-500 text-white px-4 py-2"
//             onClick={onClose}
//           >
//             CERRAR
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
