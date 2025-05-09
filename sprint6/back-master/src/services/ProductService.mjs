import Product from '../models/ProductN.mjs';

class ProductService {

    async getAll() {

        const products = await Product.find()
            .populate('seller', 'username email') // Incluye datos del vendedor

        return {
            data: products,

        };
    }

    // Obtener un producto por su ID
    async getById(id) {
        const product = await Product.findById(id).populate('seller', 'username email');
        if (!product) {
            throw new Error('Producto no encontrado');
        }
        return product;
    }

    // Crear un nuevo producto
    async create(productData) {
        const product = new Product(productData);
        await product.save();
        return product;
    }

    // Actualizar un producto existente
    async update(id, productData) {
        const product = await Product.findByIdAndUpdate(id, productData, { new: true });
        if (!product) {
            throw new Error('Producto no encontrado');
        }
        return product;
    }

    // Eliminar un producto por su ID
    async delete(id) {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            throw new Error('Producto no encontrado');
        }
        return product;
    }
}

export default new ProductService();
