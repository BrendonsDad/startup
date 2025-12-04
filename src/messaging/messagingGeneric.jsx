import React from 'react';
import { useNavigate } from 'react-router-dom';

export function MessagingGeneric() {
  const navigate = useNavigate();

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

export default MessagingGeneric;
