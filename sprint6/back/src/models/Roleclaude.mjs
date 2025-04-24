// models/Role.mjs
import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    enum: ['user', 'admin', 'editor', 'moderator'], // Roles predefinidos
    default: 'user'
  },
  permissions: [{
    resource: String,       // Por ejemplo: 'posts', 'users', 'comments'
    actions: [{
      type: String,
      enum: ['create', 'read', 'update', 'delete', 'manage']
    }]
  }],
  description: {
    type: String
  }
});

const Role = mongoose.model('Role', roleSchema);

export default Role;