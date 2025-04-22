import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const ItemCard = ({ id, nombreReal, nombreSuperHeroe, edad, Edad }) => {
  const navigate = useNavigate();

  const deleteData = async () => {
    try {
      const response = await axios.delete(
        `https://nodofullstack-m3-0w08.onrender.com/api/heroes/id/${id}`
      );

      if (response.status === 200) {
        alert("Item eliminado exitosamente.");
        Swal.fire({
          title: "Good job!",
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

  // useEffect(() => {
  //   console.log(id, nombreReal, nombreSuperHeroe, edad, Edad, "desde el item card");
  // }, []);
  return (
    <div className=" text-white border border-gray-300 rounded-lg shadow-md p-4 hover:shadow-lg transition duration-200">
      <h1 className="text-1xlg font-bold  mb-2">
        Nombre Super heroe:{nombreSuperHeroe}
      </h1>
      <h2 className="text-sm mb-1">Nombre Real: {nombreReal}</h2>
      <h3 className="text-sm mb-1">Edad: {edad}</h3>
      <div className="mt-6">
        <button
          onClick={() => navigate(`/items/${id}/edit`)}
          className="bg-blue-500 text-white py-2 px-2 rounded hover:bg-blue-600 transition duration-200"
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
          className="bg-red-600 px-2 py-2 rounded"
          onClick={() => deleteData(id)}
        >
          borrar
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
