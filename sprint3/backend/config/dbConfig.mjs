import mongoose from 'mongoose';
//Almacenan variables y configuraciones globales, 
// como credenciales de bases de datos, claves de API, configuraciones de servidores, y más.
mongoose.set('strictQuery', true);

export async function connectDB() {
  try {
    await mongoose.connect(
      'mongodb+srv://Grupo-18:grupo18@cursadanodejs.ls9ii.mongodb.net/Node-js', {

      });
    console.log('Conexión exitosa a MongoDB');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    process.exit(1);
  }
}