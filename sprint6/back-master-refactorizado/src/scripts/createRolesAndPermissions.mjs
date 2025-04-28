import mongoose from 'mongoose';
import Permission from '../models/Permission.mjs';
import Role from '../models/Role.mjs';
import User from '../models/User.mjs';
import Product from '../models/ProductN.mjs';
import dotenv from 'dotenv';
import connectDB from '../config/database.mjs';

dotenv.config();

// Datos iniciales
const initialPermissions = [
    { name: 'read:superheros', description: 'Puede ver superhéroes' },
    { name: 'create:superheros', description: 'Puede crear superhéroes' },
    { name: 'update:superheros', description: 'Puede actualizar superhéroes' },
    { name: 'delete:superheros', description: 'Puede eliminar superhéroes' },
];

const initialRoles = [
    {
        name: 'user',
        description: 'Usuario básico',
        permissions: ['read:superheros'],
    },
    {
        name: 'editor',
        description: 'Editor de contenido',
        permissions: ['read:superheros', 'create:superheros', 'update:superheros'],
    },
    {
        name: 'admin',
        description: 'Administrador del sistema',
        permissions: ['read:superheros', 'create:superheros', 'update:superheros', 'delete:superheros'],
    },
];

const initialUsers = [
    {
        username: 'admin',
        email: 'admin@example.com',
        password: 'admin123', // En un entorno real, encripta las contraseñas
        role: 'admin',
    },
    {
        username: 'seller1',
        email: 'seller1@example.com',
        password: 'seller123',
        role: 'user',
    },
    {
        username: 'seller2',
        email: 'seller2@example.com',
        password: 'seller123',
        role: 'user',
    },
];

const initialProducts = [
    {
        name: 'Producto 1',
        price: 100,
        image: 'https://example.com/product1.jpg',
        description: 'Descripción del producto 1',
    },
    {
        name: 'Producto 2',
        price: 200,
        image: 'https://example.com/product2.jpg',
        description: 'Descripción del producto 2',
    },
    {
        name: 'Producto 3',
        price: 300,
        image: 'https://example.com/product3.jpg',
        description: 'Descripción del producto 3',
    },
];

// Función para poblar la base de datos
async function initializeRolesPermissionsUsersAndProducts() {
    try {
        await connectDB();
        console.log('Conectado a MongoDB');

        // Limpiar colecciones existentes
        await Permission.deleteMany({});
        await Role.deleteMany({});
        await User.deleteMany({});
        await Product.deleteMany({});
        console.log('Colecciones limpiadas');

        // Crear permisos
        const createdPermissions = await Permission.insertMany(initialPermissions);
        console.log('Permisos creados exitosamente');

        // Crear mapa de permisos
        const permissionsMap = createdPermissions.reduce((map, permission) => {
            map[permission.name] = permission._id;
            return map;
        }, {});

        // Crear roles con referencias a permisos
        const rolesToCreate = initialRoles.map((role) => ({
            name: role.name,
            description: role.description,
            permissions: role.permissions.map((permName) => permissionsMap[permName]),
        }));

        const createdRoles = await Role.insertMany(rolesToCreate);
        console.log('Roles creados exitosamente');

        // Crear mapa de roles
        const rolesMap = createdRoles.reduce((map, role) => {
            map[role.name] = role._id;
            return map;
        }, {});

        // Crear usuarios iniciales
        const usersToCreate = initialUsers.map((user) => ({
            ...user,
            role: rolesMap[user.role], // Asignar el rol correspondiente
        }));

        const createdUsers = await User.insertMany(usersToCreate);
        console.log('Usuarios creados exitosamente');

        // Crear productos iniciales asociados a los usuarios
        const productsToCreate = initialProducts.map((product, index) => ({
            ...product,
            seller: createdUsers[index % createdUsers.length]._id, // Asignar productos a los usuarios de forma cíclica
        }));

        await Product.insertMany(productsToCreate);
        console.log('Productos creados exitosamente');
    } catch (error) {
        console.error('Error inicializando la base de datos:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Desconectado de MongoDB');
    }
}

// Ejecutar la función de seed
initializeRolesPermissionsUsersAndProducts();
export default initializeRolesPermissionsUsersAndProducts;

// import mongoose from 'mongoose';
// import Permission from '../models/Permission.mjs';
// import Role from '../models/Role.mjs';
// import User from '../models/User.mjs';
// import Product from '../models/ProductN.mjs';
// import dotenv from 'dotenv';
// import connectDB from '../config/database.mjs';

