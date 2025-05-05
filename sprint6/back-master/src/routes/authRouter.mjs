import express from "express";
import { register, login, updateUser } from "../controllers/authController.mjs";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/users/:userId", updateUser);

export default router;
// //creamos las rutas
// const express = require('express');
// const router = express.Router();
// const { register } = require('../controllers/authController');
// const { login } = require('../controllers/authController');

// router.post('/register', register);
// router.post('/login', login);

// module.exports = router;
