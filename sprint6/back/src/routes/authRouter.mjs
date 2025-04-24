import express from "express";
import { register, login } from "../controllers/authController.mjs";
import { promote } from "../controllers/authController.mjs";
import { authenticateToken, hasPermission } from '../middleware/authMiddleware.mjs';

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// Sólo quien tenga el permiso 'promote_user' podrá promocionar
router.put(
    '/users/:id/promote',
    authenticateToken,
    hasPermission('promote_user'),
    promote
  );
export default router;
//creamos las rutas
// const express = require('express');
// const router = express.Router();
// const { register } = require('../controllers/authController');
// const { login } = require('../controllers/authController');

// router.post('/register', register);
// router.post('/login', login);

// module.exports = router;
