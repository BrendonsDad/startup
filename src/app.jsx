import React from 'react';
import {BrowserRouter, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { Login } from './login/login';
import { Messaging } from './messaging/messaging';
import { Discover } from './discover/discover';
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

    // function NavigateComponents() {
    //     if (page === "login") return <Login setPage={setPage}/>;
    //     if (page === "otp") return <OTPInput email={email} setOTP={setOTP} setPage={setPage} />;
    //     if (page === "reset") return <Reset email={email} otp={otp} setPage={setPage} />;
    //     return <Recovered />;
    // }

    const [groups, setGroups] = React.useState(() => {
        // On initial load, read from LocalStorage (if exists) else default list
        const saved = localStorage.getItem('groups');
        return saved ? JSON.parse(saved) : [
            { name: 'Punk Rock Lovers (Provo)'},
            { name: 'Intramural Football (Saturdays'},
            { name: 'Medieval Larping '},
            { name: 'Orem Baseball'},
            { name: 'Hiking Club'},
            { name: 'Sunset Squad'},
        ];
    });

    // how can I add more statess to app.jsx, such as my OTPInput.jsx state, my recovered.jsx state, and a reset.jsx state. (these can be found in src/login)

    // Function to handle creation of a new group
    const handleCreateGroup = (name) => {
        const newGroups = [...groups, { name }];
        setGroups(newGroups);
        localStorage.setItem('groups', JSON.stringify(newGroups));
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
                <Route path='/discover' element={<Discover groups={groups}/>} />
                <Route path='/messaging' element={<Messaging />} />
                <Route path='/about' element={<About />} />
                <Route path='/create-group'element={
                    <CreateGroup onCreate={handleCreateGroup} />
                }/>
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