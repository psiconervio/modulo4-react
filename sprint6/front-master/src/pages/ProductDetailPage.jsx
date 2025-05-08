import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";
import { useMessages } from "../context/MessagesContext";
import { useAuth } from "../context/AuthContext";
import { formatDate, getSellerById } from "../data/mockData";
import { deleteProduct } from "../data/apis";
import {
  FaBookmark,
  FaRegBookmark,
  FaMapMarkerAlt,
  FaTags,
  FaClock,
  FaArrowLeft,
  FaEdit,
} from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import { can } from "../utils/permissions";

const ProductDetailPage = () => {
  const { getProductById, isLoading, toggleSaveProduct, isProductSaved,deleteproductid } =
    useProducts();
  const { startProductConversation } = useMessages();
  const { currentUser, isAuthenticated, user } = useAuth();
  const [product, setProduct] = useState(null);
  const [seller, setSeller] = useState(null);
  const [message, setMessage] = useState("");
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const { theme } = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      console.log("currentuser", currentUser);
      console.log("isAuthenticated", isAuthenticated);
      console.log("user", user);
      const foundProduct = getProductById(id);
      if (foundProduct) {
        setProduct(foundProduct);
        const productSeller = getSellerById(foundProduct.seller);
        setSeller(productSeller);
      } else {
        navigate("/not-found");
      }
    }
  }, [id, isLoading, getProductById, navigate]);

  const handleSendMessage = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    if (message.trim() && product && seller) {
      startProductConversation(user._id, message, product);
      navigate("/messages/" + user._id);
    }
  };


  if (isLoading || !product) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fb-blue"></div>
      </div>
    );
  }


  return (
    <div className={`min-h-screen ${theme === "dark" ? "text-white" : ""}`}>
      {/* Back button */}
      <div className="mb-4">
        <button
          onClick={() => navigate(-1)}
          className={`flex items-center text-gray-600 hover:text-fb-blue ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          <FaArrowLeft
            className={`mr-2 ${theme === "dark" ? "text-white" : "text-black"}`}
          />{" "}
          Volver a las Publicaciones
        </button>
      </div>

      <div
        className={`container mx-auto p-4 rounded-lg ${
          theme === "dark" ? "bg-gray-800" : ""
        }`}
      >
        <div className="md:flex">
          {/* Product image */}
          <div className="md:w-1/2">
            <img
              src={product.image}
              // alt={product.title}
              className="w-full h-80 md:h-96 object-cover"
            />
          </div>
          <div className="md:w-1/2 p-6">
            <div
              className={`flex items-center justify-between ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              <h1
                className={`text-2xl font-bold${
                  theme === "dark" ? "text-white" : ""
                }`}
              >
                {product.name}
              </h1>

            </div>
            <p className="text-2xl font-bold text-fb-blue mt-2">${product.price}</p>
            <div
              className={`mt-4 space-y-2  ${
                theme === "dark" ? "text-white" : "text-gray-600"
              }`}
            >
              <div className="flex items-center">
                <FaTags className="mr-2" />
                <span>{product.category}</span>
              </div>
              <div className="flex items-center">
                <FaClock className="mr-2" />
                <span>Listed {formatDate(product.createdAt)}</span>
              </div>
            </div>
            <div className="border-t border-b py-4 my-4">
              <h2
                className={`font-semibold mb-2 ${
                  theme === "dark" ? "text-white" : ""
                }`}
              >
                Descripcion
              </h2>
              <p
                className={`${
                  theme === "dark" ? "text-white" : "text-gray-700"
                }`}
              >
                {product.description}
              </p>
              <div className="mt-3">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                  {product.condition}
                </span>
              </div>
            </div>
            <div className="flex items-center mt-4">
              <img
                src={user.avatar}
                // alt={seller.name}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <p className="font-medium">{user.username}</p>
                <p className="text-sm text-gray-500">Vendedor</p>
              </div>
            </div>
            <div className="mt-6">
              {user && can(user, "read:products") ? (
                <button
                  onClick={() => setIsMessageModalOpen(true)}
                  className="btn-primary w-full"
                >
                  Contactar vendedor
                </button>
              ) : (
                <button className="btn-primary w-full">
                  No tienes Permisos
                </button>
              )}
              {product.seller.username === user.username && (
                <div className="mt-3">
                  <Link
                    to={`/edit-product/${product._id}`}
                    className="btn-secondary flex items-center"
                  >
                    <FaEdit className="mr-2" /> Editar
                  </Link>
                </div>
              )}
              {product.seller.username === user.username && (
                <div className="mt-3">
                  <Link
                    className="btn-red flex items-center"
                    onClick={() => deleteproductid(`${product._id}`)}
                  >
                    <FaEdit className="mr-2" /> Eliminar Publicacion
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Message modal */}
      {isMessageModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div
            className={`rounded-lg shadow-lg w-full max-w-md ${
              theme === "dark" ? "bg-slate-800 text-white" : "bg-text-white"
            }`}
          >
            <div className="p-4 border-b">
              <h2 className="font-bold text-lg">Enviar Mensaje al Vendedor</h2>
            </div>

            <div className="p-4">
              <div className="flex items-center mb-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-16 h-16 object-cover rounded mr-3"
                />
                <div>
                  <p className="font-medium">{product.title}</p>
                  <p className="text-fb-blue font-bold">${product.price}</p>
                </div>
              </div>
              <textarea
                className={`w-full  border rounded-lg p-3 focus:ring focus:ring-fb-blue focus:ring-opacity-50 ${
                  theme === "dark" ? "bg-slate-700" : "bg-slate-300"
                }`}
                rows="4"
                placeholder="Ask about this product..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <div className="flex justify-end mt-4 space-x-3">
                <button
                  onClick={() => setIsMessageModalOpen(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendMessage}
                  className="btn-primary"
                  disabled={!message.trim()}
                >
                  Enviar Mensaje
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
