import { useContext,useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import { useItem } from "../context/ItemContext";

const ItemDetail = () => {
  const { getItem, heroesfav, setHeroesfav } = useItem();
  const { id } = useParams(); // Extrae el id de la URL
  console.log("id", id);
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Reemplaza esta URL con la de tu API que devuelve un objeto por ID
        const response = await fetch(`https://nodofullstack-m3-0w08.onrender.com/api/heroes/id/${id}`);
        if (!response.ok) throw new Error("No se pudo obtener los datos.");
        const data = await response.json();
        setHeroesfav(data);
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

  return (
    <>
      <div>ItemDetail</div>
      <button onClick={() => getItem()}> BOTONAPI</button>
      <div>
        {heroesfav.map((item) => (
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
      </div>
    </>
  );
};

export default ItemDetail;
