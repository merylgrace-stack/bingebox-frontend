
function Login({
  username,
  password,
  setUsername,
  setPassword,
  handleLogin,
}) {
  return (
    <div className="login-page">
      <div className="login-card">

        <h1>🎬 BingeBox</h1>

        <p className="login-welcome">Welcome back!</p>

        <p className="login-tagline">
          Your watchlist. Your next binge.
        </p>

        <form onSubmit={handleLogin}>
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
            Login
          </button>
        </form>

      </div>
    </div>
  );
}

export default Login;

