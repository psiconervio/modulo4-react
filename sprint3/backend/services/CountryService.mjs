import countryRepository from '../repositories/CountryRepository.mjs';
//Los servicios procesan datos, realizan validaciones avanzadas, o coordinan llamadas a los repositories.
//el servicio ejecuta desde la clase countryRepository la funcion obtenerTodos()
export async function obtenerTodosLosPaises() {
  // de la clase countryRepository de la capa repositorios ejecuta la funcion obtenerTodos()
  return await countryRepository.obtenerTodos();
}

export async function obtenerPaisPorId(id) {
  // de la clase countryRepository de la capa repositorios ejecuta la funcion obtenerPorId(id) y le pasa el id recibido como parametro
  return await countryRepository.obtenerPorId(id);
}

export async function crearPais(paisData) {
  return await countryRepository.crear(paisData);
}

export async function actualizarPais(id, paisData) {
  // de la clase countryRepository de la capa repositorios ejecuta la funcion actualizar(id, paisData)
  //  y le pasa el id y los datos del pais recibidos como parametro
  return await countryRepository.actualizar(id, paisData);
}

export async function eliminarPais(id) {
  return await countryRepository.eliminar(id);
}
