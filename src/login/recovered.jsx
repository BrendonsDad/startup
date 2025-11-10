import React from "react";


export function Recovered() {
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="row w-100">
        <div className="col-lg-6 mb-4 mb-lg-0 d-flex align-items-center justify-content-center">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            className="img-fluid"
            alt="Sample image"
            style={{ maxWidth: "400px" }}
          />
        </div>
        <div className="col-lg-6 d-flex align-items-center justify-content-center">
          <div className="card shadow w-100" style={{ maxWidth: "400px" }}>
            <div className="card-body text-center">
              <h1 className="mb-4 fw-bold">Password successfully set</h1>
              <hr />
              <h2 className="mb-0">Welcome HOME</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}