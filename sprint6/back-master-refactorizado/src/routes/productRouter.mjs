import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
} from "../controllers/productController.mjs";
import { authenticateToken, hasPermission } from "../middleware/authMiddleware.mjs";

const router = express.Router();
try {
  router.get("/",authenticateToken, hasPermission('read:products'), getAllProducts); // Obtener todos los productos
  console.log("getAllProducts");
  router.get("/:id", getProductById); // Obtener un producto por ID
  console.log("getProductById");
  router.post("/", authenticateToken, hasPermission('create:products'), createProduct); // Crear un nuevo producto (requiere autenticación)
  console.log("createProduct");
} catch (error) {}

export default router;

// import express from 'express';
// import {
//     getAllProducts,
//     getProductById,
//     createProduct,
//     updateProduct,
//     deleteProduct,
// } from '../controllers/ProductController.mjs';

// const router = express.Router();

// router.get('/', getAllProducts); // Obtener todos los productos
// router.get('/:id', getProductById); // Obtener un producto por ID
// router.post('/', createProduct); // Crear un nuevo producto
// router.put('/:id', updateProduct); // Actualizar un producto existente
// router.delete('/:id', deleteProduct); // Eliminar un producto por ID

// export default router;
