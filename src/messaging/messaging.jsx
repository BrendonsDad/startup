import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { DMChatClient } from '../discover/DMChatClient';
import './messaging.css';


export function Messaging() {
  const { targetUserName } = useParams();
  const location = useLocation();
  const currentUserName = location.state?.currentUser || 'Guest';
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);

  const dmWebSocketRef = useRef(null);

  useEffect(() => {
    dmWebSocketRef.current = new DMChatClient(currentUserName, targetUserName);

    const handleNewMessage = (fromUser, msg) => {
      setMessages(prev => [...prev, { from: fromUser, text: msg }]);
    };

    dmWebSocketRef.current.addObserver(handleNewMessage);

    return () => {
      dmWebSocketRef.current.removeObserver(handleNewMessage);
    };
  }, [currentUserName, targetUserName]);

  // handle form submit
  const handleSend = (e) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed) return; // ignore empty send
    // add to messages

    // Send the message via WebSocket
    if (dmWebSocketRef.current && dmWebSocketRef.current.connected) {
      dmWebSocketRef.current.sendMessage(targetUserName, trimmed);
      setMessages(prev => [...prev, { from: 'Me', text: trimmed }]);
      setInputValue(''); // clear input
    } else {
      console.error('WebSocket is not connected.');
    }
    
  }
  const handleHangout = (e) => {
    e.preventDefault();
    alert("Hangout invitation sent!");
  }

  return (
    <main className="container-fluid bg-secondary text-center">
        <h1 className="Messaging">Chatting with {targetUserName}</h1>
        {/* <div className="friend">
            <p>Mellisa</p>
        </div>
        <div className="invite">
            <button onClick={handleHangout} className="btn btn-primary redbutton">
                <p>Invite to hang</p>
              </button>
        </div> */}

        {/* Render the list of messages */}
        <div className='messagesList sharesong'>
          {messages.map((msg, index) => (
            <div key={index} className={`messageItem ${msg.from === 'Me' ? 'myMessage' : 'theirMessage'}`}>
              <strong>{msg.from}:</strong> {msg.text}
            </div>
          ))}
        </div>

        <div className="message">
          <form onSubmit={handleSend}>
              <div className="input-group mb-3">
                <span className="input-group-text">⭕</span>
                <input className="form-control" type="text" placeholder="say hi!" value={inputValue} onChange={e => setInputValue(e.target.value)}/>
                <button type="submit" className="btn btn-primary redbutton">Send</button>
              </div>
            </form>
        </div>
    </main>
  );
}