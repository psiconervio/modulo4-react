// Importamos las dependencias necesarias
import mongoose from "mongoose"; // Biblioteca para interactuar con MongoDB
import Permission from "../models/Permission.mjs"; // Modelo de permisos
import Role from "../models/Role.mjs"; // Modelo de roles
import dotenv from "dotenv"; // Para cargar variables de entorno desde un archivo .env
import connectDB from "../config/database.mjs"; // Función para conectar a la base de datos

// Cargamos las variables de entorno desde el archivo .env
dotenv.config();

// Definimos los permisos iniciales que queremos insertar en la base de datos
const initialPermissions = [
  {
    name: "read:superheros", // Nombre del permiso
    description: "Puede ver superhéroes", // Descripción del permiso
  },
  {
    name: "create:superheros",
    description: "Puede crear superhéroes",
  },
  {
    name: "update:superheros",
    description: "Puede actualizar superhéroes",
  },
  {
    name: "delete:superheros",
    description: "Puede eliminar superhéroes",
  },
];

// Definimos los roles iniciales que queremos insertar en la base de datos
const initialRoles = [
  {
    name: "user", // Nombre del rol
    description: "Usuario básico", // Descripción del rol
    permissions: ["read:superheros"], // Lista de permisos asociados al rol
  },
  {
    name: "editor",
    description: "Editor de contenido",
    permissions: ["read:superheros", "create:superheros", "update:superheros"],
  },
  {
    name: "admin",
    description: "Administrador del sistema",
    permissions: [
      "read:superheros",
      "create:superheros",
      "update:superheros",
      "delete:superheros",
    ],
  },
];

// Función principal para inicializar roles y permisos
export default async function initializeRolesAndPermissions() {
  try {
    // Conectamos a la base de datos
    await connectDB();
    console.log("Conectado a MongoDB");

    // Limpiamos las colecciones existentes de permisos y roles
    await Permission.deleteMany({});
    await Role.deleteMany({});
    console.log("Colecciones limpiadas");

    // Insertamos los permisos iniciales en la base de datos
    const createdPermissions = await Permission.insertMany(initialPermissions);
    console.log("Permisos creados exitosamente");

    // Creamos un mapa de permisos para facilitar la referencia por nombre
    const permissionsMap = createdPermissions.reduce((map, permission) => {
      map[permission.name] = permission._id; // Asociamos el nombre del permiso con su ID
      return map;
    }, {});

    // Preparamos los roles para insertarlos, reemplazando los nombres de permisos
    // por sus IDs correspondientes usando el mapa de permisos
    const rolesToCreate = initialRoles.map((role) => ({
      name: role.name, // Nombre del rol
      description: role.description, // Descripción del rol
      permissions: role.permissions.map((permName) => permissionsMap[permName]), // IDs de permisos
    }));

    // Insertamos los roles en la base de datos
    await Role.insertMany(rolesToCreate);
    console.log("Roles creados exitosamente");
  } catch (error) {
    // Capturamos y mostramos cualquier error que ocurra durante el proceso
    console.error("Error inicializando roles y permisos:", error);
  } finally {
    // Cerramos la conexión con la base de datos, independientemente de si hubo un error o no
    await mongoose.disconnect();
  }
}

// Llamamos a la función para inicializar roles y permisos
initializeRolesAndPermissions();


// import mongoose from "mongoose";
// import Permission from "../models/Permission.mjs";
// import Role from "../models/Role.mjs";
// import dotenv from "dotenv";
// import connectDB from "../config/database.mjs";

// dotenv.config();

// const initialPermissions = [
//   {
//     name: "read:superheros",
//     description: "Puede ver superhéroes",
//   },
//   {
//     name: "create:superheros",
//     description: "Puede crear superhéroes",
//   },
//   {
//     name: "update:superheros",
//     description: "Puede actualizar superhéroes",
//   },
//   {
//     name: "delete:superheros",
//     description: "Puede eliminar superhéroes",
//   },
// ];