// dotenv.config();

// const initialPermissions = [
//     { name: 'read:superheros', description: 'Puede ver superhéroes' },
//     { name: 'create:superheros', description: 'Puede crear superhéroes' },
//     { name: 'update:superheros', description: 'Puede actualizar superhéroes' },
//     { name: 'delete:superheros', description: 'Puede eliminar superhéroes' },
// ];

// const initialRoles = [
//     {
//         name: 'user',
//         description: 'Usuario básico',
//         permissions: ['read:superheros'],
//     },
//     {
//         name: 'editor',
//         description: 'Editor de contenido',
//         permissions: ['read:superheros', 'create:superheros', 'update:superheros'],
//     },
//     {
//         name: 'admin',
//         description: 'Administrador del sistema',
//         permissions: ['read:superheros', 'create:superheros', 'update:superheros', 'delete:superheros'],
//     },
// ];

// const initialUsers = [
//     {
//         username: 'admin',
//         email: 'admin@example.com',
//         password: 'admin123', // En un entorno real, asegúrate de encriptar las contraseñas
//         role: 'admin',
//     },
//     {
//         username: 'seller1',
//         email: 'seller1@example.com',
//         password: 'seller123',
//         role: 'user',
//     },
//     {
//         username: 'seller2',
//         email: 'seller2@example.com',
//         password: 'seller123',
//         role: 'user',
//     },
// ];

// const initialProducts = [
//     {
//         name: 'Producto 1',
//         price: 100,
//         image: 'https://example.com/product1.jpg',
//         description: 'Descripción del producto 1',
//     },
//     {
//         name: 'Producto 2',
//         price: 200,
//         image: 'https://example.com/product2.jpg',
//         description: 'Descripción del producto 2',
//     },
//     {
//         name: 'Producto 3',
//         price: 300,
//         image: 'https://example.com/product3.jpg',
//         description: 'Descripción del producto 3',
//     },
// ];

// async function initializeRolesPermissionsUsersAndProducts() {
//     try {
//         await connectDB();
//         console.log('Conectado a MongoDB');

//         // Limpiar colecciones existentes
//         await Permission.deleteMany({});
//         await Role.deleteMany({});
//         await User.deleteMany({});
//         await Product.deleteMany({});
//         console.log('Colecciones limpiadas');

//         // Crear permisos
//         const createdPermissions = await Permission.insertMany(initialPermissions);
//         console.log('Permisos creados exitosamente');

//         // Crear mapa de permisos
//         const permissionsMap = createdPermissions.reduce((map, permission) => {
//             map[permission.name] = permission._id;
//             return map;
//         }, {});

//         // Crear roles con referencias a permisos
//         const rolesToCreate = initialRoles.map((role) => ({
//             name: role.name,
//             description: role.description,
//             permissions: role.permissions.map((permName) => permissionsMap[permName]),
//         }));

//         const createdRoles = await Role.insertMany(rolesToCreate);
//         console.log('Roles creados exitosamente');

//         // Crear mapa de roles
//         const rolesMap = createdRoles.reduce((map, role) => {
//             map[role.name] = role._id;
//             return map;
//         }, {});

//         // Crear usuarios iniciales
//         const usersToCreate = initialUsers.map((user) => ({
//             ...user,
//             role: rolesMap[user.role], // Asignar el rol correspondiente
//         }));

//         const createdUsers = await User.insertMany(usersToCreate);
//         console.log('Usuarios creados exitosamente');

//         // Crear productos iniciales asociados a los usuarios
//         const productsToCreate = initialProducts.map((product, index) => ({
//             ...product,
//             seller: createdUsers[index % createdUsers.length]._id, // Asignar productos a los usuarios de forma cíclica
//         }));

//         await Product.insertMany(productsToCreate);
//         console.log('Productos creados exitosamente');
//     } catch (error) {
//         console.error('Error inicializando roles, permisos, usuarios y productos:', error);
//     } finally {
//         await mongoose.disconnect();
//     }
// }

// initializeRolesPermissionsUsersAndProducts();
// export default initializeRolesPermissionsUsersAndProducts;
// import mongoose from 'mongoose';
// import Permission from '../models/Permission.mjs';
// import Role from '../models/Role.mjs';
// import dotenv from 'dotenv';
// import connectDB from '../config/database.mjs';

// dotenv.config();

// const initialProduct = [

// ]

