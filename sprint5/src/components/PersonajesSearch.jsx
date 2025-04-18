// PersonajesSearch.jsx
import { toast } from "react-toastify";
import { useItem } from "../context/ItemContext";
import { useEffect } from "react";

export const PersonajesSearch = () => {
  const { busqueda, resultadosbusqueda, error, loading } = useItem();

  useEffect(() => {
    console.log("busqueda", resultadosbusqueda);
  }, [resultadosbusqueda]);

  // Convierte a array si no lo es
  // const resultadosArray = Array.isArray(resultadosbusqueda)
  //   ? resultadosbusqueda
  //   : [resultadosbusqueda];

  return (
    <div className="mx-4 my-4 text-white">
      {resultadosbusqueda.nombreReal}
      {/* {error && <p>{error.message || error.toString()}</p>}
      {loading && <p>Cargando...</p>}
      {resultadosArray.length > 0 ? (
        <ul>
          {resultadosArray.map((nombre) => (
            <li key={nombre._id}>{nombre.nombreSuperHeroe}</li>
          ))}
        </ul>
      ) : (
        <p>No se encontraron resultados.</p>
      )} */}
    </div>
  );
};
