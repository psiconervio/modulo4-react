// scripts/seedDatabase.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

// Modelos
const User = require("../models/User");
const Product = require("../models/Product");
const Role = require("../models/Role");
const Permission = require("../models/Permission");
const Cart = require("../models/Cart");
const Category = require("../models/Category");

dotenv.config();

class DatabaseSeeder {
  constructor() {
    this.roles = [];
    this.permissions = [];
    this.categories = [];
    this.users = [];
  }

  async connect() {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("✅ Conectado a MongoDB");
      await this.cleanDatabase();
      await this.runSeeds();
    } catch (error) {
      console.error("❌ Error de conexión:", error);
      process.exit(1);
    }
  }

  async cleanDatabase() {
    console.log("🧹 Limpiando base de datos...");
    await Promise.all([
      User.deleteMany(),
      Role.deleteMany(),
      Permission.deleteMany(),
      Product.deleteMany(),
      Cart.deleteMany(),
      Category.deleteMany(),
    ]);
    console.log("✅ Base de datos limpia");
  }

  async runSeeds() {
    try {
      // 1. Crear permisos
      await this.createPermissions();

      // 2. Crear roles
      await this.createRoles();

      // 3. Asignar permisos a roles
      await this.assignPermissionsToRoles();

      // 4. Crear categorías
      await this.createCategories();

      // 5. Crear usuarios
      await this.createUsers();

      // 6. Crear productos
      await this.createProducts();

      console.log("🚀 Semilla completada exitosamente");
      process.exit(0);
    } catch (error) {
      console.error("❌ Error en la semilla:", error);
      process.exit(1);
    }
  }

  async createPermissions() {
    console.log("🔐 Creando permisos...");
    const permissions = [
      { name: "manage_products", description: "Puede gestionar productos" },
      { name: "manage_orders", description: "Puede gestionar órdenes" },
      { name: "manage_users", description: "Puede gestionar usuarios" },
      { name: "purchase_products", description: "Puede comprar productos" },
      { name: "write_reviews", description: "Puede escribir reseñas" },
    ];

    this.permissions = await Permission.insertMany(permissions);
    console.log("✅ Permisos creados");
  }

  async createRoles() {
    console.log("👥 Creando roles...");
    const roles = [
      {
        name: "admin",
        description: "Administrador del sistema",
      },
      {
        name: "seller",
        description: "Vendedor de productos",
      },
      {
        name: "user",
        description: "Usuario normal",
      },
    ];

    this.roles = await Role.insertMany(roles);
    console.log("✅ Roles creados");
  }

  async assignPermissionsToRoles() {
    console.log("🔗 Asignando permisos...");

    // Admin: Todos los permisos
    await Role.updateOne(
      { name: "admin" },
      { $set: { permissions: this.permissions.map((p) => p._id) } }
    );

    // Seller: Gestionar productos y órdenes
    const sellerPerms = this.permissions.filter((p) =>
      ["manage_products", "manage_orders"].includes(p.name)
    );
    await Role.updateOne(
      { name: "seller" },
      { $set: { permissions: sellerPerms.map((p) => p._id) } }
    );

    // User: Comprar productos y escribir reseñas
    const userPerms = this.permissions.filter((p) =>
      ["purchase_products", "write_reviews"].includes(p.name)
    );
    await Role.updateOne(
      { name: "user" },
      { $set: { permissions: userPerms.map((p) => p._id) } }
    );

    console.log("✅ Permisos asignados");
  }

  async createCategories() {
    console.log("📦 Creando categorías...");
    const categories = [
      { name: "Electrónica", description: "Dispositivos electrónicos" },
      { name: "Ropa", description: "Prendas de vestir" },
      { name: "Hogar", description: "Artículos para el hogar" },
    ];

    this.categories = await Category.insertMany(categories);
    console.log("✅ Categorías creadas");
  }

  async createUsers() {
    console.log("👤 Creando usuarios...");

    // En la sección de creación de usuarios:
    const users = [
      {
        username: "admin", // <-- Agrega este campo
        name: "Admin Principal",
        email: "admin@marketplace.com",
        password: await bcrypt.hash("Admin123!", 10),
        roles: [this.roles.find((r) => r.name === "admin")._id],
      },
      {
        username: "seller", // <-- Agrega este campo
        name: "Vendedor Ejemplo",
        email: "seller@marketplace.com",
        password: await bcrypt.hash("Seller123!", 10),
        roles: [this.roles.find((r) => r.name === "seller")._id],
      },
      {
        username: "user123", // <-- Agrega este campo
        name: "Usuario Normal",
        email: "user@marketplace.com",
        password: await bcrypt.hash("User123!", 10),
        roles: [this.roles.find((r) => r.name === "user")._id],
      },
    ];

    this.users = await User.insertMany(users);
    console.log("✅ Usuarios creados");
  }

  async createProducts() {
    console.log("🛍️ Creando productos...");

    const sellerUser = this.users.find(
      (u) => u.email === "seller@marketplace.com"
    );
    const electronicsCategory = this.categories.find(
      (c) => c.name === "Electrónica"
    );

    const products = [
      {
        name: "Smartphone X200",
        price: 599.99,
        description: "Último modelo con cámara 108MP",
        seller: sellerUser._id,
        category: electronicsCategory._id,
        stock: 50,
        images: ["phone1.jpg", "phone2.jpg"],
      },
      {
        name: "Laptop Pro",
        price: 1299.99,
        description: "Laptop para profesionales",
        seller: sellerUser._id,
        category: electronicsCategory._id,
        stock: 25,
        images: ["laptop1.jpg"],
      },
    ];

    await Product.insertMany(products);
    console.log("✅ Productos creados");
  }
}

// Ejecutar seeder
new DatabaseSeeder().connect();
