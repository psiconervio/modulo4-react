import { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { MOCK_MESSAGES } from "../data/mockData";
import { useProducts } from "./ProductsContext";

const MessagesContext = createContext(null);

export const useMessages = () => useContext(MessagesContext);

export const MessagesProvider = ({ children }) => {
  const { currentUser, user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { products } = useProducts();

  const groupMessagesByConversation = (messages) => {
    const convs = {};

    messages.forEach((msg) => {
      const key = msg.product._id; // o generar clave única por participantes si preferís
      if (!convs[key]) {
        convs[key] = {
          id: key,
          participants: [msg.sender._id], // o cargar ambos con lógica extra
          messages: [],
        };
      }
      convs[key].messages.push(msg);
    });

    return Object.values(convs);
  };

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
  useEffect(() => {
    const fetchMessages = async () => {
      if (user) {
        setIsLoading(true);
        try {
          const res = await fetch(`/api/chat/${products._id}`); // Asegurate de tener productId disponible o traer todos los chats relacionados al usuario
          const data = await res.json();
          setConversations(groupMessagesByConversation(data));
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
        setIsLoading(false);
      } else {
        setConversations([]);
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, [user]);

  // Get a specific conversation
  const getConversation = (userId) => {
    return conversations.find(
      (conv) =>
        conv.participants.includes(userId) &&
        conv.participants.includes(user?.id)
    );
  };
  
  const sendMessage = async (recipientId, content, productId) => {
    const now = new Date();

    const newMessage = {
      senderId: user.id,
      recipientId,
      message: content,
      productId,
    };

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMessage),
      });

      const savedMessage = await res.json();

      // Actualizar estado local
      const existingConvIndex = conversations.findIndex(
        (conv) =>
          conv.participants.includes(recipientId) &&
          conv.participants.includes(user.id)
      );

      if (existingConvIndex >= 0) {
        const updated = [...conversations];
        updated[existingConvIndex].messages.push(savedMessage);
        setConversations(updated);
      } else {
        const newConv = {
          id: `conv_${savedMessage._id}`,
          participants: [user.id, recipientId],
          messages: [savedMessage],
        };
        setConversations([...conversations, newConv]);
      }

      return savedMessage;
    } catch (err) {
      console.error("Error al enviar mensaje:", err);
    }
  };

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

  const startProductConversation = (sellerId, initialMessage, product) => {
    if (!user) return null;

    if (!product?.seller?._id || !user?.id) return null;
    if (product.seller._id === user.id) return null;

    return sendMessage(sellerId, initialMessage, product.id);
  };

  const value = {
    conversations,
    isLoading,
    getConversation,
    sendMessage,
    startProductConversation,
  };

  return (
    <MessagesContext.Provider value={value}>
      {children}
    </MessagesContext.Provider>
  );
};
