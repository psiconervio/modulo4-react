import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { PRODUCT_CATEGORIES } from "../data/mockData";
import { FaUpload, FaTrash, FaExclamationCircle } from "react-icons/fa";
import { createProduct, updateProduct } from "../data/apis";
import { useTheme } from "../context/ThemeContext";
import { useParams } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams(); // Extrae el id de los parámetros de la URL
  console.log(id);
  const { theme } = useTheme();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState([]);
  const [errors, setErrors] = useState({});
  const [category, setCategory] = useState('')

  const validateForm = () => {
    const newErrors = {}
    if (!price || isNaN(price) || price <= 0) newErrors.price = 'Valid price is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (validateForm()) {
    //   console.log()
    //   navigate('/')
    // }
    const productData = {
      name,
      description,
      price: parseFloat(price), // Asegúrate de que el precio sea un número
      image, // Aquí puedes enviar las imágenes como URLs o archivos, según tu backend
      category
      // userId: currentUser.id, // Incluye el ID del usuario actual si es necesario
    };
    console.log(productData);
    try {
      // Llamar a la función `createProduct` para enviar los datos al backend
      const response = await updateProduct(id, productData);
      console.log("Product created successfully:", response.data);
      // Redirigir al usuario después de crear el producto
      navigate("/");
    } catch (error) {
      console.error("Error creating product:", error);
      setErrors({ submit: "Failed to create product. Please try again." });
    }
  };
  return (
    <div
      className={`rounded-lg shadow-md p-6 ${
        theme === "dark" ? "bg-slate-800" : "bg-slate-300"
      }`}
    >
      <h1 className="text-2xl font-bold mb-6">Editar Publicacion</h1>
      <form onSubmit={handleSubmit}>
        {/* Title */}
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
            className={`input-field text-black  ${errors.title ? "border-red-500" : ""}`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="¿Que estas vendiendo?"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <FaExclamationCircle className="mr-1" /> {errors.title}
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
            className={`input-field  text-black${errors.price ? "border-red-500" : ""}`}
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
            className={`input-field text-black ${errors.title ? "border-red-500" : ""}`}
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Ingresar URL imagen"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <FaExclamationCircle className="mr-1" /> {errors.title}
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
            className={`input-field text-black ${errors.title ? "border-red-500" : ""}`}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Ingresar URL imagen"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <FaExclamationCircle className="mr-1" /> {errors.title}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block font-medium mb-2"
          >
            Descripcion*
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

export default EditProduct;
