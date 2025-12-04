import React from 'react';
import {BrowserRouter, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { Login } from './login/login';
import { Messaging } from './messaging/messaging';
import MessagingGeneric from './messaging/messagingGeneric';
import { Discover } from './discover/discover';
import { GroupDetail } from './discover/groupDetail';
import { About } from './about/about';
import { AuthState } from './login/authState'
import { CreateGroup } from './discover/createGroup';
import { OTPInput } from './login/OTPInput';
import { Recovered } from './login/recovered';
import { Reset } from './login/reset';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { createContext } from 'react';
export const RecoveryContext = createContext();
function App() {
    const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
    const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = React.useState(currentAuthState);
    
    // const [showRecovery, setShowRecovery] = React.useState(false);

    // const [ page, setPage ] = React.useState("login");
    const [ email, setEmail ] = React.useState();
    const [ otp, setOTP ] = React.useState();

    // Initialize groups as an empty array, state will be populated by server
    const [groups, setGroups] = React.useState([]);

    // Function to fetch groups from the server
    const fetchGroups = async () => {
        if (authState === AuthState.Authenticated) {
            try {
                // Use fetch to get groups from the API endpoint
                const response = await fetch('/api/groups');
                if (response.ok) {
                    const data = await response.json();
                    setGroups(data);
                } else {
                    console.error('Failed to fetch groups:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching groups:', error);
            }
        }
    };

    // Use useEffect to fetch groups whenever the auth state changes
    React.useEffect(() => {
        fetchGroups();
    }, [authState]); // Dependency array: runs when authState changes

    // Function to handle creation of a new group on the server
    const handleCreateGroup = async (name) => {
        try {
            const response = await fetch('/api/group', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name }), // Send only the name
            });

            if (response.ok) {
                // Get the updated list of groups from the server response
                const updatedGroups = await response.json();
                setGroups(updatedGroups);
            } else {
                console.error('Failed to create group:', response.statusText);
            }
        } catch (error) {
            console.error('Error creating group:', error);
        }
    };


    const onAuthChange = (userName, authState) => {
        setUserName(userName);
        setAuthState(authState);
    }

    // Define the context value directly
    const recoveryContextValue = {
        email,
        setEmail,
        otp,
        setOTP,
        onAuthChange: onAuthChange
        // We no longer need setPage or setShowRecovery in context
    };

  return (
    <BrowserRouter>
        <RecoveryContext.Provider value={recoveryContextValue}>
        <div className="top-header">
            What's Freindzie? <NavLink className="nav-link active" to="about"> Click Here</NavLink> for more info.
        </div>
        <div className="body bg-secondary text-light">
            <header className="container-fluid">
                <div className="LogoHeader">
                    <nav className="navbar navbar-dark">
                        <NavLink className="navbar-brand" to="/">Freindzie<sup>&reg;</sup></NavLink>
                        {/* <a className="navbar-brand" href="#">Freindzie<sup>&reg;</sup></a> */}
                    </nav>
                    <div><img src="skull.png" alt="random" width="50" height="50"/></div> 
                </div>
                <nav>
                    <menu className="navbar-nav">
                        <li className="nav-item"><NavLink className="nav-link" to="/">Home</NavLink></li>
                        {authState === AuthState.Authenticated && (
                            <li className="nav-item"><NavLink className="nav-link" to="discover">Discover</NavLink></li>
                        )}
                        {authState === AuthState.Authenticated && (
                            <li className="nav-item"><NavLink className="nav-link" to="messaging">Messaging</NavLink></li>
                        )}
                        <li className="nav-item"><NavLink className="nav-link" to="about">About</NavLink></li>
                    </menu></nav>
            </header>

            <Routes>
                <Route 
                    path='/' 
                    element={
                        <Login 
                            userName={userName}
                            authState={authState}
                            onAuthChange={onAuthChange}
                        />
                    } 
                    exact 
                />
                <Route 
                    path='/discover' 
                    element={
                        <Discover 
                            groups={groups}
                            userName={userName}
                        />
                    } 
                />
                <Route path='/messaging' element={<MessagingGeneric />} />
                <Route path='/messaging/:targetUserName' element={<Messaging />} />
                <Route path='/about' element={<About />} />
                <Route path='/create-group'element={
                    <CreateGroup onCreate={handleCreateGroup} />
                }/>
                <Route path="/groups/:groupId" element={<GroupDetail />} />
                <Route path='/recover-otp' element={<OTPInput />} />
                <Route path='/recover-reset' element={<Reset />} />
                <Route path='recovered-success' element={<Recovered />} />

                <Route path='*' element={<NotFound />} />
            </Routes>

            <footer className="bg-dark text-white-50">
                <div className="container-fluid">
                    <span className="text-reset">Aubury Orr</span>
                    <a className="text-reset" href="https://github.com/BrendonsDad/startup">GitHub</a>
                </div>
            </footer>
        </div>
        </RecoveryContext.Provider>
    </BrowserRouter>
  );
}

function NotFound() {
    return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
  }

export default App;