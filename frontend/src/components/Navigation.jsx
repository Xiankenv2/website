import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navigation.css';

const Navigation = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">Waterveiligheid NL</Link>
        <ul className="nav-links">
          <li><Link to="/">Risico's</Link></li>
          <li><Link to="/klimaat">Klimaat</Link></li>
          <li><Link to="/nationaal">Nationaal</Link></li>
          <li><Link to="/lokaal">Lokaal</Link></li>
          <li><Link to="/onderzoek">Onderzoek</Link></li>
          <li><Link to="/tips">Tips</Link></li>
          <li><Link to="/preventie">Schade Beperken</Link></li>
          <li><Link to="/noodacties">Tijdens Overstroming</Link></li>
          <li><Link to="/enquetes">Enquêtes</Link></li>
          <li><Link to="/kaarten">Kaarten</Link></li>
          <li><Link to="/feedback">Vragen & Feedback</Link></li>
          {user ? (
            <li><button onClick={logout} className="btn-link" style={{background:'none', border:'none', color:'inherit', cursor:'pointer', font:'inherit'}}>Uitloggen ({user.username})</button></li>
          ) : (
            <li><Link to="/login">Inloggen</Link></li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
