import mongoose from 'mongoose';

const permissionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    }
});

// Exportar el modelo
const Permission = mongoose.model('Permission', permissionSchema);
export default Permission;
// const mongoose = require('mongoose');

// const permissionSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     description: {
//         type: String,
//         required: true
//     }
// });

// // Exportar el modelo
// const Permission = mongoose.model('Permission', permissionSchema);
// module.exports = Permission;