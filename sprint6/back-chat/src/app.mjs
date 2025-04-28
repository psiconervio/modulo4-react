import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import { PORT, MONGO_URI } from './config.js';
import authRoutes    from './routes/authRoutes.mjs';
import productRoutes from './routes/productRoutes.mjs';
import cartRoutes    from './routes/cartRoutes.mjs';

const app = express();

app.use(cors());
app.use(express.json());

// Mount routes
app.use('/api/auth',    authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart',     cartRoutes);

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Conectado a MongoDB');
    app.listen(PORT, () =>
      console.log(`🚀 Servidor escuchando en puerto ${PORT}`)
    );
  })
  .catch(err => {
    console.error('❌ Error al conectar a MongoDB:', err);
    process.exit(1);
  });
