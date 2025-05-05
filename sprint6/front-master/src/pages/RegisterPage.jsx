import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaShoppingCart, FaExclamationCircle } from "react-icons/fa";
import { MOCK_USERS } from "../data/mockData";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useTheme } from "../context/ThemeContext";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();
  const { theme } = useTheme();
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setError("");

  //   // For the demo, we'll accept any email that matches a mock user
  //   const user = MOCK_USERS.find(
  //     (user) => user.email.toLowerCase() === email.toLowerCase()
  //   );

  //   if (user && password) {
  //     const success = login(user);
  //     if (success) {
  //       navigate("/");
  //     } else {
  //       setError("Something went wrong. Please try again.");
  //     }
  //   } else {
  //     setError("Invalid email or password.");
  //   }
  // };

  // // For demo purposes, provide a quick login option
  // const handleDemoLogin = (userId) => {
  //   const user = MOCK_USERS.find((user) => user.id === userId);
  //   if (user) {
  //     login(user);
  //     navigate("/");
  //   }
  // };
  const onSubmit = async (data) => {
    const success = await login(data.email, data.password);
    console.log(success);
    if (success) {
      navigate("/");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col justify-center items-center p-4 ${
        theme === "dark" ? "bg-gray-800" : "bg-gray-200"
      }`}
    >
      <div
        className={`bg-white rounded-lg shadow-md p-8 w-full max-w-md ${
          theme === "dark" ? "bg-gray-700" : "bg-gray-200"
        }`}
      >
        <div
          className={`text-center mb-6 ${
            theme === "dark"
              ? "bg-gray-700 text-white"
              : "bg-slate-200 text-black"
          }`}
        >
          <Link
            to="/"
            className="inline-flex items-center text-fb-blue text-2xl font-bold"
          >
            <FaShoppingCart className="mr-2" />
            FBMarket
          </Link>
          <p
            className={` mt-2 ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            Compra y vende artículos con personas de tu comunidad
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 flex items-center">
            <FaExclamationCircle className="mr-2" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className={`block  font-medium mb-2 ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              Correo electrónico
            </label>
            <input
              {...register("email", { required: "email requerido" })}
              type="email"
              className="input-field"
              placeholder="Introduce tu correo electrónico"
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className={`block font-medium mb-2 ${theme === 'dark'? 'text-white':'text-black'}`}
            >
              Contraseña
            </label>
            <input
              {...register("password", { required: "password requerido" })}
              type="password"
              className="input-field"
              placeholder="Introduce tu contraseña"
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>
          <button type="submit" className="btn-primary w-full mb-4">
            Registrarme
          </button>
        </form>
        <button
          onClick={navigate('login')}
          className="bg-slate-700 w-full mb-4 text-white"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
