<div>
  <h1>Login</h1>
  <div>
    <label>Email:</label>
    <input type='text' onChange={(e) => setEmail(e.target.value)} required />
  </div>
  <div>
    <label>Password:</label>
    <input type='password' onChange={(e) => setPassword(e.target.value)} required />
  </div>
  <button type='submit' disabled={!(email && password)} onClick={handleLogin}>
    Login
  </button>
  <button type='button' disabled={!(email && password)} onClick={handleRegister}>
    Register
  </button>
</div>