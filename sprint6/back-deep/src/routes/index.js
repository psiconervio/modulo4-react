const express = require("express");
const router = express.Router();

// Importar otras rutas
const productRouter = require("./productRouter");
const cartRouter = require("./cartRouter");
const orderRouter = require("./orderRouter");

// Configurar rutas
router.use("/products", productRouter);
router.use("/cart", cartRouter);
router.use("/orders", orderRouter);

module.exports = router;
// const express = require('express');
// const router = express.Router();
// const superheroRouter = require('./superheroRouter');
// const authRouter = require('./authRouter');

// router.use('/superheros', superheroRouter);
// router.use('/auth', authRouter);

// module.exports = router;