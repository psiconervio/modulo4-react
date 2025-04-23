import { toast } from "react-toastify";
import { useItem } from "../context/ItemContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

export const PersonajesSearch = () => {
  const { resultadosbusqueda, error, loading } = useItem();
  const { id } = useParams(); // Extrae el id de la URL
  const navigate = useNavigate();

  // Si no hay resultados y no se ha realizado una búsqueda, no mostrar nada
  if (!resultadosbusqueda || resultadosbusqueda.length === 0) {
    return null;
  }
  //reestructuracion para eliminar por id
  const idToExtract =
    resultadosbusqueda.length > 0 ? resultadosbusqueda[0]._id : null;
  console.log("Extracted ID:", idToExtract);
  const deleteData = async () => {
    try {
      const response = await axios.delete(
        `https://nodofullstack-m3-0w08.onrender.com/api/heroes/id/${idToExtract}`
      );

      if (response.status === 200) {
        alert("Item eliminado exitosamente.");
        navigate("/"); // Redirige a la lista de items después de eliminar
      } else {
        alert("Error al eliminar el item.");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
      alert("Ocurrió un error al intentar eliminar el item.");
    }
  };

  return (
    <div className="mx-4 my-4 text-white">
      {error && <p className="my-4 p-4">{error.message || error.toString()}</p>}
      {loading && <p className="my-4 p-4">Cargando...</p>}
      {resultadosbusqueda.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-4 p-4">
          {resultadosbusqueda.map((nombre) => (
            <li className="border rounded px-4 py-4" key={nombre._id}>
              <h1>Nombre Super: {nombre.nombreSuperHeroe}</h1>
              <h2>Nombre Real: {nombre.nombreReal}</h2>
              <h3>Edad: {nombre.edad}</h3>
              <h3>Planeta de Origen: {nombre.planetaOrigen}</h3>
              <h3>Debilidad: {nombre.debilidad}</h3>
              <h3>id: {nombre._id}</h3>
              {/* <button
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                onClick={() => toast.success("Agregado a favoritos")}
              >
                Agregar a favoritos
              </button> */}
              <button
                onClick={() => navigate(`/items/${id}/edit`)}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
              >
                Editar
              </button>
              <button
                className="bg-green-500 mx-2 p-2 rounded"
                onClick={() => navigate(`/items/${id}`)}
              >
                Ver Detalles
              </button>
              <button
                className="bg-red-600 px-4 py-2 rounded"
                onClick={() => deleteData(idToExtract)}
              >
                borrar
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No se encontraron resultados.</p>
      )}
    </div>
  );
};
