import Country from '../models/Country.mjs';
//Encapsulan las operaciones de acceso a datos, como consultas, inserciones,
//  actualizaciones, y eliminaciones. Esto permite que otras capas (como servicios) no tengan que preocuparse por cómo se accede a la base de datos.
//Se encargan de acceder a los modelos o directamente a la base de datos.
class CountryRepository {
  async obtenerTodos() {
    //usando el modelo Country busca todos los documentos en la coleccion con el filtro creador: Augusto
    return await Country.find({ creator: "Augusto" });
  }

  async obtenerPorId(id) {
    // return await Country.findById(id); // Busca un documento por su ID
    return await Country.findById(id);
  }

  async crear(paisData) {
    // const newCountry = new Country(countryData); // Crear instancia del modelo
    const nuevoPais = new Country(paisData);
    // return await newCountry.save(); // Guardar en la base de datos
    return await nuevoPais.save();
  }
//actualizar un pais existente por ID 
  async actualizar(id, paisData) {
    // return await Country.findByIdAndUpdate(id, countryData, { new: true }); // Actualizar documento
    return await Country.findByIdAndUpdate(id, paisData, { new: true });
  }

  async eliminar(id) {
    // return await Country.findByIdAndDelete(id); // Eliminar documento
    return await Country.findByIdAndDelete(id);
  }
}

export default new CountryRepository();

// import Country from '../models/Country.mjs'; // Asegúrate de tener definido el modelo

// class CountryRepository {
//   // Obtener todos los países
//   async getAllCountries() {
//     try {
//       return await Country.find(); // Busca todos los documentos en la colección
//     } catch (error) {
//       throw new Error(`Error al obtener países: ${error.message}`);
//     }
//   }

//   // Obtener un país por su ID
//   async getCountryById(id) {
//     try {
//       return await Country.findById(id); // Busca un documento por su ID
//     } catch (error) {
//       throw new Error(`Error al obtener el país con ID ${id}: ${error.message}`);
//     }
//   }

//   // Crear un nuevo país
//   async createCountry(countryData) {
//     try {
//       const newCountry = new Country(countryData); // Crear instancia del modelo
//       return await newCountry.save(); // Guardar en la base de datos
//     } catch (error) {
//       throw new Error(`Error al crear país: ${error.message}`);
//     }
//   }

//   // Actualizar un país existente por ID
//   async updateCountry(id, countryData) {
//     try {
//       return await Country.findByIdAndUpdate(id, countryData, { new: true }); // Actualizar documento
//     } catch (error) {
//       throw new Error(`Error al actualizar el país con ID ${id}: ${error.message}`);
//     }
//   }

//   // Eliminar un país por ID
//   async deleteCountry(id) {
//     try {
//       return await Country.findByIdAndDelete(id); // Eliminar documento
//     } catch (error) {
//       throw new Error(`Error al eliminar el país con ID ${id}: ${error.message}`);
//     }
//   }
// }

// export default CountryRepository;
