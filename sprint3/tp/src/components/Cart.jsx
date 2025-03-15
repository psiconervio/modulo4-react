import React,{useContext} from "react";
import { CartContext } from '../context/CartContext';

export const Cart = ({
  isModalOpenCart,
  setIsModalOpenCart,
}) => {
  const { cart, addToCart, removeFromCart, updateQuantity, totalPrice } = useContext(CartContext);

  if (!isModalOpenCart) return null;
  //funcion para cerrar el modal
  const onClose = () => setIsModalOpenCart(false); // cerrar modal

  return (
    <div className=" fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center <-50">
      <div className="bg-white p-6 w-11/12 max-wmd relative rounded-lg shadow-lg">
        Cart
        {cart.length === 0 ? (
          <p>no hay productos</p>
        ) : (
          cart.map((product) => (
            <div key={product.id}>
              <p>{product.name}</p>
              <p>{product.price}</p>
              <button onClick={()=>removeFromCart(product.id)}>remover</button>
              <button onClick={()=>updateQuantity(product.id, 1)}>+</button>
            </div>
          ))
        )}
        <p>Total: {totalPrice}</p>
        <button className="bg-gray-500 text-white px-4 py-2" onClick={onClose}>
          CERRAR{" "}
        </button>
      </div>
    </div>
  );
};
