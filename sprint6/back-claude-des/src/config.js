import dotenv from 'dotenv';
dotenv.config();

export const {
  PORT = 5000,
  MONGO_URI,
  JWT_SECRET,
  JWT_EXPIRES_IN = '7d'
} = process.env;
