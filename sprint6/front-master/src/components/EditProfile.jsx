import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { FaExclamationCircle } from "react-icons/fa";
import { updateUser } from "../data/apis"; // Asegúrate de tener estas funciones en tu API

const EditProfile = () => {
  const { id } = useParams(); // ID del usuario desde la URL
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { user } = useAuth(); // Usuario actual

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Cargar los datos del perfil al montar el componente
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setValue("name", user.name);
        setValue("email", user.email);
      } catch (error) {
        console.error("Error al cargar el perfil:", error);
      }
    };

    fetchProfile();
  }, [id, , setValue]);

  // Manejar el envío del formulario
  const onSubmit = async (data) => {
    try {
      await updateUser(id || user._id, data); // Actualiza el perfil
      console.log("Perfil actualizado correctamente");
      navigate("/profile"); // Redirige al perfil del usuario
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
    }
  };

  return (
    <div
      className={`rounded-lg shadow-md p-6 ${
        theme === "dark" ? "bg-slate-800" : "bg-slate-300"
      }`}
    >
      <h1 className="text-2xl font-bold mb-6">Editar Perfil</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Nombre */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className={`block font-medium mb-2 ${
              theme === "dark" ? "text-white" : "text-gray-700"
            }`}
          >
            Nombre*
          </label>
          <input
            {...register("name", { required: "El nombre es obligatorio" })}
            type="text"
            id="name"
            className={`input-field ${errors.name ? "border-red-500" : ""}`}
            placeholder="Tu nombre"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <FaExclamationCircle className="mr-1" /> {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className={`block font-medium mb-2 ${
              theme === "dark" ? "text-white" : "text-gray-700"
            }`}
          >
            Correo Electrónico*
          </label>
          <input
            {...register("email", {
              required: "El correo es obligatorio",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Correo inválido",
              },
            })}
            type="email"
            id="email"
            className={`input-field ${errors.email ? "border-red-500" : ""}`}
            placeholder="Tu correo electrónico"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <FaExclamationCircle className="mr-1" /> {errors.email.message}
            </p>
          )}
        </div>

        {/* Contraseña */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className={`block font-medium mb-2 ${
              theme === "dark" ? "text-white" : "text-gray-700"
            }`}
          >
            Nueva Contraseña
          </label>
          <input
            {...register("password", {
              minLength: {
                value: 6,
                message: "La contraseña debe tener al menos 6 caracteres",
              },
            })}
            type="password"
            id="password"
            className={`input-field ${errors.password ? "border-red-500" : ""}`}
            placeholder="Deja en blanco para no cambiarla"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <FaExclamationCircle className="mr-1" /> {errors.password.message}
            </p>
          )}
        </div>

        <div className="mt-6">
          <button type="submit" className="btn-primary w-full">
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
// import { useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { PRODUCT_CATEGORIES } from "../data/mockData";
// import { FaUpload, FaTrash, FaExclamationCircle } from "react-icons/fa";
// import { createProduct, updateProduct } from "../data/apis";
// import { useTheme } from "../context/ThemeContext";
// import { useForm } from "react-hook-form";

// const EditProfile = () => {
//   const { id } = useParams(); // Extrae el id de los parámetros de la URL
//   const { theme } = useTheme();
//   const { currentUser, user } = useAuth();
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm();
//   const navigate = useNavigate();
//   const [name, setName] = useState("");

//   //   const handleSubmit = async (e) => {
//   //     e.preventDefault();

//   //     const productData = {
//   //       name,
//   //       description,
//   //       price: parseFloat(price), // Asegúrate de que el precio sea un número
//   //     };
//   //     console.log(productData);

//   //     try {
//   //       // Llamar a la función `createProduct` para enviar los datos al backend
//   //       const response = await updateProduct(id, productData);
//   //       console.log("Product created successfully:", response.data);

//   //       // Redirigir al usuario después de crear el producto
//   //       navigate("/");
//   //     } catch (error) {
//   //       console.error("Error creating product:", error);
//   //       setErrors({ submit: "Failed to create product. Please try again." });
//   //     }
//   //   };

//   return (
//     <div
//       className={`rounded-lg shadow-md p-6 ${
//         theme === "dark" ? "bg-slate-800" : "bg-slate-300"
//       }`}
//     >
//       <form onSubmit={handleSubmit}>
//         <h1 className="text-2xl font-bold mb-6">Editar Usuario</h1>
//         <div className="mb-4">
//           <label
//             htmlFor="title"
//             className={`block font-medium mb-2 ${
//               theme === "dark" ? "text-white" : "text-gray-700"
//             }`}
//           >
//             Nombre *
//           </label>
//           <input
//             type="text"
//             id="title"
//             className={`input-field ${errors.title ? "border-red-500" : ""}`}
//             // value={name}
//             // onChange={(e) => setName(e.target.value)}
//             placeholder="¿Que estas vendiendo?"
//           />
//           {errors.title && (
//             <p className="text-red-500 text-sm mt-1 flex items-center">
//               <FaExclamationCircle className="mr-1" /> {errors.title}
//             </p>
//           )}
//         </div>

//         {/* Price */}
//         <div className="mb-4">
//           <label
//             htmlFor="price"
//             className={`block font-medium mb-2 ${
//               theme === "dark" ? "text-white" : "text-gray-700"
//             }`}
//           >
//             Email
//           </label>
//           <input
//             type="number"
//             id="price"
//             min="0"
//             step="0.01"
//             className={`input-field ${errors.price ? "border-red-500" : ""}`}
//             // value={price}
//             // onChange={(e) => setPrice(e.target.value)}
//             placeholder="0.00"
//           />
//           {errors.price && (
//             <p className="text-red-500 text-sm mt-1 flex items-center">
//               <FaExclamationCircle className="mr-1" /> {errors.price}
//             </p>
//           )}
//         </div>
//         <div className="mb-4">
//           <label
//             htmlFor="description"
//             className="block text-gray-700 font-medium mb-2"
//           >
//             Description*
//           </label>
//           <textarea
//             id="description"
//             rows="4"
//             className={`input-field ${
//               errors.description ? "border-red-500" : ""
//             }`}
//             // value={description}
//             // onChange={(e) => setDescription(e.target.value)}
//             placeholder="Describe your item in detail"
//           />
//           {errors.description && (
//             <p className="text-red-500 text-sm mt-1 flex items-center">
//               <FaExclamationCircle className="mr-1" /> {errors.description}
//             </p>
//           )}
//         </div>
//         <div className="mt-6">
//           <button type="submit" className="btn-primary w-full">
//             Publicar Producto
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default EditProfile;
