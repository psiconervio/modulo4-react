import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import User from '../models/User.mjs';
import Product from '../models/Product.mjs';
import Cart from '../models/Cart.mjs';

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('⚙️  Conectado a MongoDB para sembrar datos…');

    // Limpia datos existentes (¡cuidado en prod!)
    await User.deleteMany();
    await Product.deleteMany();
    await Cart.deleteMany();
    console.log('🗑️  Colecciones vaciadas');

    // Crea usuario admin
    const admin = await User.create({
      username: 'admin',
      email: 'admin@example.com',
      password: 'admin123',  // se hashea automáticamente
      role: 'admin'
    });
    console.log('✅ Admin creado:', {
      id: admin._id,
      email: admin.email,
      role: admin.role
    });

    process.exit(0);
  } catch (err) {
    console.error('❌ Error al sembrar datos:', err);
    process.exit(1);
  }
}

seed();