// const initialPermissions = [
//     {
//         name: 'read:superheros',
//         description: 'Puede ver superhéroes',
//     },
//     {
//         name: 'create:superheros',
//         description: 'Puede crear superhéroes',
//     },
//     {
//         name: 'update:superheros',
//         description: 'Puede actualizar superhéroes',
//     },
//     {
//         name: 'delete:superheros',
//         description: 'Puede eliminar superhéroes',
//     },
// ];

// const initialRoles = [
//     {
//         name: 'user',
//         description: 'Usuario básico',
//         permissions: ['read:superheros'],
//     },
//     {
//         name: 'editor',
//         description: 'Editor de contenido',
//         permissions: ['read:superheros', 'create:superheros', 'update:superheros'],
//     },
//     {
//         name: 'admin',
//         description: 'Administrador del sistema',
//         permissions: ['read:superheros', 'create:superheros', 'update:superheros', 'delete:superheros'],
//     },
// ];

// async function initializeRolesAndPermissions() {
//     try {
//         await connectDB();
//         console.log('Conectado a MongoDB');

//         // Limpiar colecciones existentes
//         await Permission.deleteMany({});
//         await Role.deleteMany({});
//         console.log('Colecciones limpiadas');

//         // Crear permisos
//         const createdPermissions = await Permission.insertMany(initialPermissions);
//         console.log('Permisos creados exitosamente');

//         // Crear mapa de permisos
//         const permissionsMap = createdPermissions.reduce((map, permission) => {
//             map[permission.name] = permission._id;
//             return map;
//         }, {});

//         // Crear roles con referencias a permisos
//         const rolesToCreate = initialRoles.map((role) => ({
//             name: role.name,
//             description: role.description,
//             permissions: role.permissions.map((permName) => permissionsMap[permName]),
//         }));

//         await Role.insertMany(rolesToCreate);
//         console.log('Roles creados exitosamente');
//     } catch (error) {
//         console.error('Error inicializando roles y permisos:', error);
//     } finally {
//         await mongoose.disconnect();
//     }
// }

// initializeRolesAndPermissions();
// export default initializeRolesAndPermissions;
// // const mongoose = require('mongoose');
// // const Permission = require('../models/Permission');
// // const Role = require('../models/Role');
// // require('dotenv').config();
// // const connectDB = require('../config/database');



// // const initialPermissions = [
// //     {
// //         name: 'read:superheros',
// //         description: 'Puede ver superhéroes'
// //     },
// //     {
// //         name: 'create:superheros',
// //         description: 'Puede crear superhéroes'
// //     },
// //     {
// //         name: 'update:superheros',
// //         description: 'Puede actualizar superhéroes'
// //     },
// //     {
// //         name: 'delete:superheros',
// //         description: 'Puede eliminar superhéroes'
// //     }
// // ];

// // const initialRoles = [
// //     {
// //         name: 'user',
// //         description: 'Usuario básico',
// //         permissions: ['read:superheros']
// //     },
// //     {
// //         name: 'editor',
// //         description: 'Editor de contenido',
// //         permissions: ['read:superheros', 'create:superheros', 'update:superheros']
// //     },
// //     {
// //         name: 'admin',
// //         description: 'Administrador del sistema',
// //         permissions: ['read:superheros', 'create:superheros', 'update:superheros', 'delete:superheros']
// //     }
// // ];

// // async function initializeRolesAndPermissions() {
// //     try {
// //         await connectDB()
// //         console.log('Conectado a MongoDB');

// //         // Limpiar colecciones existentes
// //         await Permission.deleteMany({});
// //         await Role.deleteMany({});
// //         console.log('Colecciones limpiadas');

// //         // Crear permisos
// //         const createdPermissions = await Permission.insertMany(initialPermissions);
// //         console.log('Permisos creados exitosamente');

// //         // Crear mapa de permisos
// //         const permissionsMap = createdPermissions.reduce((map, permission) => {
// //             map[permission.name] = permission._id;
// //             return map;
// //         }, {});

// //         // Crear roles con referencias a permisos
// //         const rolesToCreate = initialRoles.map(role => ({
// //             name: role.name,
// //             description: role.description,
// //             permissions: role.permissions.map(permName => permissionsMap[permName])
// //         }));

// //         await Role.insertMany(rolesToCreate);
// //         console.log('Roles creados exitosamente');

// //     } catch (error) {
// //         console.error('Error inicializando roles y permisos:', error);
// //     } finally {
// //         await mongoose.disconnect();
// //     }
// // }

// // initializeRolesAndPermissions();