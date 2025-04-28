import User from '../models/User.mjs';
import Role from '../models/Role.mjs';

// Obtener todos los usuarios
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate('role');
    
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// Obtener un usuario por ID
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('role');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Usuario no encontrado'
      });
    }

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

// Crear un usuario
export const createUser = async (req, res) => {
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

    res.status(201).json({
      success: true,
      data: user
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// Actualizar un usuario
export const updateUser = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Usuario no encontrado'
      });
    }

    // Si se actualiza el rol, verificar que exista
    if (req.body.roleName) {
      const role = await Role.findOne({ name: req.body.roleName });
      
      if (!role) {
        return res.status(400).json({
          success: false,
          error: 'El rol especificado no existe'
        });
      }
      
      req.body.role = role._id;
      delete req.body.roleName;
    }

    // Actualizar usuario
    user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate('role');

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// Eliminar un usuario
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Usuario no encontrado'
      });
    }

    await user.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// Controlador para gestionar roles
export const getRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    
    res.status(200).json({
      success: true,
      count: roles.length,
      data: roles
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// Crear un rol
export const createRole = async (req, res) => {
  try {
    const role = await Role.create(req.body);
    
    res.status(201).json({
      success: true,
      data: role
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};import User from '../models/User.mjs';
import Role from '../models/Role.mjs';

// Obtener todos los usuarios
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate('role');
    
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// Obtener un usuario por ID
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('role');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Usuario no encontrado'
      });
    }

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

// Crear un usuario
export const createUser = async (req, res) => {
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

    res.status(201).json({
      success: true,
      data: user
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// Actualizar un usuario
export const updateUser = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Usuario no encontrado'
      });
    }

    // Si se actualiza el rol, verificar que exista
    if (req.body.roleName) {
      const role = await Role.findOne({ name: req.body.roleName });
      
      if (!role) {
        return res.status(400).json({
          success: false,
          error: 'El rol especificado no existe'
        });
      }
      
      req.body.role = role._id;
      delete req.body.roleName;
    }

    // Actualizar usuario
    user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate('role');

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// Eliminar un usuario
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Usuario no encontrado'
      });
    }

    await user.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// Controlador para gestionar roles
export const getRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    
    res.status(200).json({
      success: true,
      count: roles.length,
      data: roles
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// Crear un rol
export const createRole = async (req, res) => {
  try {
    const role = await Role.create(req.body);
    
    res.status(201).json({
      success: true,
      data: role
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};