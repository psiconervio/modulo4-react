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
  const { theme } = useTheme();
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
    <>
      <div className="max-w mx-auto relative">
        <div className="flex flex-col md:flex-row md:space-x-6">
          <div className="flex-1">
            {user ? (
              <>
                <div className="md:hidden mb-8">
                  <h2 className="text-2xl font-semibold">
                    Todos los Productos
                  </h2>
                </div>

                <div
                  className={`mb-12 rounded-lg p-2 ${
                    theme === "dark" ? "bg-gray-900" : "bg-gray-200"
                  }`}
                >
                  <ProductGrid
                    products={filteredProducts}
                    emptyMessage="No hay productos cargados"
                  />
                </div>
              </>
            ) : (
              <div className={`w-full  py-6 px-4  pt-30${theme === 'dark'?'bg-gray-900 text-white' :'bg-white text-gray-800'} `}>
                <div className="max-w-6xl mx-auto xl:mt-44 lg:mt-44">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div className="space-y-4">
                      <h1 className="text-3xl font-bold ">
                        Marketplace
                      </h1>
                      <p className="text-lg ">
                        Compra y vende artículos cerca de ti
                      </p>
                      <div className="flex flex-wrap gap-4 mt-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <circle cx="9" cy="21" r="1"></circle>
                              <circle cx="20" cy="21" r="1"></circle>
                              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                            </svg>
                          </div>
                          <span className="ml-2 text-sm text-gray-700">
                            Compras locales
                          </span>
                        </div>

                        <div className="flex items-center">
                          <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <rect
                                x="2"
                                y="7"
                                width="20"
                                height="14"
                                rx="2"
                                ry="2"
                              ></rect>
                              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                            </svg>
                          </div>
                          <span className="ml-2 text-sm text-gray-700">
                            Sin comisiones
                          </span>
                        </div>
                        <div className="flex items-center">
                          <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                            </svg>
                          </div>
                          <span className="ml-2 text-sm text-gray-700">
                            Compras seguras
                          </span>
                        </div>
                      </div>
                      <button className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                        Explorar productos
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="bg-white rounded-lg shadow overflow-hidden"
                        >
                          <div
                            className="h-24 bg-gray-200"
                            style={{
                              backgroundImage: `url(/placeholder.svg?height=100&width=150)`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                            }}
                          ></div>
                          <div className="p-2">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              Producto {i}
                            </p>
                            <p className="text-sm font-bold text-green-600">
                              $99.99
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
