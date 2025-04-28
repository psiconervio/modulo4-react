import { createContext, useState, useContext, useEffect } from 'react'
import { useAuth } from './AuthContext'
import { MOCK_MESSAGES } from '../data/mockData'

const MessagesContext = createContext(null)

export const useMessages = () => useContext(MessagesContext)

export const MessagesProvider = ({ children }) => {
  const { currentUser } = useAuth()
  const [conversations, setConversations] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (currentUser) {
      // Simulate API fetch for user's conversations
      setTimeout(() => {
        setConversations(MOCK_MESSAGES)
        setIsLoading(false)
      }, 500)
    } else {
      setConversations([])
      setIsLoading(false)
    }
  }, [currentUser])

  // Get a specific conversation
  const getConversation = (userId) => {
    return conversations.find(conv => 
      conv.participants.includes(userId) && 
      conv.participants.includes(currentUser?.id)
    )
  }

  // Send a new message
  const sendMessage = (recipientId, content, productId) => {
    const now = new Date()
    const newMessage = {
      id: `msg_${now.getTime()}`,
      sender: currentUser.id,
      content,
      timestamp: now.toISOString(),
      productId
    }
    
    // Check if conversation already exists
    const existingConvIndex = conversations.findIndex(conv => 
      conv.participants.includes(recipientId) && 
      conv.participants.includes(currentUser.id)
    )
    
    if (existingConvIndex >= 0) {
      // Add to existing conversation
      const updatedConversations = [...conversations]
      updatedConversations[existingConvIndex].messages.push(newMessage)
      setConversations(updatedConversations)
      return newMessage
    } else {
      // Create new conversation
      const newConversation = {
        id: `conv_${now.getTime()}`,
        participants: [currentUser.id, recipientId],
        messages: [newMessage],
        lastUpdated: now.toISOString()
      }
      setConversations([...conversations, newConversation])
      return newMessage
    }
  }

  // Start a new conversation about a product
  const startProductConversation = (sellerId, initialMessage, product) => {
    if (!currentUser) return null
    
    // Don't create conversation with yourself
    if (sellerId === currentUser.id) return null
    
    return sendMessage(sellerId, initialMessage, product.id)
  }
  
  const value = {
    conversations,
    isLoading,
    getConversation,
    sendMessage,
    startProductConversation
  }

  return (
    <MessagesContext.Provider value={value}>
      {children}
    </MessagesContext.Provider>
  )
}