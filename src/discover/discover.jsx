import React from 'react';
import './discover.css';
import { useNavigate } from 'react-router-dom';

export function Discover({ groups, onMakeGroup }) {
  const navigate = useNavigate();

  return (
    <main className="container-fluid bg-secondary text-center">
        <h1>JOIN GROUPS IN YOUR AREA</h1>

        <div className="container">
          <div className="card">
            <h4>Punk Rock Lovers (Provo)</h4>
            <img src="guitar.jpg" width="200px" alt="guitar"/>
          </div>
          <div className="card">
            <h4>Intremural Football (Saturdays)</h4>
            <img src="football.jpg" width="200px" alt="football"/>
          </div>
          <div className="card">
            <h4>Medeival Larping</h4>
            <img src="sword.jpg" width="200px" alt="sword"/>
          </div>
          <div className="card">
            <h4>Orem Baseball</h4>
            <img src="baseballmit.jpg" width="200px" alt="baseball mit"/>
          </div>
          <div className="card">
            <h4>Hiking Club</h4>
            <img src="mountains.jpg" width="200px" alt="Mountain range"/>
          </div>
          <div className="card">
            <h4>Sunset Squad</h4>
            <img src="beach.jpg" width="200px" alt="Sunset at beach"/>
          </div>
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