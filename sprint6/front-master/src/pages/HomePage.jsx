import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductGrid from "../components/ProductGrid";
// import CategoryFilter from '../components/CategoryFilter'
// import PriceFilter from '../components/PriceFilter'
import { useProducts } from "../context/ProductsContext";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const HomePage = () => {
  const { products, isLoading } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const {theme} =useTheme()
  const { user } = useAuth();

  // useEffect(() => {
  //   if (products.length > 0) {
  //     let filtered = [...products];
  //     setFilteredProducts(filtered);
  //   }
  // }, [products, selectedCategory]);
useEffect(() => {
  if (products?.length > 0) {
    // Filtrar productos que tengan un seller definido
    let filtered = products.filter((product) => product.seller);
    setFilteredProducts(filtered);
  }
}, [products, selectedCategory]);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loading-spinner h-12 w-12"></div>
      </div>
    );
  }

  return (
    <div className="max-w mx-auto relative">
      <div className="flex flex-col md:flex-row md:space-x-6">
        <div className="flex-1">
          <div className="md:hidden mb-8">
            <h2 className="text-2xl font-semibold">Todos los Productos</h2>
          </div>
          {user ? (
            <div className={`mb-12 rounded-lg p-2 ${theme === 'dark'? 'bg-gray-900':'bg-gray-200' }`}>
              <ProductGrid
                products={filteredProducts}
                emptyMessage="No hay productos cargados"
              />
            </div>
          ) : (
            <>
              <div>
                <h1 className="text-2xl font-semibold items-center justify-center">
                  Bienvenido a market place
                </h1>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
