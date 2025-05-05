import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useProducts } from "../context/ProductsContext";
import ProductGrid from "../components/ProductGrid";
import { FaUser, FaShoppingCart, FaEdit, FaPlusCircle } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

const ProfilePage = () => {
  const { theme } = useTheme();
  const { currentUser, isAhutenticated, user } = useAuth();
  const { products, isLoading } = useProducts();
  const [userProducts, setUserProducts] = useState([]);

  useEffect(() => {
    console.log('PRODUCTS',products)
    console.log("currentUser", currentUser);
    console.log("isAuthenticated", isAhutenticated);
    console.log("usuario", user.username);
    console.log("usuariooo", products.username);
    const storedUser = localStorage.getItem("user");

    if (!isLoading && products.length > 0 && user) {
      const userListings = products.filter(
        (products) => products.seller.username === user.username
      );
      console.log('lista',userListings)
      setUserProducts(userListings);
      console.log('lista',userListings)

    }
  }, [products, currentUser, isLoading]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fb-blue"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Profile header */}
      <div
        className={`rounded-lg shadow-md p-6 mb-6 ${
          theme === "dark" ? "bg-slate-800" : "bg-slate-500"
        }`}
      >
        <div className="flex flex-col sm:flex-row items-center">
          <img
            // src={currentUser.avatar}
            // alt={currentUser.name}
            className="w-24 h-24 rounded-full mb-4 sm:mb-0 sm:mr-6"
          />

          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold">{user.username}</h1>
            <p className="text-gray-600">{user.email}</p>

            <div className="mt-3 flex justify-center sm:justify-start space-x-3">
              <button className="btn-secondary flex items-center">
                <FaEdit className="mr-2" /> Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* User's listings */}
      <div className={` rounded-lg shadow-md p-6 ${theme === 'dark' ? 'bg-slate-700':'bg-slate-400'}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Tu lista de Productos</h2>
          <Link to="/create-listing" className="btn-primary flex items-center">
            <FaPlusCircle className="mr-2" /> Nueva Publicacion
          </Link>
        </div>

        {userProducts.length === 0 ? (
          <div className="text-center py-10">
            <div className="text-fb-blue text-5xl mb-4">
              <FaShoppingCart />
            </div>
            <h3 className="text-xl font-bold mb-2">Sin productos</h3>
            <p className="text-gray-600 mb-6">
              Start selling items to people in your community.
            </p>
            <Link to="/create-listing" className="btn-primary">
              Create Your First Listing
            </Link>
          </div>
        ) : (
          <ProductGrid
            products={userProducts}
            emptyMessage="You haven't created any listings yet."
          />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
