import express from "express";
import superheroRouter from "./superheroRouter.mjs";
import authRouter from "./authRouter.mjs";
import chatRoutes from "./ChatRouter.mjs"; // Importar las rutas de chat

const router = express.Router();
router.use("/messages", chatRoutes);

router.use("/superheros", superheroRouter);
router.use("/auth", authRouter);

export default router;
// const express = require('express');
// const router = express.Router();
// const superheroRouter = require('./superheroRouter');
// const authRouter = require('./authRouter');

// router.use('/superheros', superheroRouter);
// router.use('/auth', authRouter);

// module.exports = router;
