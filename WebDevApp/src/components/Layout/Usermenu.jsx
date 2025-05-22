import { useState } from 'react';
import './UserMenu.css'; 
function UserMenu({ username }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload(); 
  };

  return (
    <div className="wrapper">
      <div 
        className="navbar-username" 
        onClick={() => setMenuOpen(!menuOpen)}
        style={{ cursor: 'pointer' }}
      >
        <h4>Bienvenido {username}!</h4>
      </div>
      {menuOpen && (
        <div className="logout-menu">
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
