import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import { ThemeContext } from '../Context/ThemeContext';
import { useContext } from 'react';
import UserMenu from './Usermenu'

function Navbar() {
  const location = useLocation();
  const { toggle } = useContext(ThemeContext);

  var username = localStorage.getItem('username');

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/characters">
            <span className="logo-text">FUTURAMA</span>
          </Link>
        </div>
        
        <div className="navbar-links">
        <Link 
          to="/about" 
          className={location.pathname === '/about' ? 'active' : ''}
        >
          Sobre Nosotros
        </Link>
          <Link 
            to="/characters" 
            className={location.pathname === '/characters' ? 'active' : ''}
          >
            Personajes
          </Link>
          <Link 
            to="/form" 
            className={location.pathname === '/form' ? 'active' : ''}
          >
            Formulario
          </Link>

          <button onClick={toggle} className='the-button'>Cambiar tema</button>

          <div className='wrapper'>
            {username && (
              <UserMenu username={username} />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;