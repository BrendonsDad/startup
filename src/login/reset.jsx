import React, { useState } from "react";
import { RecoveryContext } from "../app";
import { useNavigate } from 'react-router-dom';
import { AuthState } from "./authState";


export function Reset() {
  const navigate = useNavigate();
  // Get email and onAuthChange from the context
  const { email, onAuthChange } = React.useContext(RecoveryContext);

  const [userName, setUserName] = React.useState(email);
  const [ password, setPassword ] = useState("");
  const [ confirmPassword, setConfirmPassword ] = useState("");

  async function changePassword() {
    // 1. Basic validation (optional, improve as needed)
    if (password !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    const response = await fetch('/api/auth/update_password', {
      method: 'post',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }, 
    })

    if (response?.status !== 200) {
      const body = await response.json();
      alert(`⚠ Error: ${body.msg}`);
      return;
    }
    // 2. Here you would typically send the new password to your backend server
    // 3. Log the user in and redirect to success page
    localStorage.setItem('userName', email); // Assuming email is used as username
    onAuthChange(email, AuthState.Authenticated);

    navigate("/");
  }

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="card shadow-lg mx-auto w-100"
        style={{ maxWidth: "400px" }}
      >
        <div className="card-body">
          <h2 className="mb-4 text-center fw-bold">Change Password</h2>
          <form className="mb-3">
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                New Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="form-control"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirm-password" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                placeholder="••••••••"
                className="form-control"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="form-check mb-3">
              <input
                id="newsletter"
                type="checkbox"
                className="form-check-input"
                required
              />
              <label htmlFor="newsletter" className="form-check-label">
                I accept the{" "}
                <a href="#" className="text-primary">
                  Terms and Conditions
                </a>
              </label>
            </div>
            <button
              type="button"
              onClick={changePassword}
              className="btn btn-primary redbutton w-100"
            >
              Reset password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
