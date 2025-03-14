import SuperHeroRepository from '../repositories/SuperHeroRepository.mjs';
// import { renderizarSuperheroe } from '../views/responseView.mjs';
import express from 'express';
import { validarHeroeEvalidator  } from "../middleware/validarMidle.mjs";
import { validarCamposSuperHeroe  } from "../middleware/validarNombreSuperHeroe.mjs";
import {
  obtenerSuperheroePorIdController,
  obtenerTodosLosSuperheroesController,
  buscarSuperheroesPorAtributoController,
  obtenerSuperheroesMayoresDe30Controller,
  obtenerSuperheroesMayoresDe30NativoController,
  crearHeroeController,
  actualizarHeroePorNombre,
  borrarHeroePorId,
  borrarHeroePorNombre,
  actualizarHeroePorId
} from '../controllers/superheroesController.mjs';

const router = express.Router();
//configuracion de subrutas pasandole controladores que ejecutan funciones envian y reciben datos
router.get('/heroes', obtenerTodosLosSuperheroesController);
router.get('/heroes/:id', obtenerSuperheroePorIdController);
router.get('/heroes/buscar/:atributo/:valor', buscarSuperheroesPorAtributoController);
router.get('/heroes/mayores-30', obtenerSuperheroesMayoresDe30Controller);
// ruta para el nuevo endpoint
router.get('/heroes/buscar/mayores', obtenerSuperheroesMayoresDe30NativoController);
//rutas NUEVAS ruta post con middleware
// router.post('/heroes',validarCamposSuperHeroe, crearHeroeController );
router.post('/heroes',validarHeroeEvalidator, crearHeroeController);
// router.post('/heroes', crearHeroeController );
// ejercicio 3
router.put('/heroes/nombre/:nombreSuperHeroe',validarHeroeEvalidator, actualizarHeroePorNombre);
// ejercicio 4
router.delete('/heroes/id/:id', borrarHeroePorId);
//PETICION HTTP DE DELETE A GET PARA PODER ELMINAR 
router.get('/heroes/id/:id', borrarHeroePorId);
//Actualizar por id
// router.post('/heroes/idput/:id', actualizarHeroePorId);
router.put('/heroes/idput/:id',validarHeroeEvalidator, actualizarHeroePorId);
// ejercicio 5 Endpoint DELETE para eliminar un heroe por nombre
router.delete('/heroes/nombre/:nombre', borrarHeroePorNombre);

// router.get('/editSuperhero/id/:id', obtenerSuperheroePorIdController, (req, res) => {
//   res.render('editSuperhero', { superheroe: req.superheroe });
// });

// router.post('/editSuperhero/id/:id', actualizarHeroePorId);

export default router;


//CODIGOS DESACTUALIZADOS
//obtener id
// router.get('/superheroes/nombre/:nombre', async (req, res) => {
//   try {
//     const { nombre } = req.params; // Obtiene el nombre de los parámetros de la URL
//     const superheroe = await SuperHeroRepository.buscarPorNombre(nombre); // Busca por nombre

//     if (!superheroe) {
//       return res.status(404).json({ error: `No se encontró un superhéroe con el nombre "${nombre}".` });
//     }

//     // Renderiza el superhéroe y añade el ID
//     res.status(200).json({
//       id: superheroe._id, // Incluye el ID del superhéroe
//       ...renderizarSuperheroe(superheroe)
//     });
//   } catch (error) {
//     console.error('Error al buscar el superhéroe por nombre:', error);
//     res.status(500).json({ error: 'Error al buscar el superhéroe.' });
//   }
// });

// router.post('/heroes/idput/:id', async (req, res) => {
//   try {
//     console.log('Datos recibidos:', req.body);
//     const { poderes, aliados, enemigos, ...rest } = req.body;
//     const updateData = {
//       ...rest,
//       poderes: poderes.split(',').map(p => p.trim()),
//       aliados: aliados.split(',').map(a => a.trim()),
//       enemigos: enemigos.split(',').map(e => e.trim()),
//     };

//     const updatedHero = await SuperHeroRepository.actualizarPorId(req.params.id, updateData);

//     if (!updatedHero) {
//       return res.status(404).send('Héroe no encontrado');
//     }

//     res.redirect(`/api/heroes/id/${req.params.id}`);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Error al actualizar');
//   }
// });