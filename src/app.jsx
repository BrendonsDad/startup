import React from 'react';
import {BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Messaging } from './messaging/messaging';
import { Discover } from './discover/discover';
import { About } from './about/about';
import { AuthState } from './login/authState'
import { CreateGroup } from './discover/createGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

function App() {
    const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
    const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = React.useState(currentAuthState);
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

    const handleCreateGroup = (name) => {
        const newGroups = [...groups, { name }];
        setGroups(newGroups);
        localStorage.setItem('groups', JSON.stringify(newGroups));
    };
  return (
    <BrowserRouter>
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
                            onAuthChange={(userName, authState) => {
                                setAuthState(authState);
                                setUserName(userName);
                            }}
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
                <Route path='*' element={<NotFound />} />
            </Routes>

            <footer className="bg-dark text-white-50">
                <div className="container-fluid">
                    <span className="text-reset">Aubury Orr</span>
                    <a className="text-reset" href="https://github.com/BrendonsDad/startup">GitHub</a>
                </div>
            </footer>
        </div>
    </BrowserRouter>
  );
}

function NotFound() {
    return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
  }

export default App;