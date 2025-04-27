const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET } = require('../config');

const generateToken = (id) => jwt.sign({ id }, JWT_SECRET, { expiresIn: '7d' });

exports.register = async (req, res) => {
  const { username, email, password, role } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: 'El usuario ya existe' });

  const user = await User.create({ username, email, password, role });
  res.status(201).json({ token: generateToken(user._id) });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }
  res.json({ token: generateToken(user._id) });
};
