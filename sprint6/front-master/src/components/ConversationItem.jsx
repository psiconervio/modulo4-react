import { useProducts } from '../context/ProductsContext'
import { getSellerById } from '../data/mockData'
import { format } from 'date-fns'

const ConversationItem = ({ conversation, currentUserId, onClick, isActive }) => {
  // Find the other participant (not the current user)
  const otherParticipantId = conversation.participants.find(id => id !== currentUserId)
  const otherUser = getSellerById(otherParticipantId)
  
  // Get the last message
  const lastMessage = conversation.messages[conversation.messages.length - 1]
  
  // Get product associated with the conversation
  const { getProductById } = useProducts()
  const product = lastMessage.productId ? getProductById(lastMessage.productId) : null
  
  // Format the timestamp
  const formattedTime = format(new Date(lastMessage.timestamp), 'MMM d, h:mm a')
  
  return (
    <div 
      className={`p-3 border-b cursor-pointer hover:bg-gray-50 ${isActive ? 'bg-blue-50' : ''}`}
      onClick={() => onClick(otherParticipantId)}
    >
      <div className="flex items-start">
        <img 
          src={otherUser.avatar} 
          alt={otherUser.name}
          className="w-12 h-12 rounded-full mr-3"
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold truncate">{otherUser.name}</h3>
            <span className="text-xs text-gray-500">{formattedTime}</span>
          </div>
          
          <p className="text-sm text-gray-600 truncate">
            {lastMessage.sender === currentUserId ? 'You: ' : ''}{lastMessage.content}
          </p>
          
          {product && (
            <div className="flex items-center mt-1">
              <div 
                className="w-8 h-8 bg-cover bg-center rounded mr-1"
                style={{ backgroundImage: `url(${product.images[0]})` }}
              />
              <span className="text-xs text-gray-500 truncate">{product.title}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ConversationItem