const express = require("express");
const router = express.Router();

// Definir rutas para productos
router.get("/", (req, res) => {
  res.json({ message: "Lista de productos" });
});

module.exports = router;
// const express = require("express");
// const router = express.Router();
// const productController = require("../controllers/productController");
// const authMiddleware = require("../middleware/authMiddleware");

// router
//   .route("/")
//   .get(productController.getProducts)
//   .post(
//     authMiddleware.protect,
//     authMiddleware.checkRole(["seller", "admin"]),
//     productController.createProduct
//   );

// module.exports = router;
