import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { PRODUCT_CATEGORIES } from "../data/mockData";
import { FaUpload, FaTrash, FaExclamationCircle } from "react-icons/fa";
import { createProduct } from "../data/apis";
import { useTheme } from "../context/ThemeContext";
import { toast } from "react-toastify";

const CreateListingPage = () => {
  const { theme } = useTheme();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState([]);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Nombre es requerido";
    if (!description.trim()) newErrors.description = "Descripcion es requerido";
    if (!price || isNaN(price) || price <= 0)
      newErrors.price = "Precio es requerido";
    if (!category) newErrors.category = "Categoria es requerido";
    if (!image) newErrors.image = "imagen es requerido";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // ⬅️ Detener si hay errores

    const productData = {
      name,
      description,
      price: parseFloat(price),
      image,
      category,
    };

    try {
      const response = await createProduct(productData);
      console.log("El producto fue creado:", response.data);
      toast.success("producto creado");
      navigate("/");
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error('Error al crear el producto')
      setErrors({ submit: "Failed to create product. Please try again." });
    }
  };

  return (
    <div
      className={`rounded-lg shadow-md p-6 ${
        theme === "dark" ? "bg-slate-800" : "bg-slate-300"
      }`}
    >
      <h1 className="text-2xl font-bold mb-6">Crear Nueva Publicacion</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className={`block font-medium mb-2 ${
              theme === "dark" ? "text-white" : "text-gray-700"
            }`}
          >
            Nombre Producto*
          </label>
          <input
            type="text"
            id="title"
            className={`input-field text-black ${
              errors.name ? "border-red-500" : ""
            }`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="¿Que estas vendiendo?"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <FaExclamationCircle className="mr-1" /> {errors.name}
            </p>
          )}
        </div>

        {/* Price */}
        <div className="mb-4">
          <label
            htmlFor="price"
            className={`block font-medium mb-2 ${
              theme === "dark" ? "text-white" : "text-gray-700"
            }`}
          >
            Precio* ($)
          </label>
          <input
            type="number"
            id="price"
            min="0"
            step="0.01"
            className={`input-field text-black${
              errors.price ? "border-red-500" : ""
            }`}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0.00"
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <FaExclamationCircle className="mr-1" /> {errors.price}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="title"
            className={`block font-medium mb-2 ${
              theme === "dark" ? "text-white" : "text-gray-700"
            }`}
          >
            Imagen Producto*
          </label>
          <input
            type="text"
            id="title"
            className={`input-field text-black ${
              errors.image ? "border-red-500" : ""
            }`}
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Ingresar URL imagen"
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <FaExclamationCircle className="mr-1" /> {errors.image}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="title"
            className={`block font-medium mb-2 ${
              theme === "dark" ? "text-white" : "text-gray-700"
            }`}
          >
            Categoria
          </label>
          <input
            type="text"
            id="title"
            className={`input-field text-black ${
              errors.category ? "border-red-500" : ""
            }`}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Ingresar una categoria"
          />
          {errors.category && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <FaExclamationCircle className="mr-1" /> {errors.category}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block font-medium mb-2">
            Description*
          </label>
          <textarea
            id="description"
            rows="4"
            className={`input-field text-black ${
              errors.description ? "border-red-500" : ""
            }`}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your item in detail"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <FaExclamationCircle className="mr-1" /> {errors.description}
            </p>
          )}
        </div>
        <div className="mt-6">
          <button type="submit" className="btn-primary w-full">
            Publicar Producto
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateListingPage;
