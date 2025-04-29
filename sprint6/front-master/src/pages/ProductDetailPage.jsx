import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useProducts } from '../context/ProductsContext'
import { useMessages } from '../context/MessagesContext'
import { useAuth } from '../context/AuthContext'
import { formatDate, getSellerById } from '../data/mockData'
import { FaBookmark, FaRegBookmark, FaMapMarkerAlt, FaTags, FaClock, FaArrowLeft } from 'react-icons/fa'

const ProductDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getProductById, isLoading, toggleSaveProduct, isProductSaved } = useProducts()
  const { startProductConversation } = useMessages()
  const { currentUser, isAuthenticated } = useAuth()
  
  const [product, setProduct] = useState(null)
  const [seller, setSeller] = useState(null)
  const [message, setMessage] = useState('')
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false)
  
  useEffect(() => {
    if (!isLoading) {
      const foundProduct = getProductById(id)
      if (foundProduct) {
        setProduct(foundProduct)
        const productSeller = getSellerById(foundProduct.seller)
        setSeller(productSeller)
      } else {
        // Product not found, navigate to 404
        navigate('/not-found')
      }
    }
  }, [id, isLoading, getProductById, navigate])
  
  const handleSendMessage = () => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    
    if (message.trim() && product && seller) {
      startProductConversation(seller.id, message, product)
      navigate('/messages/' + seller.id)
    }
  }
  
  const toggleSave = () => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    
    toggleSaveProduct(product.id)
  }
  
  if (isLoading || !product) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fb-blue"></div>
      </div>
    )
  }
  
  const isSaved = isProductSaved(product.id)
  const isOwnProduct = currentUser && currentUser.id === product.seller
  
  return (
    <div>
      {/* Back button */}
      <div className="mb-4">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-gray-600 hover:text-fb-blue"
        >
          <FaArrowLeft className="mr-2" /> Back to Marketplace
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          {/* Product image */}
          <div className="md:w-1/2">
            <img 
              src={product.images[0]} 
              alt={product.title}
              className="w-full h-80 md:h-96 object-cover"
            />
          </div>
          
          {/* Product details */}
          <div className="md:w-1/2 p-6">
            <div className="flex justify-between items-start">
              <h1 className="text-2xl font-bold">{product.title}</h1>
              <button onClick={toggleSave} className="text-xl">
                {isSaved ? (
                  <FaBookmark className="text-fb-blue" />
                ) : (
                  <FaRegBookmark />
                )}
              </button>
            </div>
            
            <p className="text-2xl font-bold text-fb-blue mt-2">${product.price}</p>
            
            <div className="mt-4 space-y-2 text-gray-600">
              <div className="flex items-center">
                <FaMapMarkerAlt className="mr-2" />
                <span>{product.location}</span>
              </div>
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
              <h2 className="font-semibold mb-2">Description</h2>
              <p className="text-gray-700">{product.description}</p>
              
              <div className="mt-3">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                  {product.condition}
                </span>
              </div>
            </div>
            
            <div className="flex items-center mt-4">
              <img 
                src={seller.avatar} 
                alt={seller.name}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <p className="font-medium">{seller.name}</p>
                <p className="text-sm text-gray-500">Seller</p>
              </div>
            </div>
            
            <div className="mt-6">
              {isOwnProduct ? (
                <div className="text-gray-500 italic">This is your listing</div>
              ) : (
                <button 
                  onClick={() => setIsMessageModalOpen(true)} 
                  className="btn-primary w-full"
                >
                  Message Seller
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Message modal */}
      {isMessageModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="p-4 border-b">
              <h2 className="font-bold text-lg">Message Seller</h2>
            </div>
            
            <div className="p-4">
              <div className="flex items-center mb-4">
                <img 
                  src={product.images[0]} 
                  alt={product.title}
                  className="w-16 h-16 object-cover rounded mr-3"
                />
                <div>
                  <p className="font-medium">{product.title}</p>
                  <p className="text-fb-blue font-bold">${product.price}</p>
                </div>
              </div>
              
              <textarea
                className="w-full border rounded-lg p-3 focus:ring focus:ring-fb-blue focus:ring-opacity-50"
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
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetailPage