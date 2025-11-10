import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { RecoveryContext } from "../app";

import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';
import { AuthState } from './authState';
import axios from 'axios';

export function Login({ userName, authState, onAuthChange }) {
  const navigate = useNavigate();
  const { setEmail, email, setOTP } = React.useContext(RecoveryContext);

  function navigateToOtp() {
    if (email) {
      const OTP = Math.floor(Math.random() * 900000) + 100000;
      console.log(`OTP for ${email} is ${OTP}`);
      setOTP(OTP);

      axios
        .post("http://localhost:5000/send_recovery_email", {
          OTP,
          recipient_email: email,
        })
        .then(() => {
          navigate("/recover-otp");
        })
        .catch(console.log);
      return;
    }
    return alert("Please enter your email address.");
  }
  return (
    <main className='container-fluid bg-secondary text-center'>
      <div>
        {authState === AuthState.Authenticated && (
          <Authenticated userName={userName} onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)} />
        )}
        {authState === AuthState.Unauthenticated && (
          <Unauthenticated
            userName={userName}
            onLogin={(loginUserName) => {
              onAuthChange(loginUserName, AuthState.Authenticated);
            }}
            navigateToOtp={navigateToOtp} // <-- Pass the function as a prop
          />
        )}
      </div>
    </main>
  );
}
