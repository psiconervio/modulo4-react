import mongoose from "mongoose";
//Definen cómo se modelan los datos dentro de tu aplicación.
//  En frameworks como Sequelize o Mongoose, los modelos también pueden incluir validaciones y relaciones entre entidades.
const countrySchema = new mongoose.Schema(
  {
    name: {
      common: { type: String },
      official: { type: String, required: true },
      nativeName: {
        type: Map,
        of: {
          official: { type: String },
          common: { type: String },
        },
      },
    },
    independent: { type: Boolean  },
    status: { type: String },
    unMember: { type: Boolean },
    currencies: {
      type: Map,
      of: {
        name: { type: String },
        symbol: { type: String },
      },
    },
    capital: [String],
    region: { type: String  },
    subregion: { type: String},
    languages: {
      type: Map,
      of: String,
    },
    latlng: [Number],
    landlocked: { type: Boolean },
    borders: [String],
    area: { type: Number },
    flag: { type: String },
    maps: {
      googleMaps: { type: String },
      openStreetMaps: { type: String },
    },
    population: { type: Number, required: true },
    gini: {
      type: Map,
      of: Number,
    },
    fifa: { type: String },
    timezones: [String],
    continents: [String],
    flags: {
      png: { type: String },
      svg: { type: String },
      alt: { type: String },
    },
    startOfWeek: { type: String},
    capitalInfo: {
      latlng: [Number],
    },
    creator: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "Grupo-18" }
);

export default mongoose.model("Country", countrySchema);
//MODELO VIEJO STANDARD
// const countrySchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true }, // Nombre del país
//     capital: { type: String, required: true }, // Capital del país
//     borders: [String], // Fronteras con otros países (array de strings)
//     area: Number, // Área en km²
//     population: Number, // Población
//     gini: Number, // Índice Gini
//     timezones: [String], // Zonas horarias (array de strings)
//     creator: { type: String, required: true }, // Usuario que creó el registro
//     category: { type: String, default: 'country', immutable: true }, // Categoría fija
//     createdAt: { type: Date, default: Date.now }, // Fecha de creación
//   },
//   { collection: 'Grupo-18' } // Usa la misma colección
// );

// export default mongoose.model('Country', countrySchema);
// import mongoose from 'mongoose';

// const countrySchema = new mongoose.Schema({
//   name: { type: String, required: true }, // Nombre del país
//   capital: { type: String, required: true }, // Capital del país
//   area: { type: Number, required: true }, // Área en km²
//   population: { type: Number, required: true }, // Población
//   createdAt: { type: Date, default: Date.now }, // Fecha de creación
// }, { collection: 'countries' });

// export default mongoose.model('Country', countrySchema);

// import mongoose from 'mongoose';

// const countrySchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   capital: { type: String, required: true },
//   borders: [String],
//   area: Number,
//   population: Number,
//   gini: Number,
//   timezones: [String],
//   creator: { type: String, required: true },
//   category: { type: String, default: 'country', immutable: true }, // Categoría fija
//   createdAt: { type: Date, default: Date.now }
// }, { collection: 'Grupo-18' }); // Misma colección

// export default mongoose.model('Country', countrySchema);
