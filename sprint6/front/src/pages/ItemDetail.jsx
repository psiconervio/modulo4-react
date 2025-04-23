import { useParams, useNavigate } from "react-router-dom";
import { useItem } from "../context/ItemContext";
import { useEffect, useState } from "react";

const ItemDetail = () => {
  const { id } = useParams(); // Extraemos el id de la URL
  const { items } = useItem(); // Obtenemos los ítems del contexto
  const navigate = useNavigate();
  const [item, setItem] = useState(null);

  useEffect(() => {
    if (items) {
      // Busca el ítem asegurándote de que las propiedades coincidan
      const foundItem = items.find((item) => item.id === id); // Compara como cadena
      setItem(foundItem);
    }
  }, [items, id]);

  console.log("ID:", id, "Items:", items, "Item encontrado:", item);

  // Si los datos aún no están disponibles
  if (!items) {
    return <p>Cargando datos...</p>;
  }

  // Si no se encuentra el ítem
  if (!item) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Ítem no encontrado
        </h1>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
        >
          Volver a la lista
        </button>
      </div>
    );
  }

  // Mostramos los detalles del ítem
  return (
    <div className="container mx-auto p-4 ">
      <h1 className="text-2xl font-bold mb-4">Detalles del Héroe</h1>
      <div className="border border-gray-300 rounded-lg shadow-md p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Nombre Superheroe: {item.Nombre}
        </h2>
        <p className="mb-4 rounded border px-2 py-2">
          Nombre Real: {item.NombreReal}
        </p>
        <p className="mb-4 rounded border px-2 py-2">Edad: {item.Edad}</p>
        <p className="mb-4 rounded border px-2 py-2">ID: {item.id}</p>
        <p className="mb-4 rounded border px-2 py-2">
          Planeta de Origen: {item.PlanetaOrigen}
        </p>
        <p className="mb-4 rounded border px-2 py-2">
          Debilidad: {item.Debilidad}
        </p>
        <p className="mb-4 rounded border px-2 py-2">Poderes: {item.Poderes}</p>
        <p className="mb-4 rounded border px-2 py-2">
          {" "}
          Enemigos{item.enemigos}
        </p>
        <button
          onClick={() => navigate(`/items/${item.id}/edit`)}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200 mr-2"
        >
          Editar
        </button>
        <button
          onClick={() => navigate(-1)} // Navega a la página anterior
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
        >
          Volver a la lista
        </button>
      </div>
    </div>
  );
};

export default ItemDetail;
