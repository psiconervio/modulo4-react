import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const MessagesContext = createContext();

export const useMessages = () => useContext(MessagesContext);

export const MessagesProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  
  const loadMessages = async (productId) => {
    try {
      setLoading(true);
      const res = await axios.get(`https://modulo4-react.onrender.com/api/messages/${productId}`);
      // const res = await axios.get(`http://localhost:5000/api/messages/${productId}`);
      setMessages(res.data);
    } catch (err) {
      console.error('Error al cargar mensajes:', err);
    } finally {
      setLoading(false);
    }
  };

  const addMessage = async ({ product, message }) => {
    try {
      const res = await axios.post('https://modulo4-react.onrender.com/api/messages', {
      // const res = await axios.post('http://localhost:5000/api/messages', {
        product,
        sender: user._id,
        message,
      });
      setMessages((prev) => [...prev, res.data]);
    } catch (err) {
      console.error('Error al enviar mensaje:', err);
      throw err;
    }
  };

  const editMessage = async (id, newMessage) => {
    try {
      const res = await axios.put(`https://modulo4-react.onrender.com/api/messages/${id}`, { message: newMessage });
      // const res = await axios.put(`http://localhost:5000/api/messages/${id}`, { message: newMessage });
      setMessages((prev) =>
        prev.map((msg) => (msg._id === id ? { ...msg, message: res.data.message } : msg))
      );
    } catch (err) {
      console.error('Error al editar mensaje:', err);
    }
  };

  const removeMessage = async (id) => {
    try {
      await axios.delete(`https://modulo4-react.onrender.com/api/messages/${id}`);
      // await axios.delete(`http://localhost:5000/api/messages/${id}`);
      setMessages((prev) => prev.filter((msg) => msg._id !== id));
    } catch (err) {
      console.error('Error al eliminar mensaje:', err);
    }
  };

  return (
    <MessagesContext.Provider
      value={{ messages, loading, loadMessages, addMessage, editMessage, removeMessage }}
    >
      {children}
    </MessagesContext.Provider>
  );
};

// import { createContext, useState, useContext, useEffect } from "react";
// import { useAuth } from "./AuthContext";
// import chatService from "../../../back-master/src/services/chatService.mjs";

// const MessagesContext = createContext(null);
// export const useMessages = () => useContext(MessagesContext);

