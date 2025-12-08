import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ChatClient } from './ChatClient';
import './GroupDetails.css';

// Extracted Conversation component to prevent remounting when parent re-renders
function Conversation({ webSocket, currentUserName, groupId }) {
    const [chats, setChats] = React.useState([]);
    const containerRef = React.useRef(null);
    const historyReceivedRef = React.useRef(false);

    console.log('Conversation component rendered for user:', currentUserName, 'groupId:', groupId);

    // helper: format timestamps nicely
    function formatTime(ts) {
        const d = new Date(ts);
        return d.toLocaleString();
    }

    // check whether to show a timestamp before this message
    function shouldShowTimestamp(index) {
        if (index === 0) return true;
        const prev = chats[index - 1];
        const cur = chats[index];
        if (!prev || !cur || !prev.ts || !cur.ts) return true;
        const diffMs = new Date(cur.ts) - new Date(prev.ts);
        return diffMs > 1000 * 60 * 60; // > 1 hour
    }

    // scroll to bottom whenever chats change
    React.useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [chats]);

    // handle incoming chat messages (and initial history)
    React.useEffect(() => {
        console.log('Setting up observer for user:', currentUserName);
        const handler = (chat) => {
            if (chat.event === 'history') {
                console.log(`[${currentUserName}] Received history event. historyReceivedRef.current:`, historyReceivedRef.current, 'chats:', chat.msg?.length || 0);
                if (!historyReceivedRef.current) {
                    console.log(`[${currentUserName}] Applying history for the first time`);
                    historyReceivedRef.current = true;
                    setChats([...(chat.msg || [])]);
                } else {
                    console.log(`[${currentUserName}] Ignoring duplicate history event`);
                }
                return;
            }

            if (chat.event === 'received' || chat.event === 'sent') {
                console.log(`[${currentUserName}] Received chat message from`, chat.from);
                const messageObj = {
                    from: chat.from,
                    msg: chat.msg,
                    ts: chat.ts || new Date().toISOString()
                };
                setChats(prev => [...prev, messageObj]);
            }
        };

        webSocket.addObserver(handler);
        return () => {
            console.log(`[${currentUserName}] Cleaning up observer`);
            webSocket.removeObserver(handler);
        };
    }, [webSocket, currentUserName]);

    return (
        <section>
            <div id='chat-text' ref={containerRef} style={{ overflowY: 'auto', padding: '8px' }}>
                {chats.map((chat, index) => {
                    const isMe = chat.from === currentUserName || chat.from === 'Me';
                    return (
                        <div
                            key={index}
                            className={`messageRow ${isMe ? 'myMessageRow' : 'theirMessageRow'}`}
                            style={{ display: 'flex', justifyContent: isMe ? 'flex-end' : 'flex-start', marginBottom: '6px' }}
                        >
                            <div className={`messageBubble ${isMe ? 'myBubble' : 'theirBubble'}`} style={{ maxWidth: '75%' }}>
                                <div style={{ fontWeight: 'bold' }}>{chat.from}</div>
                                <div>{chat.msg}</div>
                                {shouldShowTimestamp(index) && (
                                    <div style={{ fontSize: '0.75em', color: '#999', marginTop: '4px' }}>{formatTime(chat.ts)}</div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export function GroupDetail() {
    const { groupId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const [usersInGroup, setUsersInGroup] = React.useState([]);
    const [currentUserName, setCurrentUserName] = React.useState(location.state?.currentUser || 'Guest'); 

    const webSocket = React.useMemo(() => new ChatClient(groupId), [groupId]);

    const navigatingToMessagingRef = React.useRef(false);

    React.useEffect(() => {
        if (webSocket.connected) {
            webSocket.registerUser(currentUserName);
        } else {
            // If not connected yet, wait for connection
            const checkConnection = setInterval(() => {
                if (webSocket.connected) {
                    webSocket.registerUser(currentUserName);
                    clearInterval(checkConnection);
                }
            }, 100);
            return () => clearInterval(checkConnection);
        }
    }, [webSocket, currentUserName]);

    // Subscribe to initial user list
    React.useEffect(() => {
        const handleUserList = (users) => {
            setUsersInGroup(prev => {
                const allUsers = [...users];
                if (!allUsers.includes(currentUserName)) {
                    allUsers.push(currentUserName);
                }
                return allUsers;
            });
        };

        webSocket.addUserListObserver(handleUserList);

        return () => {
            webSocket.removeUserListObserver(handleUserList);
        };
    }, [webSocket, currentUserName]);


    React.useEffect(() => {
        const handlePresenceChange = (data) => {
            if (data.event === 'joined') {
                // Add user if not already in list
                setUsersInGroup(prev => 
                    prev.includes(data.user) ? prev : [...prev, data.user]
                );
            } else if (data.event === 'left') {
                // Remove user from list
                setUsersInGroup(prev => prev.filter(user => user !== data.user));
            }
        };

        webSocket.addPresenceObserver(handlePresenceChange);

        return () => {
            webSocket.removePresenceObserver(handlePresenceChange);
        };
    }, [webSocket]);

    const handleUserClick = (targetUserName) => {
        console.log('User clicked:', targetUserName);

        navigatingToMessagingRef.current = true;

        // Save current user email to localStorage for messaging
        localStorage.setItem('userEmail', currentUserName);

        navigate(`/messaging/${targetUserName}`, {
            state: { currentUser: currentUserName }
        });
    };

    const handleBack = () => {
        // Close the WebSocket; the server will broadcast 'left' presence to other clients
        if (webSocket && typeof webSocket.close === 'function') {
            try { webSocket.close(); } catch(e) { console.warn('Error closing websocket', e); }
        }
        navigate('/discover');
    };


    React.useEffect(() => {
        return () => {
            if (navigatingToMessagingRef.current) {

                navigatingToMessagingRef.current = false;
                return;
            }
            if (webSocket && typeof webSocket.close === 'function') {
                try { webSocket.close(); } catch (e) { console.warn('Error closing websocket on unmount', e); }
            }
        };
    }, [webSocket]);

    function Message({ name, webSocket }) {
        const [message, setMessage] = React.useState('');

        const disabled = name === '' || !webSocket.connected;

        function doneMessage(e) {
            if (e.key === 'Enter') {
                sendMsg();
            }
        }

        function sendMsg() {
            webSocket.sendMessage(name, message);
            setMessage('');
        }

        return (
            <section>
                <fieldset id='chat-controls'>
                    <legend>Chat</legend>
                    <input disabled={disabled} onKeyDown={(e) => doneMessage(e)} value={message} onChange={(e) => setMessage(e.target.value)} type='text' />
                    <button disabled={disabled || !message} onClick={sendMsg}>
                        Send
                    </button>
                </fieldset>
            </section>
        );
    }


    return (
        <main className='container-fluid bg-secondary text-center'>
            <h1><strong>{groupId}</strong></h1>
            <p> start chatting</p>

            {/* Display the list of users*/}
            <div className="user-list-section">
                <h2>Users in Group</h2>
                {usersInGroup.length > 0 ? (
                    <ul>
                        {usersInGroup.map((user, index) => (
                            // Only make the user clickable if it is not the current user
                            user !== currentUserName ? (
                                <li key={index}>
                                    <button
                                        type="button"
                                        onClick={() => handleUserClick(user)}
                                        className="btn btn-link"
                                        style={{ padding: 0, border: 'none', background: 'transparent', cursor: 'pointer', textDecoration: 'underline' }}
                                    >
                                        {user}
                                    </button>
                                </li>
                            ) : (
                                <li key={index}>
                                    {user} (You)
                                </li>
                            )
                        ))}
                    </ul>
                ) : (
                    <p>No user data available (might need to fetch from API if refreshed)</p>
                )}
            </div>

            <div className="chat-window">
                <Conversation webSocket={webSocket} currentUserName={currentUserName} groupId={groupId} />
                <Message name={currentUserName} webSocket={webSocket} />
            </div>

            <button className="btn btn-primary redbutton" onClick={handleBack}>
                Back to Discover
            </button>
        </main>
    )
}