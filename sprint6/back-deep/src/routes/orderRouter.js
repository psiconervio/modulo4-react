const express = require("express");
const router = express.Router();

// Definir rutas para órdenes
router.get("/", (req, res) => {
  res.json({ message: "Lista de órdenes" });
});

module.exports = router;