import { Link, useLocation } from 'react-router-dom'
import { FaHome, FaBookmark, FaEnvelope, FaUser, FaPlus } from 'react-icons/fa'

const Sidebar = () => {
  const location = useLocation()
  
  const isActive = (path) => {
    return location.pathname === path
  }
  
  return (
    <div className="h-full p-4 border rounded-lg mb-40 pb-20">
      <ul className="space-y-2">
        <li>
          <Link 
            to="/" 
            className={`flex items-center p-2 rounded-lg ${
              isActive('/') ? 'bg-fb-blue text-white' : 'hover:bg-gray-100'
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
              isActive('/messages') ? 'bg-fb-blue text-white' : 'hover:bg-gray-100'
            }`}
          >
            <FaEnvelope className="mr-3" />
            <span>Messages</span>
          </Link>
        </li>
        <li>
          <Link 
            to="/saved" 
            className={`flex items-center p-2 rounded-lg ${
              isActive('/saved') ? 'bg-fb-blue text-white' : 'hover:bg-gray-100'
            }`}
          >
            <FaBookmark className="mr-3" />
            <span>Saved Items</span>
          </Link>
        </li>
        <li>
          <Link 
            to="/profile" 
            className={`flex items-center p-2 rounded-lg ${
              isActive('/profile') ? 'bg-fb-blue text-white' : 'hover:bg-gray-100'
            }`}
          >
            <FaUser className="mr-3" />
            <span>Your Listings</span>
          </Link>
        </li>
        <li className="pt-4">
          <Link 
            to="/create-listing"
            className="flex items-center p-2 bg-fb-green text-white rounded-lg hover:bg-green-600"
          >
            <FaPlus className="mr-3" />
            <span>Create Listing</span>
          </Link>
        </li>
      </ul>
      
      <div className="mt-8">
        <h3 className="font-medium text-gray-500 mb-2">Categories</h3>
        <ul className="space-y-1">
          <li>
            <Link to="/search?category=Electronics" className="block py-1 hover:text-fb-blue">
              Electronics
            </Link>
          </li>
          <li>
            <Link to="/search?category=Furniture" className="block py-1 hover:text-fb-blue">
              Furniture
            </Link>
          </li>
          <li>
            <Link to="/search?category=Clothing" className="block py-1 hover:text-fb-blue">
              Clothing
            </Link>
          </li>
          <li>
            <Link to="/search?category=Vehicles" className="block py-1 hover:text-fb-blue">
              Vehicles
            </Link>
          </li>
          <li>
            <Link to="/search?category=Sports & Outdoors" className="block py-1 hover:text-fb-blue">
              Sports & Outdoors
            </Link>
          </li>
          <li>
            <Link to="/search" className="block py-1 text-fb-blue font-medium">
              See All Categories
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar