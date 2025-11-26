import React from 'react';
import { RecoveryContext } from "../app";

import Button from 'react-bootstrap/Button';
import { MessageDialog } from './messageDialog';

export function Unauthenticated(props) {
    const [userName, setUserName] = React.useState(props.userName);
    const [password, setPassword] = React.useState('');
    const [displayError, setDisplayError] = React.useState(null);

    // For password recovery
    const {setEmail, email, setOTP } = React.useContext(RecoveryContext);

    async function loginUser() {
        loginOrCreate('/api/auth/login');
    }

    async function createUser() {
        loginOrCreate('/api/auth/create');
    }

    async function loginOrCreate(endpoint) {
        const response = await fetch(endpoint, {
            method: 'post',
            body: JSON.stringify({ email: userName, password: password }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }, 
        })
        if (response?.status === 200) {
            localStorage.setItem('userName', userName);
            props.onLogin(userName);
        } else {
            const body = await response.json();
            setDisplayError(`⚠ Error: ${body.msg}`);
        }
    }

    const handleInputChange = (e) => {
        setEmail(e.target.value);
        setUserName(e.target.value);
    }

    return (
        <>
            <h1>We will <i>never</i> sell or share your personal information.</h1>
            <h3>Sign up or log in</h3>
            <div className="form">
                <form method="get" action="discover.html">
                <h3> Create an Account</h3>
                <div className="input-group mb-3">
                    <span className="input-group-text">@</span>
                    <input className="form-control"type="text" onChange={handleInputChange} placeholder="Email" />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">🔒</span>
                    <input className="form-control" type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                </div>

                <Button variant="secondary" className="btn btn-primary redbutton" onClick={() => createUser()} disabled={!userName || !password}>
                    Create
                </Button>
                
                </form>

                <form method="get" action="discover.html">
                <h3>Login</h3>
                <div className="input-group mb-3">
                    <span className="input-group-text">U</span>
                    <input className="form-control"type="text" onChange={handleInputChange} placeholder="Email" />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">🔒</span>
                    <input className="form-control" type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                </div>

                <Button variant="secondary" className="btn btn-primary redbutton" onClick={() => loginUser()} disabled={!userName || !password}>
                    Login
                </Button>
                <p>
                    Forgot password? Click <a
                                              href=""
                                              className="text-reset"
                                              onClick={(e) => {
                                                e.preventDefault();
                                                props.navigateToOtp()
                                              }}
                                              >
                                                <u>here:</u>
                                            </a>
                </p>

                </form>
            </div>
            <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
        </>
    );
}