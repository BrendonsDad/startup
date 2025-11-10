import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom'; // if you ever want to navigate
import './messaging.css';


export function Messaging() {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);

  // handle form submit
  const handleSend = (e) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed) return; // ignore empty send
    // add to messages
    setMessages(prev => [...prev, trimmed]);
    setInputValue(''); // clear input
  }
  const handleHangout = (e) => {
    e.preventDefault();
    alert("Hangout invitation sent!");
  }

  return (
    <main className="container-fluid bg-secondary text-center">
        <h1 className="Messaging">Messaging</h1>
        <div className="friend">
            <p>Mellisa</p>
        </div>
        <div className="invite">
            <button onClick={handleHangout} className="btn btn-primary redbutton">
                <p>Invite to hang</p>
              </button>
        </div>

        {/* Render the list of messages */}
        <div className='messagesList sharesong'>
          {messages.map((msg, index) => (
            <div key={index} className="messageItem">
              {msg}
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