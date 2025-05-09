import { Link, useLocation } from "react-router-dom";
import { FaHome, FaBookmark, FaEnvelope, FaUser, FaPlus } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";

const Sidebar = () => {
  const { theme } = useTheme();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div
      className={`h-full p-4 border rounded-lg mb-40 pb-20 ${
        theme === "dark" ? "text-white" : "text-black"
      }`}
    >
      <ul className="space-y-2">
        <li>
          <Link
            to="/"
            className={`flex items-center p-2 rounded-lg ${
              isActive("/") ? "bg-fb-blue text-white" : "hover:bg-gray-600"
            }`}
          >
            <FaHome className="mr-3" />
            <span>Marketplace</span>
          </Link>
        </li>
        <li>
          <Link
            to="/messages"
            className={`flex items-center p-2 rounded-lg ${
              isActive("/messages")
                ? "bg-fb-blue text-white"
                : "hover:bg-gray-600"
            }`}
          >
            <FaEnvelope className="mr-3" />
            <span>Mensajes</span>
          </Link>
        </li>
        <li>
          <Link
            to="/saved"
            className={`flex items-center p-2 rounded-lg ${
              isActive("/saved") ? "bg-fb-blue text-white" : "hover:bg-gray-600"
            }`}
          >
            <FaBookmark className="mr-3" />
            <span>Productos Guardados</span>
          </Link>
        </li>
        <li>
          <Link
            to="/profile"
            className={`flex items-center p-2 rounded-lg ${
              isActive("/profile")
                ? "bg-fb-blue text-white"
                : "hover:bg-gray-600"
            }`}
          >
            <FaUser className="mr-3" />
            <span>Perfil</span>
          </Link>
        </li>
        <li className="pt-4">
          <Link
            to="/create-listing"
            className="flex items-center p-2 bg-fb-green text-white rounded-lg hover:bg-green-600"
          >
            <FaPlus className="mr-3" />
            <span>Crear Publicacion</span>
          </Link>
        </li>
      </ul>

      <div className="mt-8">
        <h3 className="font-medium text-gray-500 mb-2">Categorias</h3>
        <ul className="space-y-1">
          <li>
            <Link
              to="/search?category=electronicos"
              className="block py-1 hover:text-fb-blue"
            >
              Electronicos
            </Link>
          </li>
          <li>
            <Link
              to="/search?category=muebles"
              className="block py-1 hover:text-fb-blue"
            >
              Muebles
            </Link>
          </li>
          <li>
            <Link
              to="/search?category=ropa"
              className="block py-1 hover:text-fb-blue"
            >
              Ropa
            </Link>
          </li>
          <li>
            <Link
              to="/search?category=vehiculos"
              className="block py-1 hover:text-fb-blue"
            >
              Vehiculos
            </Link>
          </li>
          <li>
            <Link
              to="/search?category=deportes"
              className="block py-1 hover:text-fb-blue"
            >
              Deportes
            </Link>
          </li>
          <li>
            <Link to="/search" className="block py-1 text-fb-blue font-medium">
              Ver todo
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
