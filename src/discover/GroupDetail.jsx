import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ChatClient } from './ChatClient';

export function GroupDetail() {
    const { groupId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const [usersInGroup, setUsersInGroup] = React.useState(location.state?.users || []);
    const [currentUserName, setCurrentUserName] = React.useState(location.state?.currentUser || 'Guest'); 

    const webSocket = React.useMemo(() => new ChatClient(groupId), [groupId]);

    const handleBack = async () => {
        try {
            const response = await fetch('/api/group/group_removeuser', {
                method: 'delete', 
                headers: { 'Content-Type': 'application/json'}, 
                body: JSON.stringify({ username: currentUserName, group: groupId })
            });

            if (response.ok) {
                console.log(`User ${currentUserName} removed from group ${groupId}`)
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

    function Message({ name, webSocket }) {
        const [message, setMessage] = React.useState('');

        const disabled = name === '' || !webSocket.connected;
        

        // Add these logs
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
                            <li key={index}>{user}</li>
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