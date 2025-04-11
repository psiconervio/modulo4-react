import axios from "axios";

export const featchPersonaId = async (id) => {
  const url = `https://67ef0b8dc11d5ff4bf7b9f43.mockapi.io/api/v1/users/${id}`;
  const response = await axios.get(url);
  return response.data;
};

export const featchPersonaName = async (id) => {
  const url = `https://67ef0b8dc11d5ff4bf7b9f43.mockapi.io/api/v1/users/${id}`;
  const response = await axios.get(url);
  return response.data;
};

export const apidbmongo = async (id = "") => {
  const baseUrl = "https://nodofullstack-m3-0w08.onrender.com/api/heroes";
  const url = `${baseUrl}/${id}`;

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  try {
    await delay(2000); // Wait for 2 seconds
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data from API:", error);
    throw error;
  }
};

// router.get('/heroes', obtenerTodosLosSuperheroesController);
// router.get('/heroes/:id', obtenerSuperheroePorIdController);
// router.get('/heroes/buscar/:atributo/:valor', buscarSuperheroesPorAtributoController);
// router.get('/heroes/mayores-30', obtenerSuperheroesMayoresDe30Controller);
// // ruta para el nuevo endpoint
// router.get('/heroes/buscar/mayores', obtenerSuperheroesMayoresDe30NativoController);
// //rutas NUEVAS ruta post con middleware
// // router.post('/heroes',validarCamposSuperHeroe, crearHeroeController );
// router.post('/heroes',validarHeroeEvalidator, crearHeroeController);
// // router.post('/heroes', crearHeroeController );
// // ejercicio 3
// router.put('/heroes/nombre/:nombreSuperHeroe',validarHeroeEvalidator, actualizarHeroePorNombre);
// // ejercicio 4
// router.delete('/heroes/id/:id', borrarHeroePorId);
// //PETICION HTTP DE DELETE A GET PARA PODER ELMINAR
// router.get('/heroes/id/:id', borrarHeroePorId);
// //Actualizar por id
// // router.post('/heroes/idput/:id', actualizarHeroePorId);
// router.put('/heroes/idput/:id',validarHeroeEvalidator, actualizarHeroePorId);
// // ejercicio 5 Endpoint DELETE para eliminar un heroe por nombre
// router.delete('/heroes/nombre/:nombre', borrarHeroePorNombre);
