import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  FaSearch,
  FaShoppingCart,
  FaBars,
} from "react-icons/fa";
import MobileMenu from "./MobileMenu";
import { useTheme } from "../../context/ThemeContext";

const Navbar = () => {
  const { toggleTheme, theme } = useTheme();
  const { isAuthenticated, logout, user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();

  // console.log(user)
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <nav className="bg-blue-950 text-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-start h-16">
          <div className="flex items-center justify-start flex-1">
            <Link to="/" className="font-bold text-xl flex items-center">
              <FaShoppingCart className="mr-2 "/>MarketPlace
            </Link>
            <div className="hidden md:block ml-6 flex-1 max-w-md">
              {user ? (
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    placeholder="Buscar en Marketplace"
                    className="w-full bg-white text-black rounded-full py-2 pl-4 pr-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="absolute right-0 top-0 mt-2 mr-3 text-gray-500"
                  >
                    <FaSearch />
                  </button>
                </form>
              ) : (
                <></>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center">
            {isAuthenticated ? (
              <>

                <Link to="/create-listing" className="ml-2 btn-secondary">
                  Vender
                </Link>
                <div className="relative ml-3">
                  <button onClick={toggleMenu} className="flex items-center">
                    <img
                      src={
                        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150"
                      }
                      alt={user.username}
                      className="w-8 h-8 rounded-full"
                    />
                    {/* <span className="ml-2">Perfil</span> */}
                  </button>
                  {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Perfil: {user.username}
                      </Link>
                      <Link
                        to="/saved"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Productos Guardados
                      </Link>
                      <button
                        onClick={logout}
                        className="w-full text-left block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Cerrar session
                      </button>
                      <button
                        className={`px-4 py-2{
                          ${theme === "dark" ? " text-black" : " text-black"}`}
                        onClick={toggleTheme}
                      >
                        {theme === "dark" ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-toggle-off"
                            viewBox="0 0 16 16"
                          >
                            <path d="M11 4a4 4 0 0 1 0 8H8a5 5 0 0 0 2-4 5 5 0 0 0-2-4zm-6 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8M0 8a5 5 0 0 0 5 5h6a5 5 0 0 0 0-10H5a5 5 0 0 0-5 5" />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-toggle-on"
                            viewBox="0 0 16 16"
                          >
                            <path d="M5 3a5 5 0 0 0 0 10h6a5 5 0 0 0 0-10zm6 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8" />
                          </svg>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-secondary">
                  Login
                </Link>
                <button
                  className={`ml-2${
                    theme === "dark" ? " text-white" : " text-white"
                  }`}
                  onClick={toggleTheme}
                >
                  {theme === "dark" ? (
                    <div className="">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-toggle-off"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11 4a4 4 0 0 1 0 8H8a5 5 0 0 0 2-4 5 5 0 0 0-2-4zm-6 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8M0 8a5 5 0 0 0 5 5h6a5 5 0 0 0 0-10H5a5 5 0 0 0-5 5" />
                      </svg>
                    </div>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-toggle-on"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5 3a5 5 0 0 0 0 10h6a5 5 0 0 0 0-10zm6 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8" />
                    </svg>
                  )}
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-white p-2 focus:outline-none"
            >
              <FaBars />
            </button>
          </div>
        </div>

        {/* Mobile search - only visible on mobile */}
        <div className="md:hidden pb-3">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Buscar en Marketplace"
              className="w-full bg-white text-black rounded-full py-2 pl-4 pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-0 top-0 mt-2 mr-3 text-gray-500"
            >
              <FaSearch />
            </button>
          </form>
        </div>
      </div>

      {/* Mobile menu */}
      {showMobileMenu && <MobileMenu onClose={toggleMobileMenu} />}
    </nav>
  );
};

export default Navbar;
