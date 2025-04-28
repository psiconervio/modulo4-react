import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';

const Chat = ({ productId, userId, username, token }) => {
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        // Conectar al servidor de Socket.IO
        const socketInstance = io('http://localhost:5000', {
            auth: {
                token,
            },
        });
        setSocket(socketInstance);

        // Unirse a la sala del producto
        socketInstance.emit('join_room', { productId, userId });

        // Escuchar mensajes recibidos
        socketInstance.on('receive_message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        // Desconectar el socket al desmontar el componente
        return () => {
            socketInstance.disconnect();
        };
    }, [productId, userId, token]);

    useEffect(() => {
        // Cargar historial de mensajes desde la base de datos
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/chat/${productId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setMessages(response.data);
            } catch (error) {
                console.error('Error al cargar el historial de mensajes:', error);
            }
        };

        fetchMessages();
    }, [productId, token]);

    const handleSendMessage = () => {
        if (newMessage.trim() === '') return;

        // Enviar mensaje al servidor
        socket.emit('send_message', {
            productId,
            senderId: userId,
            message: newMessage,
        });

        // Limpiar el campo de entrada
        setNewMessage('');
    };

    return (
        <div className="chat-container" style={styles.chatContainer}>
            <div className="chat-messages" style={styles.chatMessages}>
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        style={{
                            ...styles.message,
                            alignSelf: msg.senderId === userId ? 'flex-end' : 'flex-start',
                            backgroundColor: msg.senderId === userId ? '#d1f7c4' : '#f1f1f1',
                        }}
                    >
                        <strong>{msg.sender?.username || username}:</strong> {msg.message}
                    </div>
                ))}
            </div>
            <div className="chat-input" style={styles.chatInput}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Escribe un mensaje..."
                    style={styles.input}
                />
                <button onClick={handleSendMessage} style={styles.button}>
                    Enviar
                </button>
            </div>
        </div>
    );
};

const styles = {
    chatContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '400px',
        height: '500px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        overflow: 'hidden',
    },
    chatMessages: {
        flex: 1,
        padding: '10px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    message: {
        padding: '10px',
        borderRadius: '8px',
        maxWidth: '70%',
    },
    chatInput: {
        display: 'flex',
        padding: '10px',
        borderTop: '1px solid #ccc',
    },
    input: {
        flex: 1,
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        marginRight: '10px',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default Chat;