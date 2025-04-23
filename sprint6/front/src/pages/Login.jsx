import React from "react";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    formstate: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  const { login } = useAuth();

  return (
    <div>
      <h1>login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          {...register("email", { required: true })}
        />
        {errors.email && <span>This field is required</span>}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          {...register("password", { required: true })}
        ></input>
        <input type="text" />
      </form>
    </div>
  );
};

export default Login;
