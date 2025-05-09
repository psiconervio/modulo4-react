import chatService from "../services/chatService.mjs";

export const getChatMessages = async (req, res) => {
  try {
    const { productId } = req.params;
    const messages = await chatService.getMessagesByProduct(productId);
    res.json(messages);
  } catch (error) {
    console.error("Error al obtener mensajes del chat:", error);
    res.status(500).json({ message: "Error al obtener mensajes del chat" });
  }
};

