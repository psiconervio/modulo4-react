import express from "express";
import cors from "cors";
import connectDB from "./config/database.mjs";
import routes from "./routes/index.mjs";
import dotenv from "dotenv";
import { Server } from "socket.io";
import chatRouter from "./routes/ChatRouter.mjs";
import productRouter from "./routes/productRouter.mjs";
import roleRoutes from "./routes/roleRoutes.mjs";
import http from "http";
// import initializeRolesAndPermissions from "./scripts/createRolesAndPermissions.mjs";
//
// Cargar modelos
import "./models/Permission.mjs";
import "./models/Role.mjs";
import "./models/User.mjs";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Cambia esto según tu configuración de frontend
    methods: ["GET", "POST"],
  },
});

// Configuración de CORS más segura y específica
const corsOptions = {
  origin: "*",
  // origin: process.env.ALLOWED_ORIGINS?.split(",") || "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Content-Range", "X-Content-Range"],
  credentials: true,
  maxAge: 86400, // 24 horas en segundos
};

app.use(cors(corsOptions));
app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date() });
});

// Endpoint de prueba
app.get("/", (req, res) => {
  res.json({ message: "API funcionando" });
});

// Iniciar conexión a MongoDB
connectDB();

// Rutas
app.use("/api/chat", chatRouter);
app.use("/api", routes);
app.use("/api/products", productRouter);
app.use("/api/roles", roleRoutes);

// Configuración de Socket.IO
// io.on("connection", (socket) => {
//   console.log("Usuario conectado:", socket.id);

//   // Unirse a una sala de chat basada en el producto
//   socket.on("join_room", ({ productId, userId }) => {
//     const room = `product_${productId}`;
//     socket.join(room);
//     console.log(`Usuario ${userId} se unió a la sala ${room}`);
//   });

//   // Manejar mensajes enviados por los usuarios
//   socket.on("send_message", ({ productId, senderId, message }) => {
//     const room = `product_${productId}`;
//     const chatMessage = {
//       senderId,
//       message,
//       timestamp: new Date(),
//     };

//     // Emitir el mensaje a todos los usuarios en la sala
//     io.to(room).emit("receive_message", chatMessage);
//     console.log(`Mensaje enviado en sala ${room}:`, chatMessage);
//   });

//   // Desconexión del usuario
//   socket.on("disconnect", () => {
//     console.log("Usuario desconectado:", socket.id);
//   });
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
  console.log(`✅ Servidor corriendo en puerto ${PORT}`);
  console.log(`🌍 Accede en: http://localhost:${PORT}`);
});

// Manejo de errores no capturados
process.on("unhandledRejection", (err) => {
  console.log("Error no manejado:", err);
  process.exit(1);
});

// const express = require("express");
// const cors = require("cors");
// const connectDB = require("./config/database");
// const routes = require("./routes");
// const migracion = require("./scripts/createRolesAndPermissions");

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

// // Health check endpoint
// app.get("/health", (req, res) => {
//   res.status(200).json({ status: "OK", timestamp: new Date() });
// });

// //Endpoint de prueba
// app.get("/", (req, res) => {
//   res.json({ message: "API funcionando" });
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
