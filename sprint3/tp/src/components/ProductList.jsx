import { useContext } from "react";
import { CartContext } from "../context/CartContext"; // Ajusta la ruta si es necesario

const products = [
  { id: 1, name: "Laptop", price: 1000 },
  { id: 2, name: "Auriculares", price: 200 },
  { id: 3, name: "Mouse", price: 50 }
];

const ProductList = () => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="text-white items-center">
      <h2>Lista de Productos</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <button onClick={() => addToCart(product)}>Agregar al carrito</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
