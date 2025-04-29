import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaSearch, FaShoppingCart, FaEnvelope, FaBell, FaUser, FaBars } from 'react-icons/fa';
import MobileMenu from './MobileMenu';

const Navbar = () => {
  const { currentUser, isAuthenticated, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false); // Agregado para manejar el dropdown
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <nav className="bg-fb-blue text-white fixed w-full top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and search */}
          <div className="flex items-center flex-1">
            <Link to="/" className="font-bold text-xl flex items-center">
              <FaShoppingCart className="mr-2" /> Marketplace
            </Link>

            <div className="hidden md:block ml-6 flex-1 max-w-md">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search Marketplace"
                  className="w-full bg-white text-black rounded-full py-2 pl-4 pr-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="absolute right-0 top-0 mt-2 mr-3 text-gray-500">
                  <FaSearch />
                </button>
              </form>
            </div>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center">
            {isAuthenticated ? (
              <>
                <Link to="/messages" className="px-3 py-2 rounded hover:bg-blue-600">
                  <FaEnvelope />
                </Link>
                <Link to="/create-listing" className="ml-2 btn-secondary">
                  Publicar Venta
                </Link>
                <div className="relative ml-3">
                  <button
                    className="flex items-center"
                    onClick={() => setShowDropdown((prev) => !prev)}
                  >
                    <img
                      src={
                        currentUser.avatar ||
                        'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150'
                      }
                      alt={currentUser.name}
                      className="w-8 h-8 rounded-full"
                    />
                  </button>
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </Link>
                      <Link
                        to="/saved"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Saved Items
                      </Link>
                      <button
                        onClick={logout}
                        className="w-full text-left block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link to="/login" className="btn-secondary">
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={toggleMobileMenu} className="text-white p-2 focus:outline-none">
              <FaBars />
            </button>
          </div>
        </div>

        {/* Mobile search - only visible on mobile */}
        <div className="md:hidden pb-3">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search Marketplace"
              className="w-full bg-white text-black rounded-full py-2 pl-4 pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="absolute right-0 top-0 mt-2 mr-3 text-gray-500">
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
// import { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { useAuth } from '../../context/AuthContext'
// import { FaSearch, FaShoppingCart, FaEnvelope, FaBell, FaUser, FaBars } from 'react-icons/fa'
// import MobileMenu from './MobileMenu'

// const Navbar = () => {
//   const { currentUser, isAuthenticated, logout } = useAuth()
//   const [searchQuery, setSearchQuery] = useState('')
//   const [showMobileMenu, setShowMobileMenu] = useState(false)
//   const navigate = useNavigate()
  
//   const handleSearch = (e) => {
//     e.preventDefault()
//     if (searchQuery.trim()) {
//       navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
//     }
//   }
  
//   const toggleMobileMenu = () => {
//     setShowMobileMenu(!showMobileMenu)
//   }
  
//   return (
//     <nav className="bg-fb-blue text-white fixed w-full top-0 z-50">
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo and search */}
//           <div className="flex items-center flex-1">
//             <Link to="/" className="font-bold text-xl flex items-center">
//               <FaShoppingCart className="mr-2" /> FBMarket
//             </Link>
            
//             <div className="hidden md:block ml-6 flex-1 max-w-md">
//               <form onSubmit={handleSearch} className="relative">
//                 <input
//                   type="text"
//                   placeholder="Search Marketplace"
//                   className="w-full bg-white text-black rounded-full py-2 pl-4 pr-10"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//                 <button type="submit" className="absolute right-0 top-0 mt-2 mr-3 text-gray-500">
//                   <FaSearch />
//                 </button>
//               </form>
//             </div>
//           </div>
          
//           {/* Navigation */}
//           <div className="hidden md:flex items-center">
//             {isAuthenticated ? (
//               <>
//                 <Link to="/messages" className="px-3 py-2 rounded hover:bg-blue-600">
//                   <FaEnvelope />
//                 </Link>
//                 <Link to="/create-listing" className="ml-2 btn-secondary">
//                   Sell
//                 </Link>
//                 <div className="relative ml-3 group">
//                   <button className="flex items-center">
//                     <img
//                       src={currentUser.avatar || "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150"}
//                       alt={currentUser.name}
//                       className="w-8 h-8 rounded-full"
//                     />
//                   </button>
//                   <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block">
//                     <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
//                       Profile
//                     </Link>
//                     <Link to="/saved" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
//                       Saved Items
//                     </Link>
//                     <button 
//                       onClick={logout}
//                       className="w-full text-left block px-4 py-2 text-gray-700 hover:bg-gray-100"
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 </div>
//               </>
//             ) : (
//               <Link to="/login" className="btn-secondary">
//                 Login
//               </Link>
//             )}
//           </div>
          
//           {/* Mobile menu button */}
//           <div className="md:hidden">
//             <button 
//               onClick={toggleMobileMenu} 
//               className="text-white p-2 focus:outline-none"
//             >
//               <FaBars />
//             </button>
//           </div>
//         </div>
        
//         {/* Mobile search - only visible on mobile */}
//         <div className="md:hidden pb-3">
//           <form onSubmit={handleSearch} className="relative">
//             <input
//               type="text"
//               placeholder="Search Marketplace"
//               className="w-full bg-white text-black rounded-full py-2 pl-4 pr-10"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             <button type="submit" className="absolute right-0 top-0 mt-2 mr-3 text-gray-500">
//               <FaSearch />
//             </button>
//           </form>
//         </div>
//       </div>
      
//       {/* Mobile menu */}
//       {showMobileMenu && (
//         <MobileMenu onClose={toggleMobileMenu} />
//       )}
//     </nav>
//   )
// }

// export default Navbar