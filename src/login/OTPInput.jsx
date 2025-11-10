import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { RecoveryContext } from "../app";


export function OTPInput() {
  const navigate = useNavigate();
  const { email, otp } = React.useContext(RecoveryContext);
  const [timerCount, setTimer] = React.useState(60);
  const [OTPinput, setOTPinput] = React.useState([0, 0, 0, 0, 0, 0]);
  const [disable, setDisable] = React.useState(true);
  const [failedAttempts, setFailedAttempts] = React.useState(0);
  const [lockout, setLockout] = useState(false);
  const [lockoutTimer, setLockoutTimer] = React.useState(0);

  function resendOTP() {
    if (disable) return;
    axios
      .post("http://localhost:5000/send_recovery_email", {
        OTP: otp,
        recipient_email: email,
      })
      .then(() => setDisable(true))
      .then(() => alert("A new OTP has succesfully been sent to your email."))
      .then(() => setTimer(60))
      .catch(console.log);
  }

  function verfiyOTP() {
    if (lockout) return;
    if (parseInt(OTPinput.join("")) === otp) {
      navigate("/recover-reset");
      setFailedAttempts(0);
      return;
    }
    setFailedAttempts((prev) => {
      const next = prev + 1;
      if (next >= 4) {
        setLockout(true);
        setLockoutTimer(240); // 4 minutes
      }
      return next;
    });
    alert(
      "The code you have entered is not correct, try again or re-send the link"
    );
    return;
  }

  // Sets up the countdown timer for resending OTP
  React.useEffect(() => {
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        if (lastTimerCount <= 1) setDisable(false);
        if (lastTimerCount <= 0) return lastTimerCount;
        return lastTimerCount - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [disable]);

  React.useEffect(() => {
    if (!lockout) return;
    let lockoutInterval = setInterval(() => {
      setLockoutTimer((prev) => {
        if (prev <= 1) {
          clearInterval(lockoutInterval);
          setLockout(false);
          setFailedAttempts(0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(lockoutInterval);
  }, [lockout]);

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="card shadow-lg mx-auto w-100"
        style={{ maxWidth: "750px" }}
      >
        <div className="card-body">
          <div className="text-center mb-4">
            <h2 className="fw-bold">Email Verification</h2>
            <p className="text-light">
              We have sent a code to your email <b>{email}</b>
            </p>
          </div>
          <form>
            <div className="row justify-content-center mb-4">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div className="col-2" key={i}>
                  <input
                    maxLength="1"
                    className="form-control text-center fs-4"
                    type="text"
                    onChange={(e) => {
                      const val = e.target.value;
                      setOTPinput((prev) => {
                        const next = [...prev];
                        next[i] = val;
                        return next;
                      });
                    }}
                    disabled={lockout}
                  />
                </div>
              ))}
            </div>
            <div className="d-grid gap-2 mb-3">
              <button
                type="button"
                className="btn btn-primary redbutton"
                onClick={verfiyOTP}
                disabled={lockout}
              >
                Verify Account
              </button>
            </div>
            {lockout && (
              <div className="alert alert-danger text-center">
                Too many failed attempts. Please wait {lockoutTimer}s before
                trying again.
              </div>
            )}
            <div className="text-center">
              <p className="mb-1">Didn't receive code?</p>
              <button
                type="button"
                className={`btn btn-link p-0 ${
                  disable ? "disabled text-light" : ""
                }`}
                style={{ textDecoration: disable ? "none" : "underline" }}
                onClick={resendOTP}
                disabled={disable || lockout}
              >
                {disable ? `Resend OTP in ${timerCount}s` : "Resend OTP"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}