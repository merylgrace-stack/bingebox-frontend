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
    <main className="cinema-login">

      <div className="cinema-background">
        <div className="cinema-glow"></div>
        <div className="film-line film-line-one"></div>
        <div className="film-line film-line-two"></div>
      </div>

      <section className="cinema-content">

        <div className="cinema-brand">
          <span className="brand-symbol">B</span>
          <span className="brand-name">BingeBox</span>
        </div>

        <div className="cinema-intro">
          <p className="cinema-label">YOUR PERSONAL FILM LOG</p>

          <h1>
            Watched.
            <br />
            Watching.
            <br />
            <span>Waiting.</span>
          </h1>

          <p className="cinema-description">
            Keep track of the stories you've seen,
            the ones you're watching, and everything
            still waiting for its turn.
          </p>
        </div>

        <div className="cinema-login-panel">

          <div className="panel-heading">
            <p className="panel-label">
              {isSignup ? "NEW ACCOUNT" : "WELCOME BACK"}
            </p>

            <h2>
              {isSignup ? "Start your collection." : "Continue your story."}
            </h2>
          </div>

          <form onSubmit={isSignup ? handleSignup : handleLogin}>

            <div className="cinema-input">
              <label htmlFor="username">Username</label>

              <input
                id="username"
                type="text"
                placeholder="Your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
              />
            </div>

            <div className="cinema-input">
              <label htmlFor="password">Password</label>

              <input
                id="password"
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={
                  isSignup ? "new-password" : "current-password"
                }
                required
              />
            </div>

            <button type="submit" className="cinema-button">
              <span>
                {isSignup ? "Create account" : "Sign in"}
              </span>

              <span className="button-arrow">→</span>
            </button>

          </form>

          <button
            type="button"
            onClick={switchMode}
            className="cinema-switch"
          >
            {isSignup
              ? "Already have an account? Sign in"
              : "New to BingeBox? Create an account"}
          </button>

        </div>

      </section>

      <footer className="cinema-footer">
        <span>© BingeBox</span>
        <span>Keep the stories worth remembering.</span>
      </footer>

    </main>
  );
}

export default Login;