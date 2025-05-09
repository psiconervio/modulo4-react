import chatService from '../services/chatService.mjs';

// Obtener todos los mensajes de un producto
export const getChatMessages = async (req, res) => {
  try {
    const { productId } = req.params;
    const messages = await chatService.getMessagesByProduct(productId);
    res.json(messages);
  } catch (error) {
    console.error("Error al obtener mensajes del producto:", error);
    res.status(500).json({ message: "Error al obtener mensajes del producto" });
  }
};

// Crear nuevo mensaje
export const postChatMessage = async (req, res) => {
  try {
    const { product, sender, message } = req.body;

    if (!product || !sender || !message) {
      return res.status(400).json({ message: "Faltan datos obligatorios" });
    }

    const savedMessage = await chatService.saveMessage(product, sender, message);
    res.status(201).json(savedMessage);
  } catch (error) {
    console.error("Error al guardar mensaje:", error);
    res.status(500).json({ message: "Error al guardar mensaje" });
  }
};

// Actualizar un mensaje
export const updateChatMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: "El mensaje no puede estar vacío" });
    }

    const updated = await chatService.updateMessage(id, message);
    if (!updated) {
      return res.status(404).json({ message: "Mensaje no encontrado" });
    }

    res.json(updated);
  } catch (error) {
    console.error("Error al actualizar mensaje:", error);
    res.status(500).json({ message: "Error al actualizar mensaje" });
  }
};

// Eliminar un mensaje
export const deleteChatMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await chatService.deleteMessage(id);
    if (!deleted) {
      return res.status(404).json({ message: "Mensaje no encontrado" });
    }

    res.status(204).send(); // No Content
  } catch (error) {
    console.error("Error al eliminar mensaje:", error);
    res.status(500).json({ message: "Error al eliminar mensaje" });
  }
};

//   import chatService from "../services/chatService.mjs";

//   export const getChatMessages = async (req, res) => {
//     try {
//       const { productId } = req.params;
//       const messages = await chatService.getMessagesByProduct(productId);
//       res.json(messages);
//     } catch (error) {
//       console.error("Error al obtener mensajes del chat:", error);
//       res.status(500).json({ message: "Error al obtener mensajes del chat" });
//     }
//   };

// export const postChatMessage = async (req, res) => {
//   try {
//     const { product, sender, message } = req.body;

//     if (!product || !sender || !message) {
//       return res.status(400).json({ message: "Faltan datos obligatorios" });
//     }

//     const savedMessage = await chatService.saveMessage(product, sender, message);
//     res.status(201).json(savedMessage);
//   } catch (error) {
//     console.error("Error al guardar mensaje del chat:", error);
//     res.status(500).json({ message: "Error al guardar mensaje del chat" });
//   }
// };