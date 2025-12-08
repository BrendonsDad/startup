import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function MessagingGeneric() {
  const navigate = useNavigate();
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserEmail, setCurrentUserEmail] = useState(null);

  // Get current user from localStorage
  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    setCurrentUserEmail(userEmail);
  }, []);

  // Fetch conversations
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await fetch('/api/conversations');
        if (!response.ok) {
          console.error('Failed to fetch conversations');
          setLoading(false);
          return;
        }

        const data = await response.json();
        setConversations(data);
      } catch (error) {
        console.error('Error fetching conversations:', error);
      } finally {
        setLoading(false);
      }
    };

    if (currentUserEmail) {
      fetchConversations();
    }
  }, [currentUserEmail]);

  const formatTime = (timestamp) => {
    const d = new Date(timestamp);
    return d.toLocaleString();
  };

  const getLastMessagePreview = (lastMessage) => {
    if (!lastMessage) return 'No messages yet';
    return lastMessage.msg.substring(0, 25) + (lastMessage.msg.length > 25 ? '...' : '');
  };

  const handleConversationClick = (conversationId, participantEmail) => {
    navigate(`/messaging/${participantEmail}`);
  };

  if (loading) {
    return (
      <main className="container-fluid bg-secondary text-center">
        <h1>Loading...</h1>
      </main>
    );
  }

  if (conversations.length === 0) {
    return (
      <main className="container-fluid bg-secondary text-center">
        <h1>Messaging</h1>
        <p>Go to the Discover page to find friends, join a group chat, or begin a direct message.</p>
        <div className="makeGroup">
          <button
            className="btn btn-primary redbutton"
            onClick={() => navigate('/discover')}
          >
            Go to Discover
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="container-fluid bg-secondary text-center">
      <h1>Conversations</h1>
      <div className="conversations-list" style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px' }}>
        {conversations.map((conv) => (
          <div
            key={conv._id}
            onClick={() => handleConversationClick(conv._id, conv.participantEmail)}
            style={{
              background: '#202022',
              padding: '12px',
              borderRadius: '6px',
              marginBottom: '12px',
              cursor: 'pointer',
              textAlign: 'left',
              border: conv.isUnread ? '2px solid #c23333' : '1px solid #eee',
              color: '#fff',
              position: 'relative',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#28282a'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#202022'}
          >
            <div style={{ fontWeight: conv.isUnread ? 'bold' : 'normal', fontSize: '1.1em' }}>
              {conv.participantEmail}
            </div>
            <div style={{ fontSize: '0.9em', color: '#ccc', fontWeight: conv.isUnread ? '600' : 'normal' }}>
              Last message by: {conv.lastMessage ? conv.lastMessage.from : 'N/A'}
            </div>
            <div style={{ fontSize: '0.85em', color: '#999', marginTop: '4px', fontWeight: conv.isUnread ? '600' : 'normal' }}>
              {getLastMessagePreview(conv.lastMessage)}
            </div>
            <div style={{ fontSize: '0.8em', color: '#999', marginTop: '4px' }}>
              {conv.updatedAt ? formatTime(conv.updatedAt) : 'No timestamp'}
            </div>
            {conv.isUnread && (
              <span style={{
                position: 'absolute',
                top: '12px',
                right: '18px',
                background: '#c23333',
                color: '#fff',
                borderRadius: '12px',
                padding: '4px 10px',
                fontWeight: 'bold',
                fontSize: '0.8em'
              }}>
                unread
              </span>
            )}
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px' }}>
        <button
          className="btn btn-primary redbutton"
          onClick={() => navigate('/discover')}
        >
          Go to Discover
        </button>
      </div>
    </main>
  );
}

export default MessagingGeneric;