// const initialRoles = [
//   {
//     name: "user",
//     description: "Usuario básico",
//     permissions: ["read:superheros"],
//   },
//   {
//     name: "editor",
//     description: "Editor de contenido",
//     permissions: ["read:superheros", "create:superheros", "update:superheros"],
//   },
//   {
//     name: "admin",
//     description: "Administrador del sistema",
//     permissions: [
//       "read:superheros",
//       "create:superheros",
//       "update:superheros",
//       "delete:superheros",
//     ],
//   },
// ];

// export default async function initializeRolesAndPermissions() {
//   try {
//     await connectDB();
//     console.log("Conectado a MongoDB");

//     // Limpiar colecciones existentes
//     await Permission.deleteMany({});
//     await Role.deleteMany({});
//     console.log("Colecciones limpiadas");

//     // Crear permisos
//     const createdPermissions = await Permission.insertMany(initialPermissions);
//     console.log("Permisos creados exitosamente");

//     // Crear mapa de permisos
//     const permissionsMap = createdPermissions.reduce((map, permission) => {
//       map[permission.name] = permission._id;
//       return map;
//     }, {});

//     // Crear roles con referencias a permisos
//     const rolesToCreate = initialRoles.map((role) => ({
//       name: role.name,
//       description: role.description,
//       permissions: role.permissions.map((permName) => permissionsMap[permName]),
//     }));

//     await Role.insertMany(rolesToCreate);
//     console.log("Roles creados exitosamente");
//   } catch (error) {
//     console.error("Error inicializando roles y permisos:", error);
//   } finally {
//     await mongoose.disconnect();
//   }
// }

//  initializeRolesAndPermissions();
// const mongoose = require("mongoose");
// const Permission = require("../models/Permission");
// const Role = require("../models/Role");
// require("dotenv").config();
// const connectDB = require("../config/database");

// const initialPermissions = [
//   {
//     name: "read:superheros",
//     description: "Puede ver superhéroes",
//   },
//   {
//     name: "create:superheros",
//     description: "Puede crear superhéroes",
//   },
//   {
//     name: "update:superheros",
//     description: "Puede actualizar superhéroes",
//   },
//   {
//     name: "delete:superheros",
//     description: "Puede eliminar superhéroes",
//   },
// ];

// const initialRoles = [
//   {
//     name: "user",
//     description: "Usuario básico",
//     permissions: ["read:superheros"],
//   },
//   {
//     name: "editor",
//     description: "Editor de contenido",
//     permissions: ["read:superheros", "create:superheros", "update:superheros"],
//   },
//   {
//     name: "admin",
//     description: "Administrador del sistema",
//     permissions: [
//       "read:superheros",
//       "create:superheros",
//       "update:superheros",
//       "delete:superheros",
//     ],
//   },
// ];

// async function initializeRolesAndPermissions() {
//   try {
//     await connectDB();
//     console.log("Conectado a MongoDB");

//     // Limpiar colecciones existentes
//     await Permission.deleteMany({});
//     await Role.deleteMany({});
//     console.log("Colecciones limpiadas");

//     // Crear permisos
//     const createdPermissions = await Permission.insertMany(initialPermissions);
//     console.log("Permisos creados exitosamente");

//     // Crear mapa de permisos
//     const permissionsMap = createdPermissions.reduce((map, permission) => {
//       map[permission.name] = permission._id;
//       return map;
//     }, {});

//     // Crear roles con referencias a permisos
//     const rolesToCreate = initialRoles.map((role) => ({
//       name: role.name,
//       description: role.description,
//       permissions: role.permissions.map((permName) => permissionsMap[permName]),
//     }));

//     await Role.insertMany(rolesToCreate);
//     console.log("Roles creados exitosamente");
//   } catch (error) {
//     console.error("Error inicializando roles y permisos:", error);
//   } finally {
//     await mongoose.disconnect();
//   }
// }

// initializeRolesAndPermissions();
