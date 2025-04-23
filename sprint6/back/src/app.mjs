import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database.mjs";
import routes from "./routes/index.mjs";
// import initializeRolesAndPermissions from "./scripts/createRolesAndPermissions.mjs";

// Configurar variables de entorno
dotenv.config();

// Cargar modelos
import "./models/Permission.mjs";
import "./models/Role.mjs";
import "./models/User.mjs";

const app = express();

// initializeRolesAndPermissions(); // Inicializar roles y permisos al iniciar la aplicación
// Configuración de CORS más segura y específica
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS?.split(",") || "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Content-Range", "X-Content-Range"],
  credentials: true,
  maxAge: 86400, // 24 horas en segundos
};

app.use(cors(corsOptions));
app.use(express.json());

// Rutas
app.use("/api", routes);

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
// // const initializeRolesAndPermissions = require("./scripts/createRolesAndPermissions")

// require("dotenv").config();

// // Cargar modelos
// require("./models/Permission");
// require("./models/Role");
// require("./models/User");
// const app = express();

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

// // app.get("/migracion", (req, res) => {
// //   // Aquí puedes agregar la lógica de migración que necesites
// //   initializeRolesAndPermissions()
// //   res.status(200).json({ status: "OK", timestamp: new Date() });
// // });

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
