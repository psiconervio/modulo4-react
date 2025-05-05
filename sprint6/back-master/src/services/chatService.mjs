import ChatMessage from '../models/ChatMessage.mjs';

class ChatService {
    // Guardar un mensaje en la base de datos
    async saveMessage(productId, senderId, message) {
        const chatMessage = new ChatMessage({
            product: productId,
            sender: senderId,
            message,
        });
        await chatMessage.save();
        return chatMessage;
    }

    // Obtener el historial de mensajes para un producto
    async getMessagesByProduct(productId) {
        return await ChatMessage.find({ product: productId })
            .populate('sender', 'username email')
            .sort({ timestamp: 1 }); // Ordenar por fecha
    }
}

export default new ChatService();