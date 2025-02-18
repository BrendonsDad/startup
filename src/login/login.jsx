import React from 'react';

export function Login() {
  return (
    <main className="container-fluid bg-secondary text-center">
      <h1>We are glad you are <i>here.</i> We will help you get out <i>there.</i></h1>
      <h3>Sign up or log in</h3>
      <div className="form">
        <form method="get" action="discover.html">
          <div className="input-group mb-3">
            <span className="input-group-text">@</span>
            <input className="form-control"type="text" placeholder="your@email.com" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">🔒</span>
            <input className="form-control" type="password" placeholder="password" />
          </div>
          <div className="input-group mb-3">
              <span className="input-group-text">DOB</span>
              <input className="form-control" type="date" placeholder="mm/dd/yyyy" />
            </div>
          <button type="submit" className="btn btn-primary">Create</button>
          <p>Already have an Account? Here:</p>
          <button type="submit" className="btn btn-secondary">Login</button>
        </form>
      </div>
    </main>
  );
}