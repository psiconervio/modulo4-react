import express from "express";
import { getChatMessages } from "../controllers/chatController.mjs";
import { authenticateToken } from "../middleware/authMiddleware.mjs";

const router = express.Router();

router.get(
  "/:productId",
  //  authenticateToken,
  getChatMessages
); // Obtener historial de mensajes para un producto
router.get("/chat/:productId", getChatMessages);
// router.post("/chat", postChatMessage);
// router.post("/chat/:productId", postChatMessage); // Enviar un nuevo mensaje en el chat de un producto
// router.post("/chat/:productId", authenticateToken, postChatMessage); // Enviar un nuevo mensaje en el chat de un producto
export default router;
