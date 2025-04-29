import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { PRODUCT_CATEGORIES } from "../data/mockData";
import { FaUpload, FaTrash, FaExclamationCircle } from "react-icons/fa";
import axios from "axios";

const CreateListingPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [location, setLocation] = useState("");
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [errors, setErrors] = useState({});

  // Handle image selection (mock functionality)
  const handleImageChange = (e) => {
    if (images.length >= 5) {
      setErrors({ ...errors, images: "Maximum 5 images allowed" });
      return;
    }

    setErrors({ ...errors, images: null });

    // In a real app, you'd handle file upload here
    // For this demo, we'll just simulate with placeholder images
    const newImages = [...images];
    newImages.push(e.target.files[0]);
    setImages(newImages);

    // Mock image URL (using a placeholder)
    const newImageUrls = [...imageUrls];
    newImageUrls.push(
      `https://images.pexels.com/photos/5946/white-tablet-calling.jpg?auto=compress&cs=tinysrgb&w=500`
    );
    setImageUrls(newImageUrls);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    const newImageUrls = [...imageUrls];
    newImageUrls.splice(index, 1);
    setImageUrls(newImageUrls);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!title.trim()) newErrors.title = "Title is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (!price || isNaN(price) || price <= 0)
      newErrors.price = "Valid price is required";
    if (!category) newErrors.category = "Category is required";
    if (!condition) newErrors.condition = "Condition is required";
    if (!location.trim()) newErrors.location = "Location is required";
    if (images.length === 0)
      newErrors.images = "At least one image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const formData = {
        title,
        description,
        price,
        category,
        condition,
        location,
        images, // Archivos seleccionados
      };

      console.log("Datos del formulario:", formData);

      try {
        // Enviar los datos al backend
        const response = await axios.post(
          "http://localhost:5000/api/products",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${currentUser.token}`,
            },
          }
        );

        console.log("Respuesta del backend:", response.data);
        console.log("el token es", response.data.token);

        // Redirigir al usuario después de crear el listado
        navigate("/");
      } catch (error) {
        console.error("Error al enviar los datos al backend:", error);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Listing</h1>

      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 font-medium mb-2"
          >
            Title*
          </label>
          <input
            type="text"
            id="title"
            className={`input-field ${errors.title ? "border-red-500" : ""}`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What are you selling?"
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
            className="block text-gray-700 font-medium mb-2"
          >
            Price* ($)
          </label>
          <input
            type="number"
            id="price"
            min="0"
            step="0.01"
            className={`input-field ${errors.price ? "border-red-500" : ""}`}
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

        {/* Category */}
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-gray-700 font-medium mb-2"
          >
            Category*
          </label>
          <select
            id="category"
            className={`input-field ${errors.category ? "border-red-500" : ""}`}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select a category</option>
            {PRODUCT_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <FaExclamationCircle className="mr-1" /> {errors.category}
            </p>
          )}
        </div>

        {/* Condition */}
        <div className="mb-4">
          <label
            htmlFor="condition"
            className="block text-gray-700 font-medium mb-2"
          >
            Condition*
          </label>
          <select
            id="condition"
            className={`input-field ${
              errors.condition ? "border-red-500" : ""
            }`}
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
          >
            <option value="">Select condition</option>
            <option value="New">New</option>
            <option value="Used - Like New">Used - Like New</option>
            <option value="Used - Good">Used - Good</option>
            <option value="Used - Fair">Used - Fair</option>
          </select>
          {errors.condition && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <FaExclamationCircle className="mr-1" /> {errors.condition}
            </p>
          )}
        </div>

        {/* Location */}
        <div className="mb-4">
          <label
            htmlFor="location"
            className="block text-gray-700 font-medium mb-2"
          >
            Location*
          </label>
          <input
            type="text"
            id="location"
            className={`input-field ${errors.location ? "border-red-500" : ""}`}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="City, State"
          />
          {errors.location && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <FaExclamationCircle className="mr-1" /> {errors.location}
            </p>
          )}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-medium mb-2"
          >
            Description*
          </label>
          <textarea
            id="description"
            rows="4"
            className={`input-field ${
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

        {/* Image uploads */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Photos* (max 5)
          </label>

          <div className="flex flex-wrap gap-3 mb-2">
            {/* Image preview area */}
            {imageUrls.map((url, index) => (
              <div key={index} className="relative w-24 h-24">
                <img
                  src={url}
                  alt={`Preview ${index + 1}`}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-white text-red-500 rounded-full p-1 shadow-md"
                >
                  <FaTrash size={12} />
                </button>
              </div>
            ))}

            {/* Add image button */}
            {images.length < 5 && (
              <label className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
                <FaUpload className="text-gray-400 mb-1" />
                <span className="text-xs text-gray-500">Add Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>

          {errors.images && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <FaExclamationCircle className="mr-1" /> {errors.images}
            </p>
          )}
        </div>

        {/* Submit button */}
        <div className="mt-6">
          <button type="submit" className="btn-primary w-full">
            List Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateListingPage;
