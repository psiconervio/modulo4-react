import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useMessages } from "../context/MessagesContext";
import { FaTrash, FaEdit, FaCheck, FaTimes, FaPaperPlane } from "react-icons/fa";

const MessagesPage = () => {
  const { productId } = useParams();
  const { user } = useAuth();
  const {
    messages,
    loading,
    loadMessages,
    addMessage,
    editMessage,
    removeMessage,
  } = useMessages();

  const [newMessage, setNewMessage] = useState("");
  const [error, setError] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (productId) {
      loadMessages(productId);
    }
  }, [productId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    try {
      await addMessage({ product: productId, message: newMessage });
      setNewMessage("");
    } catch (err) {
      console.error(err);
      setError("No se pudo enviar el mensaje.");
    }
  };

  const MessageItem = ({ message }) => {
    const isOwn = message.sender._id === user._id;
    const [isEditing, setIsEditing] = useState(false);
    const [editedMessage, setEditedMessage] = useState(message.message);

    const handleSave = () => {
      if (editedMessage.trim() && editedMessage !== message.message) {
        editMessage(message._id, editedMessage);
      }
      setIsEditing(false);
    };

    return (
      <div className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-2`}>
        <div
          className={`${
            isOwn ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
          } p-3 rounded-lg max-w-md relative`}
        >
          {message.product?._id && (
            <Link
              to={`/product/${message.product._id}`}
              className="text-sm font-semibold mb-1 text-blue-700 hover:underline block"
            >
              Ver publicación: {message.product.title}
            </Link>
          )}

          {isEditing ? (
            <div className="flex flex-col space-y-2">
              <textarea
                className="p-2 text-black rounded border resize-none"
                value={editedMessage}
                onChange={(e) => setEditedMessage(e.target.value)}
                rows={2}
              />
              <div className="flex justify-end space-x-2 text-sm">
                <button onClick={handleSave} className="text-green-500">
                  <FaCheck />
                </button>
                <button onClick={() => setIsEditing(false)} className="text-red-500">
                  <FaTimes />
                </button>
              </div>
            </div>
          ) : (
            <>
              <p>{message.message}</p>
              {isOwn && (
                <div className="absolute right-2 bottom-2 flex space-x-2 text-xs text-white">
                  <button onClick={() => setIsEditing(true)}>
                    <FaEdit />
                  </button>
                  <button onClick={() => removeMessage(message._id)}>
                    <FaTrash />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden max-h-[calc(100vh-10rem)] flex flex-col">
      <div className="p-4 border-b">
        <h2 className="font-bold text-lg">Comentarios del producto</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : messages.length === 0 ? (
          <p className="text-center text-gray-500">No hay comentarios aún.</p>
        ) : (
          messages.map((msg) => <MessageItem key={msg._id} message={msg} />)
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t">
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <form onSubmit={handleSend}>
          <div className="flex">
            <input
              type="text"
              className="flex-1 border p-2 rounded"
              placeholder="Escribí un mensaje..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button
              type="submit"
              className="ml-2 bg-blue-500 text-white p-2 rounded"
              disabled={!newMessage.trim()}
            >
              <FaPaperPlane />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MessagesPage;


// import { useState, useEffect, useRef } from 'react'
// import { useParams, useNavigate } from 'react-router-dom'
// import { useAuth } from '../context/AuthContext'
// import { useMessages } from '../context/MessagesContext'
// import { useProducts } from '../context/ProductsContext'
// import ConversationItem from '../components/ConversationItem'
// import MessageItem from '../components/MessageItem'
// import MessageInput from '../components/MessageInput'
// import { getSellerById } from '../data/mockData'
// import { FaArrowLeft } from 'react-icons/fa'

// const MessagesPage = () => {
//   const { userId } = useParams()
//   const navigate = useNavigate()
//   const { currentUser, user } = useAuth()
//   const { conversations, isLoading, getConversation, sendMessage } = useMessages()
//   const { getProductById } = useProducts()
  
//   const [activeConversation, setActiveConversation] = useState(null)
//   const [selectedUser, setSelectedUser] = useState(null)
//   const messagesEndRef = useRef(null)
  
//   // Set active conversation from URL param
//   useEffect(() => {
//     if (!isLoading && userId) {
//       const conversation = getConversation(userId)
//       setActiveConversation(conversation)
//       setSelectedUser(getSellerById(userId))
//     }
//   }, [userId, isLoading, getConversation])
  
//   // Scroll to bottom of messages
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
//   }, [activeConversation])
  
//   const handleSelectConversation = (userId) => {
//     navigate(`/messages/${userId}`)
//   }
  
//   const handleSendMessage = (content) => {
//     if (selectedUser) {
//       sendMessage(selectedUser.id, content)
//       // Update active conversation after sending
//       setActiveConversation(getConversation(selectedUser.id))
//     }
//   }
  
//   // For smaller screens - toggle between conversations list and active conversation
//   const [showConversationList, setShowConversationList] = useState(!userId)
  
//   useEffect(() => {
//     setShowConversationList(!userId)
//   }, [userId])
  
//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fb-blue"></div>
//       </div>
//     )
//   }
  
//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden h-[calc(100vh-16rem)]">
//       <div className="flex h-full">
//         {/* Conversations list - hidden on mobile when viewing a conversation */}
//         <div className={`w-full md:w-1/3 md:block border-r ${showConversationList ? 'block' : 'hidden'}`}>
//           <div className="p-4 border-b">
//             <h2 className="font-bold text-lg">Messages</h2>
//           </div>
          
//           <div className="overflow-y-auto h-[calc(100%-60px)]">
//             {conversations.length === 0 ? (
//               <div className="p-4 text-center text-gray-500">
//                 <p>No conversations yet</p>
//                 <p className="text-sm mt-2">When you message sellers, you'll see your conversations here</p>
//               </div>
//             ) : (
//               conversations.map(conversation => (
//                 <ConversationItem
//                   key={conversation.id}
//                   conversation={conversation}
//                   currentUserId={user.id}
//                   onClick={handleSelectConversation}
//                   isActive={activeConversation?.id === conversation.id}
//                 />
//               ))
//             )}
//           </div>
//         </div>
        
//         {/* Active conversation - hidden on mobile when viewing conversations list */}
//         <div className={`w-full md:w-2/3 flex flex-col ${showConversationList ? 'hidden' : 'block'} md:block`}>
//           {activeConversation ? (
//             <>
//               {/* Conversation header */}
//               <div className="p-4 border-b flex items-center">
//                 <button 
//                   className="md:hidden mr-2"
//                   onClick={() => {
//                     setShowConversationList(true)
//                     navigate('/messages')
//                   }}
//                 >
//                   <FaArrowLeft />
//                 </button>
                
//                 <img 
//                   src={selectedUser.avatar} 
//                   alt={selectedUser.name}
//                   className="w-10 h-10 rounded-full mr-3"
//                 />
//                 <div>
//                   <h3 className="font-semibold">{selectedUser.name}</h3>
//                 </div>
//               </div>
              
//               {/* Messages area */}
//               <div className="flex-1 overflow-y-auto p-4">
//                 {activeConversation.messages.map((message, index) => (
//                   <MessageItem 
//                     key={message.id}
//                     message={message}
//                     currentUserId={user._id}
//                     showProduct={index === 0}
//                   />
//                 ))}
//                 <div ref={messagesEndRef} />
//               </div>
              
//               {/* Message input */}
//               <div className="p-4">
//                 <MessageInput onSendMessage={handleSendMessage} />
//               </div>
//             </>
//           ) : (
//             <div className="flex items-center justify-center h-full text-gray-500">
//               <div className="text-center">
//                 <p className="mb-2">Select a conversation</p>
//                 <p className="text-sm">Or start a new one from a product page</p>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default MessagesPage