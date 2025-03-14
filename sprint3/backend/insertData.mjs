import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Country from './models/Country.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Conectar a MongoDB
mongoose.connect('mongodb+srv://Grupo-18:grupo18@cursadanodejs.ls9ii.mongodb.net/Node-js', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Conectado a MongoDB');
}).catch(err => {
  console.error('Error al conectar a MongoDB', err);
});

// Leer el archivo JSON
const filePath = path.join(__dirname, 'paisess.json');
console.log(filePath);
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error al leer el archivo JSON', err);
    return;
  }

  // Parsear el JSON
  const countries = JSON.parse(data);

  // Insertar los datos en la colección
  Country.insertMany(countries)
    .then(() => {
      console.log('Datos insertados correctamente');
      mongoose.connection.close();
    })
    .catch(err => {
      console.error('Error al insertar los datos', err);
      mongoose.connection.close();
    });
});