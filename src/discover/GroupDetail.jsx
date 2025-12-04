import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ChatClient } from './ChatClient';

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

        navigate(`/messaging/${targetUserName}`, {
            state: { currentUser: currentUserName }
        });
    };

    const handleBack = async () => {
        try {
            const response = await fetch('/api/group/group_removeuser', {
                method: 'delete', 
                headers: { 'Content-Type': 'application/json'}, 
                body: JSON.stringify({ username: currentUserName, group: groupId })
            });

            if (response.ok) {
                console.log(`User ${currentUserName} removed from group ${groupId}`)

                if (webSocket && typeof webSocket.close === 'function') {
                    try { webSocket.close(); } catch(e) { console.warn('Error closing websocket', e); }
                }
                navigate('/discover');
            } else {
                console.error('Failed to leave group:', response.statusText);
                navigate('/discover');
            }
        } catch (error) {
            console.error('Network error while leaving group:', error);
            navigate('/discover');
        }
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
        

        //testing
        console.log(`Input disabled status: ${disabled}`);
        console.log(`Is name empty? ${name === ''}`);
        console.log(`Is WebSocket connected? ${webSocket.connected}`);

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
                    <input disabled={disabled} onKeyDown={(e) => doneMessage(e)} value={message} onChange={(e) => setMessage(e.target.value)}  type='text' />
                    <button disabled={disabled || !message} onClick={sendMsg}>
                        Send
                    </button>
                </fieldset>
            </section>

        );
    }

    function Conversation({ webSocket }) {
        const [chats, setChats] = React.useState([]);


        React.useEffect(() => {
            const handler = (chat) => {
                setChats((prevMessages) => [...prevMessages, chat]);
            };

            webSocket.addObserver(handler);
            
            return () => {
                webSocket.removeObserver(handler);
            };
        }, [webSocket]);

        const chatEls = chats.map((chat, index) => (
            <div key={index}>
                <span className={chat.event}>{chat.from}</span> {chat.msg}
            </div>
        ));
        return (
            <section>
                <div id='chat-text'>{chatEls}</div>
            </section>
        )
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
                <Message name={currentUserName} webSocket={webSocket} />
                <Conversation webSocket={webSocket} />
            </div>

            <button className="btn btn-primary redbutton" onClick={handleBack}>
                Back to Discover
            </button>
        </main>
    )
}