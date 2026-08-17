

import { useState } from "react";

function Login({
  username,
  password,
  setUsername,
  setPassword,
  handleLogin,
  handleSignup,
}) {
  const [isSignup, setIsSignup] = useState(false);

  const switchMode = () => {
    setIsSignup(!isSignup);
    setUsername("");
    setPassword("");
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <h1>🎬 BingeBox</h1>

        <p className="login-welcome">
          {isSignup ? "Create your account!" : "Welcome back!"}
        </p>

        <p className="login-tagline">
          Your watchlist. Your next binge.
        </p>

        <form onSubmit={isSignup ? handleSignup : handleLogin}>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">
            {isSignup ? "Create Account" : "Login"}
          </button>

        </form>

        <button
          type="button"
          onClick={switchMode}
          className="signup-toggle"
        >
          {isSignup
            ? "Already have an account? Login"
            : "New to BingeBox? Create an account"}
        </button>

      </div>
    </div>
  );
}

export default Login;