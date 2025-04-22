import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ItemEdit = () => {
  const { id } = useParams(); // Extrae el id de la URL
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState(null); // Estado para manejar errores
  const [formData, setFormData] = useState({
    nombreSuperHeroe: "",
    nombreReal: "",
    edad: "",
    planetaOrigen: "",
    debilidad: "",
    poderes: "",
    aliados: "",
    enemigos: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://nodofullstack-m3-0w08.onrender.com/api/heroes/id/${id}`
        );
        if (!response.ok) throw new Error("No se pudo obtener los datos.");
        const data = await response.json();

        // Si la API devuelve un objeto, actualiza el formulario con sus valores
        setFormData({
          nombreSuperHeroe: data.nombreSuperHeroe || "",
          nombreReal: data.nombreReal || "",
          edad: data.edad || "",
          planetaOrigen: data.planetaOrigen || "",
          debilidad: data.debilidad || "",
          poderes: data.poderes || "",
          aliados: data.aliados || "",
          enemigos: data.enemigos || "",
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica que el ID sea válido
    if (!id) {
      alert("ID no válido. No se puede actualizar el héroe.");
      return;
    }

    try {
      // console.log("ID:", id); // Depuración del ID
      const response = await fetch(
        `https://nodofullstack-m3-0w08.onrender.com/api/heroes/idput/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      // console.log("Response status:", response.status);

      if (response.ok) {
        alert("Héroe actualizado con éxito.");
        navigate(`/detalle/${id}`);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "No se pudo actualizar el héroe.");
      }
    } catch (err) {
      // console.error("Error en la solicitud:", err.message);
      alert(err.message);
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="mx-10 mt-5">
      <h1 className="text-center mb-5">Editar Héroe</h1>
      <form
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        onSubmit={handleSubmit}
      >
        <label className="flex flex-col">
          Nombre del Superhéroe:
          <input
            type="text"
            name="nombreSuperHeroe"
            value={formData.nombreSuperHeroe}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2"
          />
        </label>
        <label className="flex flex-col">
          Nombre Real:
          <input
            type="text"
            name="nombreReal"
            value={formData.nombreReal}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2"
          />
        </label>
        <label className="flex flex-col">
          Edad:
          <input
            type="number"
            name="edad"
            value={formData.edad}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2"
          />
        </label>
        <label className="flex flex-col">
          Planeta de Origen:
          <input
            type="text"
            name="planetaOrigen"
            value={formData.planetaOrigen}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2"
          />
        </label>
        <label className="flex flex-col">
          Debilidad:
          <input
            type="text"
            name="debilidad"
            value={formData.debilidad}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2"
          />
        </label>
        <label className="flex flex-col">
          Poderes:
          <input
            type="text"
            name="poderes"
            value={formData.poderes}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2"
          />
        </label>
        <label className="flex flex-col">
          Aliados:
          <input
            type="text"
            name="aliados"
            value={formData.aliados}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2"
          />
        </label>
        <label className="flex flex-col">
          Enemigos:
          <input
            type="text"
            name="enemigos"
            value={formData.enemigos}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2"
          />
        </label>
        <div className="mt-10 flex justify-center items-center">
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded mx-4 hover:bg-blue-600"
          >
            Guardar Cambios
          </button>
          <button className="bg-blue-400 rounded p-2 hover:bg-blue-300" onClick={() => navigate(-1)}>Volver</button>
        </div>
      </form>
    </div>
  );
};

export default ItemEdit;
