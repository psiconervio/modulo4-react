import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaShoppingCart, FaExclamationCircle } from "react-icons/fa";
import { MOCK_USERS } from "../data/mockData";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();
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
 Swal.fire({
        icon: "success",
        title: "Bienvenido",
        text: "Has iniciado sesión correctamente.",
 })
      navigate("/");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen bg-fb-gray flex flex-col justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <Link
            to="/"
            className="inline-flex items-center text-fb-blue text-2xl font-bold"
          >
            <FaShoppingCart className="mr-2" />
            FBMarket
          </Link>
          <p className="text-gray-600 mt-2">
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
              className="block text-gray-700 font-medium mb-2"
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
            {/* <input
              type="email"
              id="email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Introduce tu correo electrónico"
              required
            /> */}
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
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
            {/* <input
              type="password"
              id="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Introduce tu contraseña"
              required
            /> */}
          </div>

          <button type="submit" className="btn-primary w-full mb-4">
            Iniciar sesión
          </button>
        </form>

        {/* <div className="text-center my-4">
          <span className="text-gray-500">o</span>
        </div> */}

        {/* <div className="mb-4">
          <p className="text-center text-gray-700 mb-2">
            Inicio rápido de sesión para demostración:
          </p>
          <div className="grid grid-cols-2 gap-2">
            {MOCK_USERS.map((user) => (
              <button
                key={user.id}
                onClick={() => handleDemoLogin(user.id)}
                className="flex items-center p-2 border rounded-md hover:bg-gray-50"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <span className="text-sm">{user.name}</span>
              </button>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default LoginPage;