// export const MessagesProvider = ({ children }) => {
//   const { user } = useAuth();
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const loadMessages = async (productId) => {
//     if (!user || !productId) return;
//     setLoading(true);
//     try {
//       const data = await chatService.getMessages(productId);
//       setMessages(data);
//     } catch (error) {
//       console.error("Error loading messages:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const addMessage = async ({ product, message }) => {
//     if (!user) return;
//     try {
//       const saved = await chatService.sendMessage({ product, sender: user._id, message });
//       setMessages((prev) => [...prev, saved]);
//       return saved;
//     } catch (err) {
//       console.error("Error sending message:", err);
//     }
//   };

//   const editMessage = async (id, message) => {
//     try {
//       const updated = await chatService.updateMessage({ id, message });
//       setMessages((prev) => prev.map((m) => (m._id === id ? updated : m)));
//       return updated;
//     } catch (err) {
//       console.error("Error editing message:", err);
//     }
//   };

//   const removeMessage = async (id) => {
//     try {
//       const ok = await chatService.deleteMessage(id);
//       if (ok) {
//         setMessages((prev) => prev.filter((m) => m._id !== id));
//       }
//     } catch (err) {
//       console.error("Error deleting message:", err);
//     }
//   };

//   return (
//     <MessagesContext.Provider
//       value={{
//         messages,
//         loading,
//         loadMessages,
//         addMessage,
//         editMessage,
//         removeMessage,
//       }}
//     >
//       {children}
//     </MessagesContext.Provider>
//   );
// };
// import { createContext, useState, useContext, useEffect } from "react";
// import { useAuth } from "./AuthContext";
// import { MOCK_MESSAGES } from "../data/mockData";
// import { useProducts } from "./ProductsContext";

// const MessagesContext = createContext(null);

// export const useMessages = () => useContext(MessagesContext);

// export const MessagesProvider = ({ children }) => {
//   const { currentUser, user } = useAuth();
//   const [conversations, setConversations] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const { products } = useProducts();

//   const groupMessagesByConversation = (messages) => {
//     const convs = {};

//     messages.forEach((msg) => {
//       const key = msg.product._id; // o generar clave única por participantes si preferís
//       if (!convs[key]) {
//         convs[key] = {
//           id: key,
//           participants: [msg.sender._id], // o cargar ambos con lógica extra
//           messages: [],
//         };
//       }
//       convs[key].messages.push(msg);
//     });

//     return Object.values(convs);
//   };

//   useEffect(() => {
//     const fetchMessages = async () => {
//       console.log("products", products);
//       if (user && products.length > 0) {
//         setIsLoading(true);
//         try {
//           const res = await fetch(
//             `http://localhost:5000/api/chat/${products._id}`
//           );
//           const data = await res.json();
//           setConversations(groupMessagesByConversation(data));
//         } catch (error) {
//           console.error("Error fetching messages:", error);
//         }
//         setIsLoading(false);
//       } else {
//         setConversations([]);
//         setIsLoading(false);
//       }
//     };

//     fetchMessages();
//   }, [user]);

//   // Get a specific conversation
//   const getConversation = (userId) => {
//     return conversations.find(
//       (conv) =>
//         conv.participants.includes(userId) &&
//         conv.participants.includes(user?.id)
//     );
//   };

//   const startProductConversation = (sellerId, initialMessage, product) => {
//     if (!user) return null;

//     if (!product?.seller?._id || !user?._id) return null;
//     if (product.seller._id === user._id) return null;

//     return sendMessage(sellerId, initialMessage, product._id);
//   };

//   const sendMessage = async (recipientId, content, productId) => {
//     const now = new Date();

//     const newMessage = {
//       sender: user._id,
//       product: productId,
//       message: content,
//     };

//     try {
//       const res = await fetch("http://localhost:5000/api/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newMessage),
//       });

//       if (!res.ok)
//         throw new Error("Error al guardar el mensaje en el servidor");

//       const savedMessage = await res.json();

//       const existingConvIndex = conversations.findIndex(
//         (conv) =>
//           conv.participants.includes(recipientId) &&
//           conv.participants.includes(user._id)
//       );

//       if (existingConvIndex >= 0) {
//         const updated = [...conversations];
//         updated[existingConvIndex].messages.push(savedMessage);
//         setConversations(updated);
//       } else {
//         const newConv = {
//           id: `conv_${savedMessage._id}`,
//           participants: [user._id, recipientId],
//           messages: [savedMessage],
//         };
//         setConversations([...conversations, newConv]);
//       }

//       return savedMessage;
//     } catch (err) {
//       console.error("Error al enviar mensaje:", err);
//     }
//   };

//   const value = {
//     conversations,
//     isLoading,
//     getConversation,
//     sendMessage,
//     startProductConversation,
//   };

//   return (
//     <MessagesContext.Provider value={value}>
//       {children}
//     </MessagesContext.Provider>
//   );
// };

// useEffect(() => {
//   if (user) {
//     // Simulate API fetch for user's conversations
//     setTimeout(() => {
//       setConversations(MOCK_MESSAGES);
//       setIsLoading(false);
//     }, 500);
//   } else {
//     setConversations([]);
//     setIsLoading(false);
//   }
// }, [user]);

// const sendMessage = async (recipientId, content, productId) => {
//   const now = new Date();
//   console.log('LLEGO A SENDMESSAGE', recipientId, content, productId);

//   const newMessage = {
//     senderId: user._id,
//     recipientId,
//     message: content,
//     productId,
//   };

//   try {
//     const res = await fetch("/api/chat", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(newMessage),
//     });

//     const savedMessage = await res.json();

//     // Actualizar estado local
//     const existingConvIndex = conversations.findIndex(
//       (conv) =>
//         conv.participants.includes(recipientId) &&
//         conv.participants.includes(user.id)
//     );

//     if (existingConvIndex >= 0) {
//       const updated = [...conversations];
//       updated[existingConvIndex].messages.push(savedMessage);
//       setConversations(updated);
//     } else {
//       const newConv = {
//         id: `conv_${savedMessage._id}`,
//         participants: [user.id, recipientId],
//         messages: [savedMessage],
//       };
//       setConversations([...conversations, newConv]);
//     }

//     return savedMessage;
//   } catch (err) {
//     console.error("Error al enviar mensaje:", err);
//   }
// };

// Send a new message
// const sendMessage = (recipientId, content, productId) => {
//   const now = new Date();
//   const newMessage = {
//     id: `msg_${now.getTime()}`,
//     sender: user.id,
//     content,
//     timestamp: now.toISOString(),
//     productId,
//   };

//   // Check if conversation already exists
//   const existingConvIndex = conversations.findIndex(
//     (conv) =>
//       conv.participants.includes(recipientId) &&
//       conv.participants.includes(user.id)
//   );

//   if (existingConvIndex >= 0) {
//     // Add to existing conversation
//     const updatedConversations = [...conversations];
//     updatedConversations[existingConvIndex].messages.push(newMessage);
//     setConversations(updatedConversations);
//     return newMessage;
//   } else {
//     // Create new conversation
//     const newConversation = {
//       id: `conv_${now.getTime()}`,
//       participants: [user.id, recipientId],
//       messages: [newMessage],
//       lastUpdated: now.toISOString(),
//     };
//     setConversations([...conversations, newConversation]);
//     return newMessage;
//   }
// };

// const startProductConversation = (sellerId, initialMessage, product) => {
//   if (!user) return null;

//   if (!product?.seller?._id || !user?.id) return null;
//   if (product.seller._id === user.id) return null;

//   return sendMessage(sellerId, initialMessage, product.id);
// };
