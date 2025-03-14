import superHeroRepository from '../repositories/SuperHeroRepository.mjs';

//capa de servicios, contiene la logica del negocio y se encarga de validar
//y transformar los datos cuando es necesario, facilitando la separacion de
//responsabilidades asegurando que la logica se mantiene en un solo lugar
export async function obtenerSuperheroePorId(id) {
  return await superHeroRepository.obtenerPorId(id);
}

export async function obtenerTodosLosSuperheroes() {
  return await superHeroRepository.obtenerTodos();
}

export async function buscarSuperheroesPorAtributo(atributo, valor) {
  return await superHeroRepository.buscarPorAtributo(atributo, valor);
}

export async function obtenerSuperheroesMayoresDe30() {
  return await superHeroRepository.obtenerMayoresDe30();
}

export async function obtenerSuperheroesMayoresDe30Nativo() {
  return await superHeroRepository.obtenerMayoresDe30Nativo();
}
// Servicio para crear un nuevo superhéroe
export const createSuperHeroService = async (superHeroData) => {
  return await superHeroRepository.crear(superHeroData);
};

export const actualizarPorIdService = async (superHeroData) => {
  return await superHeroRepository.actualizarPorId(superHeroData);
}
export const borrarHeroePorIdService = async (id) => {
  return await superHeroRepository.eliminarPorId(id);
};
//paises
