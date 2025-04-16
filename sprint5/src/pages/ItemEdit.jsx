import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useItem } from "../context/ItemContext";

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
    try {
      const response = await fetch(
        `https://nodofullstack-m3-0w08.onrender.com/api/heroes/idput/${id}`,
        {
          method: "PUT", // Método HTTP para actualizar
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) throw new Error("No se pudo actualizar el héroe.");
      alert("Héroe actualizado con éxito.");
      navigate(`/detalle/${id}`); // Redirige al detalle del héroe
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="mx-10 mt-5 w-50">
      <h1>Editar Héroe</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre del Superhéroe:
          <input
            type="text"
            name="nombreSuperHeroe"
            value={formData.nombreSuperHeroe}
            onChange={handleChange}
          />
        </label>
        <label>
          Nombre Real:
          <input
            type="text"
            name="nombreReal"
            value={formData.nombreReal}
            onChange={handleChange}
          />
        </label>
        <label>
          Edad:
          <input
            type="number"
            name="edad"
            value={formData.edad}
            onChange={handleChange}
          />
        </label>
        <label>
          Planeta de Origen:
          <input
            type="text"
            name="planetaOrigen"
            value={formData.planetaOrigen}
            onChange={handleChange}
          />
        </label>
        <label>
          Debilidad:
          <input
            type="text"
            name="debilidad"
            value={formData.debilidad}
            onChange={handleChange}
          />
        </label>
        <label>
          Poderes:
          <input
            type="text"
            name="poderes"
            value={formData.poderes}
            onChange={handleChange}
          />
        </label>
        <label>
          Aliados:
          <input
            type="text"
            name="aliados"
            value={formData.aliados}
            onChange={handleChange}
          />
        </label>
        <label>
          Enemigos:
          <input
            type="text"
            name="enemigos"
            value={formData.enemigos}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default ItemEdit;