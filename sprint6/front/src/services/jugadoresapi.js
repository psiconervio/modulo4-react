import axios from "axios";
export const apidbmongo = async (id = "") => {
  const baseUrl = "https://nodofullstack-m3-0w08.onrender.com/api/heroes";
  const url = `${baseUrl}/${id}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data from API:", error);
    throw error;
  }
};

export const apidbmongoNombre = async (nombreSuperHeroe = "") => {
  const baseUrl = "https://nodofullstack-m3-0w08.onrender.com/api/heroes/nombre";
  const url = `${baseUrl}/${nombreSuperHeroe}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data from API:", error);
    throw error;
  }
};

export const apidbmongoPost = async (data) => {
  const baseUrl = "https://nodofullstack-m3-0w08.onrender.com/api/heroes";
  const url = `${baseUrl}`;

  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    console.error("Error posting data to API:", error);
    throw error;
  }
};
export const apidbmongoPut = async (id, data) => {
  const baseUrl = "https://nodofullstack-m3-0w08.onrender.com/api/heroes";
  const url = `${baseUrl}/${id}`;

  try {
    const response = await axios.put(url, data);
    return response.data;
  } catch (error) {
    console.error("Error updating data in API:", error);
    throw error;
  }
};
export const apidbmongoDelete = async (id) => {
  const baseUrl = "https://nodofullstack-m3-0w08.onrender.com/api/heroes";
  const url = `${baseUrl}/${id}`;

  try {
    const response = await axios.delete(url);
    return response.data;
  } catch (error) {
    console.error("Error deleting data from API:", error);
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
