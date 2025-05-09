import ChatMessage from '../models/ChatMessage.mjs';

class ChatService {
  // Crear y guardar un nuevo mensaje
  async saveMessage(productId, senderId, message) {
    const chatMessage = new ChatMessage({
      product: productId,
      sender: senderId,
      message,
    });
    await chatMessage.save();
    return chatMessage;
  }

  // Obtener todos los mensajes asociados a un producto
  async getMessagesByProduct(productId) {
    return ChatMessage.find({ product: productId })
      .populate('sender', 'username email')
      .sort({ timestamp: 1 });
  }

  // Actualizar un mensaje específico
  async updateMessage(id, newMessage) {
    const updated = await ChatMessage.findByIdAndUpdate(
      id,
      { message: newMessage },
      { new: true }
    );
    return updated;
  }

  // Eliminar un mensaje específico
  async deleteMessage(id) {
    const result = await ChatMessage.findByIdAndDelete(id);
    return result;
  }
}

export default new ChatService();

