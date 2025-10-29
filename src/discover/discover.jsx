import React from 'react';
import './discover.css';
import { useNavigate } from 'react-router-dom';

export function Discover({ groups, onMakeGroup }) {
  const navigate = useNavigate();

  return (
    <main className="container-fluid bg-secondary text-center">
        <h1>JOIN GROUPS IN YOUR AREA</h1>

        <div className="container">
          {groups.map((grp, index) => (
            <div className='card' key={index}>
              <h4>{grp.name}</h4>
              {/* You can add more group details here if needed */}
            </div>
          ))}
        </div>

        <div className="makeGroup">
            <button 
              className="btn btn-primary redbutton"
              onClick={() => navigate('/create-group')}
            >
              <p>+ Make a Group</p>
            </button>
        </div>
    </main>
  );
}