import { createContext, useState, useContext, useEffect } from "react";
import { MOCK_PRODUCTS } from "../data/mockData";
import { getProducts } from "../data/apis";
import { useAuth } from "../context/AuthContext";

const ProductsContext = createContext(null);

export const ProductsProvider = ({ children }) => {
  const { currentUser, isAuthenticated } = useAuth();
  const [products, setProducts] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch products from API
    console.log("isAuthenticated", isAuthenticated);
    if (isAuthenticated) {
      const productos = async () => {
        try {
          const response = await getProducts();
          setProducts(response.data.data);
          localStorage.setItem("products", JSON.stringify(response.data.data));
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
      productos();
    } else {
      console.log("No hay usuario logueado");
      setProducts([]);
    }
  }, [isAuthenticated]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     // Load saved items from localStorage
  //     // const saved = localStorage.getItem("savedItems");
  //     // if (saved) {
  //     //   setSavedItems(JSON.parse(saved));
  //     // }
  //     setIsLoading(false);
  //   }, 500);
  // }, []);

  // Save or unsave a product
  const toggleSaveProduct = (productId) => {
    let updatedSavedItems = [...savedItems];

    if (savedItems.includes(productId)) {
      updatedSavedItems = savedItems.filter((id) => id !== productId);
    } else {
      updatedSavedItems.push(productId);
    }

    setSavedItems(updatedSavedItems);
    localStorage.setItem("savedItems", JSON.stringify(updatedSavedItems));
  };

  // Check if a product is saved
  const isProductSaved = (productId) => {
    return savedItems.includes(productId);
  };

  // Find a product by ID
  const getProductById = (productId) => {
    return products.find((product) => product._id === productId);
  };

  // Search products by term
  const searchProducts = (searchTerm, filters = {}) => {
    if (!searchTerm && Object.keys(filters).length === 0) {
      return products;
    }

    return products.filter((product) => {
      // Search term filtering
      const matchesSearch = searchTerm
        ? product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
        : true;

      // Category filtering
      const matchesCategory = filters.category
        ? product.category === filters.category
        : true;

      // Price filtering
      const matchesPrice = filters.maxPrice
        ? product.price <= filters.maxPrice
        : true;

      return matchesSearch && matchesCategory && matchesPrice;
    });
  };

  const value = {
    products,
    // isLoading,
    savedItems,
    toggleSaveProduct,
    isProductSaved,
    getProductById,
    searchProducts,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
export const useProducts = () => useContext(ProductsContext);

// import { createContext, useState, useContext, useEffect } from 'react'
// import { MOCK_PRODUCTS } from '../data/mockData'

// const ProductsContext = createContext(null)

// export const useProducts = () => useContext(ProductsContext)

// export const ProductsProvider = ({ children }) => {
//   const [products, setProducts] = useState([])
//   const [savedItems, setSavedItems] = useState([])
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     // Simulate API fetch
//     setTimeout(() => {
//       setProducts(MOCK_PRODUCTS)

//       // Load saved items from localStorage
//       const saved = localStorage.getItem('savedItems')
//       if (saved) {
//         setSavedItems(JSON.parse(saved))
//       }

//       setIsLoading(false)
//     }, 500)
//   }, [])

//   // Save or unsave a product
//   const toggleSaveProduct = (productId) => {
//     let updatedSavedItems = [...savedItems]

//     if (savedItems.includes(productId)) {
//       updatedSavedItems = savedItems.filter(id => id !== productId)
//     } else {
//       updatedSavedItems.push(productId)
//     }

//     setSavedItems(updatedSavedItems)
//     localStorage.setItem('savedItems', JSON.stringify(updatedSavedItems))
//   }

//   // Check if a product is saved
//   const isProductSaved = (productId) => {
//     return savedItems.includes(productId)
//   }

//   // Find a product by ID
//   const getProductById = (productId) => {
//     return products.find(product => product.id === productId)
//   }

//   // Search products by term
//   const searchProducts = (searchTerm, filters = {}) => {
//     if (!searchTerm && Object.keys(filters).length === 0) {
//       return products
//     }

//     return products.filter(product => {
//       // Search term filtering
//       const matchesSearch = searchTerm ?
//         product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         product.description.toLowerCase().includes(searchTerm.toLowerCase()) :
//         true

//       // Category filtering
//       const matchesCategory = filters.category ?
//         product.category === filters.category :
//         true

//       // Price filtering
//       const matchesPrice = filters.maxPrice ?
//         product.price <= filters.maxPrice :
//         true

//       return matchesSearch && matchesCategory && matchesPrice
//     })
//   }

//   const value = {
//     products,
//     isLoading,
//     savedItems,
//     toggleSaveProduct,
//     isProductSaved,
//     getProductById,
//     searchProducts
//   }

//   return (
//     <ProductsContext.Provider value={value}>
//       {children}
//     </ProductsContext.Provider>
//   )
// }
