import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

export const Cart = ({ isModalOpenCart, setIsModalOpenCart }) => {
  // desestructuracion de cartcontext, para usar funciones que manejan el cart
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    totalPrice,
    removeAll,
  } = useContext(CartContext);

  if (!isModalOpenCart) return null;
  //funcion para cerrar el modal
  const onClose = () => setIsModalOpenCart(false); // cerrar modal

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 w-11/12 max-w-md relative rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Cart</h2>
        {cart.length === 0 ? (
          <p className="text-center">No hay productos</p>
        ) : (
          cart.map((product) => (
            <div className="my-4" key={product.id}>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{product.name}</p>
                  <p className="text-gray-600">${product.price}</p>
                </div>
                <div className="flex items-center">
                  <button
                    className="bg-gray-200 px-2 py-1 rounded-l"
                    onClick={() => updateQuantity(product.id, 1)}
                  >
                    +
                  </button>
                  <span className="px-4">{product.quantity}</span>
                  <button
                    className="bg-gray-200 px-2 py-1 rounded-r"
                    onClick={() => updateQuantity(product.id, -1)}
                  >
                    -
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center mt-2">
                <p className="text-gray-600">
                  Subtotal: ${product.price * product.quantity}
                </p>
                <div>
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => addToCart(product)}
                  >
                    Agregar
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => removeFromCart(product.id)}
                  >
                    Remover
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
        <div className="mt-4">
          <p className="text-lg font-semibold">Total: ${totalPrice}</p>
        </div>
        <button
          className="bg-red-500 text-white px-4 py-2 mt-4 rounded"
          onClick={onClose}
        >
          Cerrar
        </button>
        <button
          className="bg-red-500 text-white px-2 py-1 rounded"
          onClick={removeAll}
        >
          Remover todo
        </button>
      </div>
    </div>
  );
};
