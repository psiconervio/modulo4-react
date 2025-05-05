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


// //Creamos un controlador para la autenticacion
// const authService = require('../services/authService');

// exports.register = async (req, res) => {
//     try {
//         const result = await authService.register(req.body);
//         res.status(201).json(result);
//     } catch (error) {
//         console.log('Error en registro:', error);
//         res.status(400).json({ message: error.message });
//     }
// };

// exports.login = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const result = await authService.login(email, password);
//         res.json(result);
//     } catch (error) {
//         console.log('Error en login:', error);
//         res.status(401).json({ message: error.message });
//     }
// };
