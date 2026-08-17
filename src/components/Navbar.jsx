
function Navbar({ username, handleLogout }) {
  return (
    <nav className="cinema-navbar">

      <div className="navbar-brand">
        <span className="brand-name">BingeBox</span>
        
        <span className="brand-subtitle">PERSONAL CINEMA</span>
      </div>

      <div className="navbar-right">

        <div className="navbar-user">
          <span className="user-label">SIGNED IN AS</span>
          <span className="username">{username}</span>
        </div>

        <button
          className="logout-button"
          onClick={handleLogout}
        >
          <span>Log out</span>
          <span className="logout-arrow">→</span>
        </button>

      </div>

    </nav>
  );
}

export default Navbar;

