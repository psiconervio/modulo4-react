import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const success = await login(data.email, data.password);
    console.log(success);
    if (success) {
      console.log("Login successful");
      navigate("/home"); // Redirigir a la página de inicio después del inicio de sesión exitoso
    } else {
      console.log("Login failed");
    }
  };

  return (
    <div className="mx-4 my-4">
      <h1>login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="border-2 border-gray-300 rounded-md p-2"
            placeholder="Enter your email"
            {...register("email", { required: true })}
          />
          {errors.email && <span>This field is required</span>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="border-2 border-gray-300 rounded-md p-2"
            {...register("password", { required: true })}
          />
          {errors.password && <span>This field is required</span>}
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
