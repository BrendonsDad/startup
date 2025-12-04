import React from 'react';
import './discover.css';
import { useNavigate } from 'react-router-dom';

export function Discover(props) {
  const [userName, setUserName] = React.useState(props.userName);
  const navigate = useNavigate();

  const handleCardClick = async (groupId) => {
    navigate(`/groups/${groupId}`, { state: { currentUser: userName } });
  };

  return (
    <main className="container-fluid bg-secondary text-center">
        <h1>JOIN GROUPS IN YOUR AREA</h1>

        <div className="container">
          {props.groups.map((grp, index) => (
            <div 
              className='card' 
              key={index} 
              onClick={() => handleCardClick(grp.name)}
              style={{ cursor: 'pointer'}}
            >
              <h4>{grp.name}</h4>
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