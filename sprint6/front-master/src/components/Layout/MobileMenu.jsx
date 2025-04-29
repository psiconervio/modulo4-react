import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { FaTimes, FaUser, FaBookmark, FaPlus, FaSignOutAlt } from 'react-icons/fa'

const MobileMenu = ({ onClose }) => {
  const { currentUser, isAuthenticated, logout } = useAuth()
  
  const handleLogout = () => {
    logout()
    onClose()
  }
  
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 md:hidden animate-fade-in">
      <div className="bg-white h-full w-4/5 max-w-xs shadow-xl animate-slide-up">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-semibold">Menu</h2>
          <button onClick={onClose} className="p-2">
            <FaTimes />
          </button>
        </div>
        
        {isAuthenticated ? (
          <div>
            <div className="p-4 border-b flex items-center">
              <img
                src={currentUser.avatar || "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150"}
                alt={currentUser.name}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <p className="font-medium">{currentUser.name}</p>
                <p className="text-sm text-gray-500">View Profile</p>
              </div>
            </div>
            
            <div className="py-2">
              <Link 
                to="/profile" 
                onClick={onClose}
                className="flex items-center px-4 py-3 hover:bg-gray-100"
              >
                <FaUser className="mr-3 text-gray-500" />
                <span>Profile</span>
              </Link>
              
              <Link 
                to="/saved" 
                onClick={onClose}
                className="flex items-center px-4 py-3 hover:bg-gray-100"
              >
                <FaBookmark className="mr-3 text-gray-500" />
                <span>Saved Items</span>
              </Link>
              
              <Link 
                to="/messages" 
                onClick={onClose}
                className="flex items-center px-4 py-3 hover:bg-gray-100"
              >
                <FaBookmark className="mr-3 text-gray-500" />
                <span>Messages</span>
              </Link>
              
              <Link 
                to="/create-listing" 
                onClick={onClose}
                className="flex items-center px-4 py-3 hover:bg-gray-100"
              >
                <FaPlus className="mr-3 text-gray-500" />
                <span>Create Listing</span>
              </Link>
              
              <button 
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-3 hover:bg-gray-100 text-left"
              >
                <FaSignOutAlt className="mr-3 text-gray-500" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="p-4">
            <Link 
              to="/login" 
              onClick={onClose}
              className="btn-primary w-full text-center"
            >
              Login
            </Link>
          </div>
        )}
      </div>
      
      <div 
        className="h-full w-1/5 ml-auto"
        onClick={onClose}
      />
    </div>
  )
}

export default MobileMenu