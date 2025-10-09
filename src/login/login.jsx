import React from 'react';

export function Login() {
  return (
    <main className="container-fluid bg-secondary text-center">
      <h1>We will <i>never</i> sell your personal information. We don't even need your email.</h1>
      <h3>Sign up or log in</h3>
      <div className="form">
        <form method="get" action="discover.html">
          <h3> Create an Account</h3>
          <div className="input-group mb-3">
            <span className="input-group-text">U</span>
            <input className="form-control"type="text" placeholder="Username" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">@</span>
            <input className="form-control"type="text" placeholder="email (optional)" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">🔒</span>
            <input className="form-control" type="password" placeholder="password" />
          </div>

          <button type="submit" className="btn btn-primary redbutton">Create</button>
          
        </form>

        <form method="get" action="discover.html">
          <h3>Login</h3>
          <div className="input-group mb-3">
            <span className="input-group-text">U</span>
            <input className="form-control"type="text" placeholder="Username or Email" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">🔒</span>
            <input className="form-control" type="password" placeholder="password" />
          </div>

          <button type="submit" className="btn btn-primary redbutton">Login</button>
          <p>Forgot password? Click <u>here:</u></p>

        </form>
      </div>
    </main>
  );
}