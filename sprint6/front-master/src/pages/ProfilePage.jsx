import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useProducts } from '../context/ProductsContext'
import ProductGrid from '../components/ProductGrid'
import { FaUser, FaShoppingCart, FaEdit, FaPlusCircle } from 'react-icons/fa'

const ProfilePage = () => {
  const { currentUser } = useAuth()
  const { products, isLoading } = useProducts()
  const [userProducts, setUserProducts] = useState([])
  
  useEffect(() => {
    if (!isLoading && products.length > 0 && currentUser) {
      const userListings = products.filter(product => product.seller === currentUser.id)
      setUserProducts(userListings)
    }
  }, [products, currentUser, isLoading])
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fb-blue"></div>
      </div>
    )
  }
  
  return (
    <div>
      {/* Profile header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-center">
          <img 
            src={currentUser.avatar} 
            alt={currentUser.name}
            className="w-24 h-24 rounded-full mb-4 sm:mb-0 sm:mr-6"
          />
          
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold">{currentUser.name}</h1>
            <p className="text-gray-600">{currentUser.email}</p>
            
            <div className="mt-3 flex justify-center sm:justify-start space-x-3">
              <button className="btn-secondary flex items-center">
                <FaEdit className="mr-2" /> Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* User's listings */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Your Listings</h2>
          <Link 
            to="/create-listing" 
            className="btn-primary flex items-center"
          >
            <FaPlusCircle className="mr-2" /> Create New Listing
          </Link>
        </div>
        
        {userProducts.length === 0 ? (
          <div className="text-center py-10">
            <div className="text-fb-blue text-5xl mb-4">
              <FaShoppingCart />
            </div>
            <h3 className="text-xl font-bold mb-2">No listings yet</h3>
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
  )
}

export default ProfilePage