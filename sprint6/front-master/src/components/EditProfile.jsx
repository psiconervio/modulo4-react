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
        setValue("username", user.username);
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
      console.log("Perfil actualizado correctamente data:", data);
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
            htmlFor="username"
            className={`block font-medium mb-2 ${
              theme === "dark" ? "text-white" : "text-gray-700"
            }`}
          >
            Nombre*
          </label>
          <input
            {...register("username", {
              required: "El nombre de usuario es obligatorio",
            })}
            type="text"
            id="username"
            className={`input-field text-black${
              errors.username ? "border-red-500" : ""
            }`}
            placeholder="Tu nombre"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <FaExclamationCircle className="mr-1" /> {errors.username.message}
            </p>
          )}
        </div>
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
            className={`input-field text-black ${
              errors.email ? "border-red-500" : ""
            }`}
            placeholder="Tu correo electrónico"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <FaExclamationCircle className="mr-1" /> {errors.email.message}
            </p>
          )}
        </div>
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
            className={`input-field text-black${
              errors.password ? "border-red-500" : ""
            }`}
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
