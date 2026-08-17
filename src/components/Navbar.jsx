function Navbar({ username, handleLogout }) {
  return (
    <nav className="navbar">
      <h1>🎬 BingeBox</h1>

      <p>Welcome, {username}!</p>

      <button onClick={handleLogout}>
        🚪 Logout
      </button>

      
    </nav>
  );
}

export default Navbar;