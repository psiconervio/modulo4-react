import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { useItem } from "../context/ItemContext";

const ItemCard = ({
  id,
  nombreReal,
  nombreSuperHeroe,
  edad,
  planetaOrigen,
  PlanetadeOrigen,
}) => {
  const { setHeroesfav, heroesfav, items } = useItem(); // Asegúrate de que el contexto esté definido correctamente
  const navigate = useNavigate();

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("heroesfav")) || [];
    setHeroesfav(storedFavorites); // Mover esta actualización de estado dentro de useEffect
  }, []);

  const agregarFavoritos = (id) => {
    try {
      const item = items.find((item) => item.id === id);
      if (item && !heroesfav.some((hero) => hero.id === id)) {
        const nuevosFavoritos = [...heroesfav, item];
        setHeroesfav(nuevosFavoritos);
        localStorage.setItem("heroesfav", JSON.stringify(nuevosFavoritos)); // Guardar en localStorage
        console.log("Agregado a favoritos:", item);
        console.log("heroes:", nuevosFavoritos);
      } else {
        console.log("El héroe ya está en favoritos o no existe:", id);
      }
    } catch (error) {
      console.error("Error al agregar a favoritos:", error);
    }
  };

  const deleteData = async () => {
    try {
      const response = await axios.delete(
        `https://nodofullstack-m3-0w08.onrender.com/api/heroes/id/${id}`
      );

      if (response.status === 200) {
        alert("Item eliminado exitosamente.");
        Swal.fire({
          title: "Eliminado!",
          text: "You clicked the button!",
          icon: "success",
        });
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
    <div className=" text-white border border-gray-300 rounded shadow-md p-4 hover:shadow-lg transition duration-200">
      <h1 className="text-lg font-bold mb-2">
        SuperHeroe: {nombreSuperHeroe}
      </h1>
      <h2 className="text-sm mb-1">Nombre Real: {nombreReal}</h2>
      <h3 className="text-sm mb-1">Edad: {edad}</h3>
      <h3 className="text-sm mb-1">PlanetadeOrigen: {planetaOrigen},{PlanetadeOrigen}</h3>
      <div className="mt-6">
        <button
          onClick={() => navigate(`/items/${id}/edit`)}
          className="bg-blue-500/70 text-white m-1 p-1 rounded hover:bg-blue-600 transition duration-200"
        >
          Editar
        </button>
        <button
          className="bg-green-500/70 m-1 p-1 rounded"
          onClick={() => navigate(`/items/${id}`)}
        >
          Ver Detalles
        </button>
        <button
          className="bg-red-600/70 m-1 p-1 rounded"
          onClick={() => deleteData(id)}
        >
          borrar
        </button>
        <button
          className="bg-amber-600/70 m-1 p-1 rounded"
          onClick={() => agregarFavoritos(id)}
        >
          Agregar a Favoritos
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
