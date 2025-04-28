import mongoose from 'mongoose';

const PermissionSchema = new mongoose.Schema({
  resource: {
    type: String,
    required: true
  },
  actions: {
    type: [String], // create, read, update, delete
    required: true
  }
});

const RoleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String
  },
  permissions: [PermissionSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Role', RoleSchema);