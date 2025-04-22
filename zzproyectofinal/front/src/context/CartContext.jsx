import { createContext, useState, useEffect } from "react";

// creamos el contexto del carrito
export const CartContext = createContext();

// definimos el proveedor del contexto del carrito
export const CartProvider = ({ children }) => {
  // Estado del carrito, inicializado con los datos del localStorage o un array vacío
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  // efecto que guarda el carrito en el localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // funcion para agregar un producto al carrito
  const addToCart = (product) => {
    setCart((prevCart) => {
      // buscamos si el producto ya está en el carrito
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        // si el producto ya esta incrementamos su cantidad
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Si el producto no está, lo agregamos con cantidad 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // funcion para eliminar un producto del carrito por su id
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((product) => product.id !== id));
  };

  const removeAll =() => {
    setCart([]);
  }
  //legacy
  // const updateQuantity = (id, quantity) => {
  //   setCart((prevCart) =>
  //     prevCart.map((product) =>
  //       product.id === id ? { ...product, quantity: Math.max(1, quantity) } : product
  //     )
  //   );
  // };

  // funcion para actualizar la cantidad de un producto en el carrito
  const updateQuantity = (id, delta) => {
    setCart((prevCart) =>
      // mapeamos el carrito actual para encontrar el producto con el id dado
      prevCart.map((product) =>
        // Si encontramos el producto, actualizamos su cantidad sumando el delta
        product.id === id
          ? { ...product, quantity: Math.max(1, product.quantity + delta) }
          // Si no es el producto que buscamos, lo dejamos igual
          : product
      )
    );
  };



  // Calculamos el precio total del carrito
  const totalPrice = cart.reduce((total, product) => total + product.price * product.quantity, 0);

  // Retornamos el proveedor del contexto con los valores y funciones del carrito
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, totalPrice, removeAll }}>
      {children}
    </CartContext.Provider>
  );
};



















// import { createContext, useState, useEffect } from "react";

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState(() => {
//     return JSON.parse(localStorage.getItem("cart")) || [];
//   });

//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart]);

//   const addToCart = (product) => {
//     setCart((prevCart) => {
//       const existingProduct = prevCart.find((item) => item.id === product.id);
//       if (existingProduct) {
//         return prevCart.map((item) =>
//           item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
//         );
//       } else {
//         return [...prevCart, { ...product, quantity: 1 }];
//       }
//     });
//   };

//   const removeFromCart = (id) => {
//     setCart((prevCart) => prevCart.filter((product) => product.id !== id));
//   };

//   const updateQuantity = (id, delta) => {
//     setCart((prevCart) =>
//       prevCart.map((product) =>
//         product.id === id
//           ? { ...product, quantity: Math.max(1, product.quantity + delta) }
//           : product
//       )
//     );
//   };
//   const totalPrice = cart.reduce((total, product) => total + product.price * product.quantity, 0);

//   return (
//     <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, totalPrice }}>
//       {children}
//     </CartContext.Provider>
//   );
// };



