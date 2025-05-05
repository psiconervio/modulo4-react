import productService from "../services/ProductService.mjs";

// Obtener todos los productos
export const getAllProducts = async (req, res) => {
  try {
    // const { page = 1, limit = 10 } = req.query;
    const products = await productService.getAll(
      // parseInt(page),
      // parseInt(limit)
    );
    res.json(products);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ message: "Error al obtener productos" });
  }
};

// Obtener un producto por su ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productService.getById(id);
    res.json(product);
  } catch (error) {
    console.error("Error al obtener producto:", error);
    res.status(404).json({ message: error.message });
  }
};

// Crear un nuevo producto
export const createProduct = async (req, res) => {
  try {
    const productData = { ...req.body, seller: req.user.id }; // Asociar el producto al usuario autenticado
    const product = await productService.create(productData);
    res.status(201).json(product);
  } catch (error) {
    console.error("Error al crear producto:", error);
    res.status(400).json({ message: "Error al crear producto" });
  }
};
export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await productService.getByCategory(category);
    res.json(products);
  } catch (error) {
    console.error("Error al obtener productos por categoría:", error);
    res
      .status(500)
      .json({ message: "Error al obtener productos por categoría" });
  }
};

export const deleteProductbyid = async (req, res) => {
  try {
    const { id } = req.params;
    await productService.delete(id);
    res.json({ message: "Producto eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    res.status(404).json({ message: error.message });
  }
};
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const productData = req.body;
    const updatedProduct = await productService.update(id, productData);
    res.json(updatedProduct);
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    res.status(404).json({ message: error.message });
  }
};
// import productService from '../services/ProductService.mjs';

// // Obtener todos los productos
// export const getAllProducts = async (req, res) => {
//     try {
//         const { page = 1, limit = 10 } = req.query;
//         const products = await productService.getAll(parseInt(page), parseInt(limit));
//         res.json(products);
//     } catch (error) {
//         console.error('Error al obtener productos:', error);
//         res.status(500).json({ message: 'Error al obtener productos' });
//     }
// };

// // Obtener un producto por su ID
// export const getProductById = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const product = await productService.getById(id);
//         res.json(product);
//     } catch (error) {
//         console.error('Error al obtener producto:', error);
//         res.status(404).json({ message: error.message });
//     }
// };

// // Crear un nuevo producto
// export const createProduct = async (req, res) => {
//     try {
//         const productData = req.body;
//         const product = await productService.create(productData);
//         res.status(201).json(product);
//     } catch (error) {
//         console.error('Error al crear producto:', error);
//         res.status(400).json({ message: 'Error al crear producto' });
//     }
// };

// // Actualizar un producto existente
// export const updateProduct = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const productData = req.body;
//         const updatedProduct = await productService.update(id, productData);
//         res.json(updatedProduct);
//     } catch (error) {
//         console.error('Error al actualizar producto:', error);
//         res.status(404).json({ message: error.message });
//     }
// };

// // Eliminar un producto por su ID
// export const deleteProduct = async (req, res) => {
//     try {
//         const { id } = req.params;
//         await productService.delete(id);
//         res.json({ message: 'Producto eliminado exitosamente' });
//     } catch (error) {
//         console.error('Error al eliminar producto:', error);
//         res.status(404).json({ message: error.message });
//     }
// };
