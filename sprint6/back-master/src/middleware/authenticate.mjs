// middleware/authenticate.mjs
import jwt from "jsonwebtoken";
import User from "../models/User.mjs";
import Role from "../models/Role.mjs";

export const authenticate = () => {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Token no proporcionado" });
      }

      const token = authHeader.replace("Bearer ", "").trim();
      // Verifica firma y vigencia
      const payload = jwt.verify(token, process.env.JWT_SECRET);

      // Busca al usuario y su rol para tener permisos actualizados
      const user = await User.findById(payload.id).select("-password");
      if (!user) {
        return res.status(401).json({ error: "Usuario no existe" });
      }

      // Opcional: Si en tu modelo Role guardas permisos:
      const roleDoc = await Role.findById(user.role);
      const roleName = roleDoc ? roleDoc.name : "desconocido";
      const permissions = roleDoc?.permissions || [];

      // Deja todo listo en req.user
      req.user = {
        id: user._id,
        email: user.email,
        role: roleName,
        permissions,
      };

      next();
    } catch (err) {
      console.error("Error en authenticate:", err);
      return res.status(401).json({ error: "Token inválido o expirado" });
    }
  };
};
