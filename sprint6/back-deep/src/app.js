const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const authRouter = require('./routes/authRouter');
const productRouter = require('./routes/productRouter');
const cartRouter = require('./routes/cartRouter');
const orderRouter = require('./routes/orderRouter');
const chatRouter = require('./routes/chatRouter');
const authMiddleware = require('./middleware/authMiddleware');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Database
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error de conexión:', err));

// Rutas
app.use('/api/auth', authRouter);
app.use('/api/products', productRouter);
app.use('/api/cart', authMiddleware.protect, cartRouter);
app.use('/api/orders', authMiddleware.protect, orderRouter);
app.use('/api/chat', authMiddleware.protect, chatRouter);

module.exports = app;
// const express = require("express");
// const cors = require("cors");
// const connectDB = require("./config/database");
// const routes = require("./routes");
// const productRouter = require("./routes/productRouter");
// // // Agrega después de las rutas existentes
// const cartRouter = require("./routes/cartRouter");
// const orderRouter = require("./routes/orderRouter");

// // const migracion = require("./scripts/createRolesAndPermissions");

// require("dotenv").config();

// // Cargar modelos
// require("./models/Permission");
// require("./models/Role");
// require("./models/User");
// const app = express();

// // migracion();
// // Configuración de CORS más segura y específica
// //Intercambio de recursos de origen cruzado

// const corsOptions = {
//   origin: process.env.ALLOWED_ORIGINS?.split(",") || "*",
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   exposedHeaders: ["Content-Range", "X-Content-Range"],
//   credentials: true,
//   maxAge: 86400, // 24 horas en segundos
// };

// app.use(cors(corsOptions));
// app.use(express.json());

// // Rutas
// app.use("/api", routes);
// app.use("/api/products", productRouter);
// app.use("/api/cart", cartRouter);
// app.use("/api/orders", orderRouter);

// // Health check endpoint
// app.get("/health", (req, res) => {
//   res.status(200).json({ status: "OK", timestamp: new Date() });
// });

// //Endpoint de prueba
// app.get("/", (req, res) => {
//   res.json({ message: "API funcionando" });
// });

// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: process.env.CLIENT_URL,
//     methods: ["GET", "POST"],
//   },
// });

// // Socket.io Logic
// io.use((socket, next) => {
//   const token = socket.handshake.auth.token;
//   // Aquí deberías agregar la lógica de autenticación JWT
//   // similar a tu middleware de autenticación existente
//   next();
// });

// io.on("connection", (socket) => {
//   console.log("Usuario conectado:", socket.id);

//   // Unirse a la sala de conversación
//   socket.on("join_conversation", (conversationId) => {
//     socket.join(conversationId);
//   });

//   // Manejar mensajes
//   socket.on("send_message", async (data) => {
//     try {
//       const newMessage = new Message({
//         conversation: data.conversationId,
//         sender: data.senderId,
//         content: data.content,
//       });

//       const savedMessage = await newMessage.save();

//       // Actualizar última conversación
//       await Conversation.findByIdAndUpdate(data.conversationId, {
//         lastMessage: data.content,
//         updatedAt: new Date(),
//       });

//       // Emitir mensaje a los participantes
//       io.to(data.conversationId).emit("receive_message", {
//         ...savedMessage.toObject(),
//         sender: { _id: data.senderId, name: data.senderName },
//       });
//     } catch (error) {
//       console.error("Error al guardar mensaje:", error);
//     }
//   });

//   socket.on("disconnect", () => {
//     console.log("Usuario desconectado:", socket.id);
//   });
// });
// // Iniciar conexión a MongoDB
// connectDB();

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Servidor corriendo en puerto ${PORT}`);
//   console.log(`✅ Servidor corriendo en puerto ${PORT}`);
//   console.log(`🌍 Accede en: http://localhost:${PORT}`);
// });

// // Manejo de errores no capturados
// process.on("unhandledRejection", (err) => {
//   console.log("Error no manejado:", err);
//   process.exit(1);
// });
