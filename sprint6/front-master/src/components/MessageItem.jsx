import { format } from 'date-fns'
import { getSellerById } from '../data/mockData'
import { useProducts } from '../context/ProductsContext'

const MessageItem = ({ message, currentUserId, showProduct }) => {
  const isSentByUser = message.sender === currentUserId
  const sender = getSellerById(message.sender)
  const { getProductById } = useProducts()
  const product = showProduct && message.productId ? getProductById(message.productId) : null
  
  const formattedTime = format(new Date(message.timestamp), 'h:mm a')
  
  return (
    <div className={`mb-4 ${isSentByUser ? 'flex justify-end' : 'flex justify-start'}`}>
      <div className="flex flex-col items-start max-w-[75%]">
        {!isSentByUser && (
          <div className="flex items-center mb-1">
            <img 
              src={sender.avatar}
              alt={sender.name}
              className="w-6 h-6 rounded-full mr-2"
            />
            <span className="text-sm font-medium">{sender.name}</span>
          </div>
        )}
        
        {product && showProduct && (
          <div className="bg-gray-100 p-2 rounded-lg mb-2 w-full">
            <div className="flex items-center">
              <img 
                src={product.images[0]}
                alt={product.title}
                className="w-10 h-10 object-cover rounded mr-2"
              />
              <div>
                <p className="text-sm font-medium">{product.title}</p>
                <p className="text-sm">${product.price}</p>
              </div>
            </div>
          </div>
        )}
        
        <div className={`
          px-4 py-2 rounded-2xl ${
            isSentByUser 
              ? 'bg-fb-blue text-white rounded-tr-none' 
              : 'bg-gray-200 rounded-tl-none'
          }
        `}>
          <p>{message.content}</p>
        </div>
        <span className="text-xs text-gray-500 mt-1">{formattedTime}</span>
      </div>
    </div>
  )
}

export default MessageItem