import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProductbyid,
  getProductsByCategory,
  // getProductsByPriceRange,
} from "../controllers/productController.mjs";
import { authenticateToken, hasPermission } from "../middleware/authMiddleware.mjs";

const router = express.Router();
try {
  router.get("/",authenticateToken, hasPermission('read:products'), getAllProducts); // Obtener todos los productos
  router.post("/", authenticateToken, hasPermission('create:products'), createProduct); // Crear un nuevo producto (requiere autenticación)
  router.get("/category/:category", authenticateToken, getProductsByCategory); // Obtener productos por categoría
  router.get("/:id", authenticateToken, getProductById); // Obtener un producto por ID
  router.put("/:id", authenticateToken, hasPermission('update:products'), updateProduct); // Actualizar un producto existente (requiere autenticación)
  router.delete("/:id", authenticateToken, hasPermission('delete:products'), deleteProductbyid); // Eliminar un producto por ID (requiere autenticación)
} catch (error) {
  console.error("Error en las rutas de productos:", error);
  throw error; // Lanza el error para que sea manejado por el middleware de errores
}

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
