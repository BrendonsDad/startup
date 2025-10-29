import React from 'react';
import './messaging.css';
export function Messaging() {
  return (
    <main className="container-fluid bg-secondary text-center">
        <h1 className="Messaging">Messaging</h1>
        <div className="friend">
            <p>Mellisa</p>
        </div>
        <div className="invite">
            <button className="btn btn-primary redbutton">
                <p>Invite to hang</p>
              </button>
        </div>

        <div className="sharesong ">
            <button className="btn btn-secondary redbutton">
                <p>Share a song</p>
              </button>
        </div>
        <div className="message">
          <form method="get">
              <div className="input-group mb-3">
                <span className="input-group-text">⭕</span>
                <input className="form-control" type="text" placeholder="say hi!" />
                <button type="submit" className="btn btn-primary redbutton">Send</button>
              </div>
            </form>
        </div>


    </main>
  );
}