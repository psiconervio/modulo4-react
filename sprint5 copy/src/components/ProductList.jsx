import { useContext } from "react";
import { CartContext } from "../context/CartContext"; // Ajusta la ruta si es necesario

const products = [
  { id: 1, name: "Laptop", price: 1000, img: "tienda/tienda_1" },
  { id: 2, name: "Auriculares", price: 200, img: "tienda/tienda_2" },
  { id: 3, name: "Mouse", price: 50, img: "tienda/tienda_3" },
];

const ProductList = () => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="text-white text-center p-6 bg-gray-800">
      <h2 className="text-2xl font-bold mb-4">Lista de Productos</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <li className="bg-gray-700 p-4 rounded-lg shadow-md" key={product.id}>
            <div className="flex justify-center">
              <img className="h-80" src={`/${product.img}.jpg`} alt="" />
            </div>
            <div className="text-lg font-semibold">{product.name}</div>
            <div className="text-gray-400">${product.price}</div>
            <button
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => addToCart(product)}
            >
              Agregar al carrito
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
