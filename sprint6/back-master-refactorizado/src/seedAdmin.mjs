// seedAdmin.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User.mjs";
import Role from "./models/Role.mjs";
import dotenv from "dotenv";

dotenv.config();

async function seedAdmin() {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // 1) Crea o encuentra el rol “admin”
  let adminRole = await Role.findOne({ name: "admin" });
  if (!adminRole) {
    adminRole = await Role.create({
      name: "admin",
      permissions: [
        "create:product",
        "read:product",
        "update:product",
        "delete:product",
      ],
    });
    console.log("Rol admin creado:", adminRole._id);
  } else {
    console.log("Rol admin ya existe:", adminRole._id);
  }

  // 2) Crea el usuario admin
  const existingAdmin = await User.findOne({ email: "admin@tudominio.com" });
  if (existingAdmin) {
    console.log("El usuario admin ya existe:", existingAdmin._id);
  } else {
    const hashedPassword = await bcrypt.hash("TuPasswordSuperSecreto", 10);
    const adminUser = await User.create({
      username: "usuarioadmin1 ",
      email: "admin@tudominio.com",
      password: hashedPassword,
      role: adminRole._id,
    });
    console.log("Usuario admin creado:", adminUser._id);
  }

  process.exit(0);
}

seedAdmin().catch((err) => {
  console.error("Error al crear semilla de admin:", err);
  process.exit(1);
});

// // seedAdmin.js
// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";
// import User from "./models/User.mjs";
// import Role from "./models/Role.mjs";
// import dotenv from "dotenv";
// dotenv.config();

// async function seed() {
//   await mongoose.connect(process.env.MONGO_URI);

//   // 1) Asegúrate de que exista el rol “admin”
//   let adminRole = await Role.findOne({ name: "admin" });
//   if (!adminRole) {
//     adminRole = await Role.create({
//       name: "admin",
//       permissions: [
//         "create:product",
//         "read:product",
//         "update:product",
//         "delete:product",
//         // …otros permisos que quieras dar a los admins
//       ],
//     });
//     console.log("Rol admin creado:", adminRole._id);
//   }

//   // 2) Crea el usuario con ese rol
//   const hashed = await bcrypt.hash("TuPasswordSuperSecreto", 10);
//   const adminUser = await User.create({
//     username: "usuarioadmin",
//     email:    "admin@tudominio.com",
//     password: hashed,
//     role:     adminRole._id,
//   });
//   console.log("Usuario admin creado:", adminUser._id);

//   process.exit(0);
// }

// seed().catch((err) => {
//   console.error(err);
//   process.exit(1);
// });
