// import * as authService from '../services/authService.mjs';
import authService from "../services/authService.mjs";

export const register = async (req, res) => {
  try {
    const result = await authService.register(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.log("Error en registro:", error);
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.json(result);
  } catch (error) {
    console.log("Error en login:", error);
    res.status(401).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { userId } = req.params; // ID del usuario desde los parámetros de la URL
    const updateData = req.body; // Datos de actualización desde el cuerpo de la solicitud

    // Llamamos al servicio para actualizar el usuario
    const result = await authService.updateUser(userId, updateData);

    // Enviamos la respuesta con el usuario actualizado y el token
    res.status(200).json({
      message: "Usuario actualizado correctamente",
      user: result.user,
      token: result.token,
    });
  } catch (error) {
    // Manejo de errores
    res.status(400).json({
      message: "Error al actualizar el usuario",
      error: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params; // ID del usuario desde los parámetros de la URL

    // Llamamos al servicio para eliminar el usuario
    await authService.deleteUser(userId);

    // Enviamos la respuesta de éxito
    res.status(200).json({
      message: "Usuario eliminado correctamente",
    });
  } catch (error) {
    // Manejo de errores
    res.status(400).json({
      message: "Error al eliminar el usuario",
      error: error.message,
    });
  }
};
export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params; // ID del usuario desde los parámetros de la URL

    // Llamamos al servicio para obtener el usuario por ID
    const result = await authService.getUserById(userId);

    // Enviamos la respuesta con el usuario encontrado
    res.status(200).json(result);
  } catch (error) {
    // Manejo de errores
    res.status(400).json({
      message: "Error al obtener el usuario",
      error: error.message,
    });
  }
};
export const getAllUsers = async (req, res) => {
  try {
    // Llamamos al servicio para obtener todos los usuarios
    const result = await authService.getAllUsers();

    // Enviamos la respuesta con la lista de usuarios
    res.status(200).json(result);
  } catch (error) {
    // Manejo de errores
    res.status(400).json({
      message: "Error al obtener los usuarios",
      error: error.message,
    });
  }
};
export const assignRole = async (req, res) => {
  try {
    const { userId, roleId } = req.body; // ID del usuario y rol desde el cuerpo de la solicitud

    // Llamamos al servicio para asignar el rol al usuario
    const result = await authService.assignRole(userId, roleId);

    // Enviamos la respuesta con el usuario actualizado
    res.status(200).json(result);
  } catch (error) {
    // Manejo de errores
    res.status(400).json({
      message: "Error al asignar el rol",
      error: error.message,
    });
  }
};