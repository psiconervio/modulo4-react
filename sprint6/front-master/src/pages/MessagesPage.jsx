import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useMessages } from '../context/MessagesContext'
import { useProducts } from '../context/ProductsContext'
import ConversationItem from '../components/ConversationItem'
import MessageItem from '../components/MessageItem'
import MessageInput from '../components/MessageInput'
import { getSellerById } from '../data/mockData'
import { FaArrowLeft } from 'react-icons/fa'

const MessagesPage = () => {
  const { userId } = useParams()
  const navigate = useNavigate()
  const { currentUser, user } = useAuth()
  const { conversations, isLoading, getConversation, sendMessage } = useMessages()
  const { getProductById } = useProducts()
  
  const [activeConversation, setActiveConversation] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)
  const messagesEndRef = useRef(null)
  
  // Set active conversation from URL param
  useEffect(() => {
    if (!isLoading && userId) {
      const conversation = getConversation(userId)
      setActiveConversation(conversation)
      setSelectedUser(getSellerById(userId))
    }
  }, [userId, isLoading, getConversation])
  
  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [activeConversation])
  
  const handleSelectConversation = (userId) => {
    navigate(`/messages/${userId}`)
  }
  
  const handleSendMessage = (content) => {
    if (selectedUser) {
      sendMessage(selectedUser.id, content)
      // Update active conversation after sending
      setActiveConversation(getConversation(selectedUser.id))
    }
  }
  
  // For smaller screens - toggle between conversations list and active conversation
  const [showConversationList, setShowConversationList] = useState(!userId)
  
  useEffect(() => {
    setShowConversationList(!userId)
  }, [userId])
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fb-blue"></div>
      </div>
    )
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-[calc(100vh-16rem)]">
      <div className="flex h-full">
        {/* Conversations list - hidden on mobile when viewing a conversation */}
        <div className={`w-full md:w-1/3 md:block border-r ${showConversationList ? 'block' : 'hidden'}`}>
          <div className="p-4 border-b">
            <h2 className="font-bold text-lg">Messages</h2>
          </div>
          
          <div className="overflow-y-auto h-[calc(100%-60px)]">
            {conversations.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                <p>No conversations yet</p>
                <p className="text-sm mt-2">When you message sellers, you'll see your conversations here</p>
              </div>
            ) : (
              conversations.map(conversation => (
                <ConversationItem
                  key={conversation.id}
                  conversation={conversation}
                  currentUserId={user.id}
                  onClick={handleSelectConversation}
                  isActive={activeConversation?.id === conversation.id}
                />
              ))
            )}
          </div>
        </div>
        
        {/* Active conversation - hidden on mobile when viewing conversations list */}
        <div className={`w-full md:w-2/3 flex flex-col ${showConversationList ? 'hidden' : 'block'} md:block`}>
          {activeConversation ? (
            <>
              {/* Conversation header */}
              <div className="p-4 border-b flex items-center">
                <button 
                  className="md:hidden mr-2"
                  onClick={() => {
                    setShowConversationList(true)
                    navigate('/messages')
                  }}
                >
                  <FaArrowLeft />
                </button>
                
                <img 
                  src={selectedUser.avatar} 
                  alt={selectedUser.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <h3 className="font-semibold">{selectedUser.name}</h3>
                </div>
              </div>
              
              {/* Messages area */}
              <div className="flex-1 overflow-y-auto p-4">
                {activeConversation.messages.map((message, index) => (
                  <MessageItem 
                    key={message.id}
                    message={message}
                    currentUserId={user._id}
                    showProduct={index === 0}
                  />
                ))}
                <div ref={messagesEndRef} />
              </div>
              
              {/* Message input */}
              <div className="p-4">
                <MessageInput onSendMessage={handleSendMessage} />
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <p className="mb-2">Select a conversation</p>
                <p className="text-sm">Or start a new one from a product page</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MessagesPage