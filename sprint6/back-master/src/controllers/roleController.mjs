// controllers/roleController.mjs
import authService from "../services/authService.mjs";

export const assignRoleToUser = async (req, res, next) => {
  try {
    const { userId, roleId } = req.body;

    // Llama al servicio
    const updatedUser = await authService.assignRole(userId, roleId);

    res.status(200).json({
      message: "Rol asignado correctamente",
      user: updatedUser,
    });
  } catch (err) {
    // Puedes enriquecer el error con un código HTTP
    err.status = err.message.includes("no encontrado") ? 404 : 400;
    next(err);
  }
};
