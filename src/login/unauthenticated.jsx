import React from 'react';

import Button from 'react-bootstrap/Button';
import { MessageDialog } from './messageDialog';

export function Unauthenticated(props) {
    const [userName, setUserName] = React.useState(props.userName);
    const [password, setPassword] = React.useState('');
    const [displayError, setDisplayError] = React.useState(null);

    async function loginUser() {
        localStorage.setItem('userName', userName);
        props.onLogin(userName);
    }

    async function createUser() {
        localStorage.setItem('userName', userName);
        props.onLogin(userName)
    }

    return (
        <>
            <h1>We will <i>never</i> sell your personal information. We don't even need your email.</h1>
            <h3>Sign up or log in</h3>
            <div className="form">
                <form method="get" action="discover.html">
                <h3> Create an Account</h3>
                <div className="input-group mb-3">
                    <span className="input-group-text">U</span>
                    <input className="form-control"type="text" onChange={(e) => setUserName(e.target.value)} placeholder="Username" />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">@</span>
                    <input className="form-control"type="text" placeholder="email (optional)" />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">🔒</span>
                    <input className="form-control" type="password" onChange={(e) => setPassword(e.target.value)} placeholder="password" />
                </div>

                <Button variant="secondary" className="btn btn-primary redbutton" onClick={() => createUser()} disabled={!userName || !password}>
                    Create
                </Button>
                
                </form>

                <form method="get" action="discover.html">
                <h3>Login</h3>
                <div className="input-group mb-3">
                    <span className="input-group-text">U</span>
                    <input className="form-control"type="text" onChange={(e) => setUserName(e.target.value)} placeholder="Username or Email" />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">🔒</span>
                    <input className="form-control" type="password" onChange={(e) => setPassword(e.target.value)} placeholder="password" />
                </div>

                <Button variant="secondary" className="btn btn-primary redbutton" onClick={() => loginUser()} disabled={!userName || !password}>
                    Login
                </Button>
                <p>Forgot password? Click <u>here:</u></p>

                </form>
            </div>
            <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
        </>
    );
}