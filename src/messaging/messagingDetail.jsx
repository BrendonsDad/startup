import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DMChatClient } from '../discover/DMChatClient';
import './messaging.css';

export function MessagingDetail() {
    const { participantEmail } = useParams();
    const navigate = useNavigate();
    const [currentUserEmail, setCurrentUserEmail] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [conversationId, setConversationId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isTyping, setIsTyping] = useState(false);
    const dmWebSocketRef = useRef(null);
    const containerRef = useRef(null);

    // Get current user from localStorage
    useEffect(() => {
        const userEmail = localStorage.getItem('userEmail');
        setCurrentUserEmail(userEmail);
    }, []);

    // Initialize WebSocket and load conversation history
    useEffect(() => {
        if (!currentUserEmail) return;

        const initializeConversation = async () => {
            try {
                // Fetch or create conversation
                const response = await fetch('/api/conversations/start', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ participantEmail })
                });

                if (!response.ok) {
                    console.error('Failed to fetch/create conversation');
                    setLoading(false);
                    return;
                }

                const conversation = await response.json();
                setConversationId(conversation._id);

                // Load existing messages
                if (conversation.messages && conversation.messages.length > 0) {
                    setMessages(conversation.messages);
                }

                // Initialize WebSocket
                dmWebSocketRef.current = new DMChatClient(currentUserEmail, participantEmail, conversation._id);

                const handleNewMessage = (message) => {
                    // Only add to messages if it's a DM type event
                    if (message.type === 'dm') {
                        setMessages(prev => [...prev, message]);
                    }
                };

                // Typing indicator handler
                const handleTyping = (typingData) => {
                    if (typingData.type === 'typing') {
                        setIsTyping(true);
                        setTimeout(() => setIsTyping(false), 3000);
                    }
                };

                dmWebSocketRef.current.addObserver(handleNewMessage);
                dmWebSocketRef.current.addObserver(handleTyping);

                setLoading(false);
            } catch (error) {
                console.error('Error initializing conversation:', error);
                setLoading(false);
            }
        };

        initializeConversation();

        return () => {
            if (dmWebSocketRef.current && typeof dmWebSocketRef.current.removeObserver === 'function') {
                dmWebSocketRef.current.removeObserver(() => {});
            }
        };
    }, [currentUserEmail, participantEmail]);

    // Auto-scroll to bottom
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = (e) => {
        e.preventDefault();
        const trimmed = inputValue.trim();
        if (!trimmed || !dmWebSocketRef.current) return;

        if (dmWebSocketRef.current.connected) {
            const ts = new Date().toISOString();
            dmWebSocketRef.current.sendMessage(participantEmail, trimmed, ts);
            // Local echo
            setMessages(prev => [...prev, { from: currentUserEmail, msg: trimmed, ts }]);
            setInputValue('');
        } else {
            console.error('WebSocket is not connected.');
        }
    };

    // Typing indicator sender
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        if (dmWebSocketRef.current && dmWebSocketRef.current.connected) {
            dmWebSocketRef.current.sendTyping(participantEmail);
        }
    };

    const formatTime = (ts) => {
        const d = new Date(ts);
        return d.toLocaleString();
    };

    if (loading) {
        return <main className="container-fluid bg-secondary text-center"><h1>Loading conversation...</h1></main>;
    }

    return (
        <main className="container-fluid bg-secondary text-center">
            <h1>Chat with {participantEmail}</h1>
            {isTyping && (
                <div style={{ color: '#999', fontStyle: 'italic', marginBottom: '8px' }}>
                    {participantEmail} is typing...
                </div>
            )}
            <div
                ref={containerRef}
                id="chat-text"
                style={{ background: '#202022', padding: '12px', borderRadius: '6px', width: '85vw', maxWidth: '1100px', height: '60vh', boxSizing: 'border-box', overflowY: 'auto', margin: '0 auto 24px auto' }}
            >
                {messages.map((msg, index) => {
                    const isMe = msg.from === currentUserEmail;
                    return (
                        <div
                            key={index}
                            className={`messageRow ${isMe ? 'myMessageRow' : 'theirMessageRow'}`}
                            style={{ display: 'flex', justifyContent: isMe ? 'flex-end' : 'flex-start', marginBottom: '6px' }}
                        >
                            <div className={`messageBubble ${isMe ? 'myBubble' : 'theirBubble'}`} style={{ maxWidth: '75%' }}>
                                <div style={{ fontWeight: 'bold' }}>{msg.from}</div>
                                <div>{msg.msg}</div>
                                {msg.ts && <div style={{ fontSize: '0.75em', color: '#999', marginTop: '4px' }}>{formatTime(msg.ts)}</div>}
                            </div>
                        </div>
                    );
                })}
                {isTyping && (
                    <div
                        className={`messageRow theirMessageRow`}
                        style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '6px' }}
                    >
                        <div className={`messageBubble theirBubble`} style={{ maxWidth: '75%' }}>
                            <div style={{ fontWeight: 'bold' }}>{participantEmail}</div>
                            <div style={{ fontStyle: 'italic', color: '#666' }}>...</div>
                        </div>
                    </div>
                )}
            </div>
            <div className="message">
                <form onSubmit={handleSend}>
                    <div className="input-group mb-3">
                        <span className="input-group-text">⭕</span>
                        <input
                            className="form-control"
                            type="text"
                            placeholder="say hi!"
                            value={inputValue}
                            onChange={handleInputChange}
                            onKeyDown={e => e.key === 'Enter' && handleSend(e)}
                        />
                        <button type="submit" className="btn btn-primary redbutton">Send</button>
                    </div>
                </form>
            </div>
            <button className="btn btn-secondary" onClick={() => navigate('/messaging')}>
                Back to Conversations
            </button>
        </main>
    );
}

export default MessagingDetail;
