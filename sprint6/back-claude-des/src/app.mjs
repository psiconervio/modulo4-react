import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Rutas
import authRoutes from './routes/authRoutes.mjs';
import userRoutes from './routes/userRoutes.mjs';

// Configuración
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB conectado'))
.catch(err => console.error('Error al conectar a MongoDB:', err));

// Rutas API
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Ruta básica
app.get('/', (req, res) => {
  res.send('API de RBAC funcionando');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});