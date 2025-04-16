import { useContext, useEffect, useState } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { useItem } from "../context/ItemContext";

const ItemDetail = () => {
  const { heroesfav, items, setHeroesfav } = useItem();
  const { id } = useParams(); // Extrae el id de la URL
  console.log("id", id);
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState(null); // Estado para manejar errores
  const [itemdetalle, setItemdetalle] = useState([]); // Estado para manejar los detalles del item
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://nodofullstack-m3-0w08.onrender.com/api/heroes/id/${id}`
        );
        if (!response.ok) throw new Error("No se pudo obtener los datos.");
        const data = await response.json();

        // Si la API devuelve un objeto, conviértelo en un array
        setItemdetalle(Array.isArray(data) ? data : [data]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  console.log("heroesfav", heroesfav);
  console.log("itemsdetalle", itemdetalle);

  return (
    <>
      <div className="mx-10 mt-5 w-50">
      <h1>Detalle del héroe</h1>
        {itemdetalle.map((item) => (
          <div key={item.id}>
            <h1>{item.nombreSuperHeroe}</h1>
            <h2>{item.nombreReal}</h2>
            <h3>{item.edad}</h3>
            <h4>{item.planetaOrigen}</h4>
            <h5>{item.debilidad}</h5>
            <h6>{item.poderes}</h6>
            <p>{item.aliados}</p>
            <p>{item.enemigos}</p>
          </div>
        ))}
        <button onClick={()=>navigate(`edit`)}>editar</button>
      </div>
    </>
  );
};

export default ItemDetail;
