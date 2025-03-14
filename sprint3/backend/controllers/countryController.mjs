import {
  obtenerTodosLosPaises,
  obtenerPaisPorId,
  crearPais,
  actualizarPais,
  eliminarPais,
} from '../services/CountryService.mjs';
//Actúan como intermediarios entre las rutas y los servicios/modelos.
//Los controladores reciben las solicitudes, llaman a los servicios o modelos para realizar tareas específicas,
//  y luego devuelven una respuesta al cliente.

export async function obtenerTodosLosPaisesController(req, res) {
  // llama a la funcion obtenerTodosLosPaises() del servicio CountryService
  const paises = await obtenerTodosLosPaises();
  // responde con un json con los paises obtenidos
  res.json(paises);
}

export async function obtenerPaisPorIdController(req, res, next) {
  // obtiene el id del pais de los parametros de la solicitud
  const { id } = req.params;
  // llama a la funcion obtenerPaisPorId() del servicio CountryService
  const pais = await obtenerPaisPorId(id);
  // si no se encuentra el pais, responde con un error
  if (!pais) return res.status(404).json({ error: 'País no encontrado' });
  // si se encuentra el pais, lo agrega a la solicitud y llama al siguiente middleware
  req.country = pais;
  // res.json(pais);
  next();
}

export async function crearPaisController(req, res) {
  const paisData = req.body;
  const nuevoPais = await crearPais(paisData);
  res.status(201).json(nuevoPais);
}

export async function actualizarPaisController(req, res) {
  const { id } = req.params;
  const paisData = req.body;
  const paisActualizado = await actualizarPais(id, paisData);
  if (!paisActualizado) return res.status(404).json({ error: 'País no encontrado' });
  res.json(paisActualizado);
}

export async function eliminarPaisController(req, res) {
  const { id } = req.params;
  const paisEliminado = await eliminarPais(id);
  if (!paisEliminado) return res.status(404).json({ error: 'País no encontrado' });
  res.json({ message: 'País eliminado exitosamente' });
}
