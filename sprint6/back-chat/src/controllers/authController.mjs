import User from '../models/User.mjs';
import { generateToken } from '../utils/generateToken.js';

export const register = async (req, res) => {
  const { username, email, password, role } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: 'Usuario ya registrado' });

  const user = await User.create({ username, email, password, role });
  const token = generateToken(user._id, user.role);
  res.status(201).json({ token, user: { id: user._id, username, email, role } });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }
  const token = generateToken(user._id, user.role);
  res.json({ token, user: { id: user._id, username: user.username, email, role: user.role } });
};
