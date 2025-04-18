import { toast } from "react-toastify";
import { useItem } from "../context/ItemContext";
import { useEffect } from "react";

export const PersonajesSearch = () => {
  const { resultadosbusqueda, error, loading } = useItem();

  useEffect(() => {
    console.log("resultadosbusqueda", resultadosbusqueda);
  }, []);
  return (
    <div className="mx-4 my-4 text-white">
      {/* {resultadosbusqueda.nombreReal} */}
      {error && <p className="my-4 p-4">{error.message || error.toString()}</p>}
      {loading && <p className="my-4 p-4">Cargando...</p>}
      {resultadosbusqueda.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-4 p-4">
          {resultadosbusqueda.map((nombre) => (
            <li className="border rounded px-4 py-4" key={nombre._id}>
              <h1>Nombre Super{nombre.nombreSuperHeroe}</h1>
              <h2>Nombre Real: {nombre.nombreReal}</h2>
              <h3>Edad: {nombre.edad}</h3>
              <h3>Planeta de Origen: {nombre.planetaOrigen}</h3>
              <h3>Debilidad: {nombre.debilidad}</h3>
              <h3>id: {nombre._id}</h3>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                onClick={() => toast.success("Agregado a favoritos")}
              >
                Agregar a favoritos
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
