import express from "express";
import {
  register,
  login,
  updateUser,
  deleteUser,
  getAllUsers,
} from "../controllers/authController.mjs";
import {
  authenticateToken,
  hasPermission,
} from "../middleware/authMiddleware.mjs";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/users/:userId", authenticateToken, updateUser);
router.delete("/users/:userId", authenticateToken, deleteUser);
router.get("/users", authenticateToken, getAllUsers);
router.get("/users", authenticateToken, getAllUsers);

export default router;
// //creamos las rutas
// const express = require('express');
// const router = express.Router();
// const { register } = require('../controllers/authController');
// const { login } = require('../controllers/authController');

// router.post('/register', register);
// router.post('/login', login);

// module.exports = router;
