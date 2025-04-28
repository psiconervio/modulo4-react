const express = require("express");
const router = express.Router();

// Definir rutas para el carrito
router.get("/", (req, res) => {
  res.json({ message: "Carrito de compras" });
});

module.exports = router;