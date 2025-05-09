import express from 'express';
import {
  getChatMessages,
  postChatMessage,
  updateChatMessage,
  deleteChatMessage,
} from '../controllers/chatController.mjs';

const router = express.Router();

router.get('/:productId', getChatMessages);
router.post('/', postChatMessage);
router.put('/:id', updateChatMessage);
router.delete('/:id', deleteChatMessage);

export default router;

// import express from 'express';
// import {
//   getChatMessages,
//   postChatMessage,
//   updateChatMessage,
//   deleteChatMessage,
// } from '../controllers/chatController.mjs';

// const router = express.Router();

// router.get('/:productId', getChatMessages);     // Obtener mensajes de producto
// router.post('/', postChatMessage);              // Crear nuevo mensaje
// router.put('/:id', updateChatMessage);          // Editar mensaje
// router.delete('/:id', deleteChatMessage);       // Eliminar mensaje

// export default router;

// import express from "express";
// import {
//   getChatMessages,
//   postChatMessage,
// } from "../controllers/chatController.mjs";
// import { authenticateToken } from "../middleware/authMiddleware.mjs";

// const router = express.Router();

// router.get(
//   "/:productId",
//   //  authenticateToken,
//   getChatMessages
// ); // Obtener historial de mensajes para un producto
// // router.get("/:productId", getChatMessages);
// router.post("/", postChatMessage);
// // router.post("/chat/:productId", postChatMessage); // Enviar un nuevo mensaje en el chat de un producto
// // router.post("/chat/:productId", authenticateToken, postChatMessage); // Enviar un nuevo mensaje en el chat de un producto
// export default router;
