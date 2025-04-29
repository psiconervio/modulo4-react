import { Link } from 'react-router-dom'
import { FaBookmark, FaRegBookmark } from 'react-icons/fa'
import { useProducts } from '../context/ProductsContext'
import { formatDate, getSellerById } from '../data/mockData'

const ProductCard = ({ product }) => {
  const { toggleSaveProduct, isProductSaved } = useProducts()
  const seller = getSellerById(product.seller)
  const isSaved = isProductSaved(product.id)
  
  const handleSaveClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    // toggleSaveProduct(product._id)
  }
   console.log("ProductCart",product[0])
  return (
    <Link to=
    {`/product/${product}`} 
    className="block">
      <div className="card group hover:transform hover:scale-[1.02] transition-all duration-200 border rounded-lg border-gray-600">
        <div className="relative">
          <img 
            src={product.image} 
            // alt={product.title}
            className="w-full h-48 object-cover rounded-md"
          />
          <button
            onClick={handleSaveClick}
            className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md opacity-90 hover:opacity-100"
          >
            {isSaved ? (
              <FaBookmark className="text-fb-blue" />
            ) : (
              <FaRegBookmark />
            )}
          </button>
        </div>
        
        <div className="mt-3">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-lg group-hover:text-fb-blue">${product.price}</h3>
            <span className="text-xs text-gray-500">{formatDate(product.createdAt)}</span>
          </div>
          {/* <h4 className="font-medium text-gray-800 mt-1 line-clamp-1">{product.title}</h4> */}
          <p className="text-gray-500 text-sm mt-1 line-clamp-2">{product.description}</p>
          
          <div className="mt-3 flex items-center text-sm text-gray-600">
            {/* <span>{product.location}</span> */}
            <span className="mx-2">•</span>
            {/* <span>{product.category}</span> */}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard