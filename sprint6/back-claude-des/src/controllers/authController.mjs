import User from '../models/User.mjs';
import Role from '../models/Role.mjs';

// Registrar usuario
export const register = async (req, res) => {
  try {
    const { username, email, password, roleName } = req.body;

    // Verificar si el rol existe
    const role = await Role.findOne({ name: roleName });
    
    if (!role) {
      return res.status(400).json({
        success: false,
        error: 'El rol especificado no existe'
      });
    }

    // Crear usuario
    const user = await User.create({
      username,
      email,
      password,
      role: role._id
    });

    sendTokenResponse(user, 201, res);
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// Iniciar sesión
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validar email y contraseña
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Por favor proporciona un email y contraseña'
      });
    }

    // Verificar si el usuario existe
    const user = await User.findOne({ email }).select('+password').populate('role');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Credenciales inválidas'
      });
    }

    // Verificar si la contraseña coincide
    const isMatch = await user.matchPassword(password);
    
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Credenciales inválidas'
      });
    }

    sendTokenResponse(user, 200, res);
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// Obtener perfil del usuario actual
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('role');
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// Función para enviar token con respuesta
const sendTokenResponse = (user, statusCode, res) => {
  // Crear token
  const token = user.getSignedJwtToken();

  res.status(statusCode).json({
    success: true,
    token
  });
};