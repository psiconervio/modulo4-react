import express from 'express';
import {
  obtenerTodosLosPaisesController,
  obtenerPaisPorIdController,
  crearPaisController,
  actualizarPaisController,
  eliminarPaisController,
} from '../controllers/countryController.mjs';
import { validateCountry } from "../middleware/validarCountry.mjs";
const router = express.Router();
//Las rutas actúan como un puente entre las solicitudes HTTP y los controladores, 
// definiendo qué controlador se ejecuta para una URL dada.
// Endpoints
router.get('/countries', obtenerTodosLosPaisesController); // Obtener todos los países
router.get('/countries/:id', obtenerPaisPorIdController); // Obtener un país por ID
router.post('/countries',validateCountry, crearPaisController); // Crear un nuevo país
router.put('/countries/:id',validateCountry, actualizarPaisController); // Actualizar un país
router.delete('/countries/:id', eliminarPaisController); // Eliminar un país

export default router;
