const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');
const authMiddleware = require('./middleware/authMiddleware');
const Message = require('./models/Message');
const Conversation = require('./models/Conversation');

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST']
  }
});

// Autenticación de Socket.io
io.use((socket, next) => {
  authMiddleware.authenticateSocket(socket, next);
});

// Lógica del Chat
io.on('connection', (socket) => {
  console.log(`Usuario conectado: ${socket.user.name}`);

  socket.on('join_conversation', async (conversationId) => {
    socket.join(conversationId);
    await Message.updateMany(
      { conversation: conversationId, sender: { $ne: socket.user.id } },
      { $set: { read: true } }
    );
  });

  socket.on('send_message', async (data) => {
    try {
      const newMessage = new Message({
        conversation: data.conversationId,
        sender: socket.user.id,
        content: data.content
      });

      const savedMessage = await newMessage.save();
      await Conversation.findByIdAndUpdate(data.conversationId, {
        lastMessage: data.content,
        updatedAt: new Date()
      });

      const populatedMessage = await Message.findById(savedMessage._id)
        .populate('sender', 'name avatar');

      io.to(data.conversationId).emit('receive_message', populatedMessage);
    } catch (error) {
      console.error('Error:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});