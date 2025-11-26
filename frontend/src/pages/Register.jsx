import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [department, setDepartment] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, department })
      });

      const data = await res.json();

      if (res.ok) {
        alert('Registratie succesvol! Je kunt nu inloggen.');
        navigate('/login');
      } else {
        setError(data.error || 'Registratie mislukt');
      }
    } catch (err) {
      setError('Er is een fout opgetreden');
    }
  };

  return (
    <div className="container" style={{ maxWidth: '400px', marginTop: '4rem' }}>
      <div className="card">
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Registreren</h2>
        {error && <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Gebruikersnaam *</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ width: '100%', padding: '0.5rem' }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Wachtwoord *</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '0.5rem' }}
            />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Afdeling (Optioneel)</label>
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              style={{ width: '100%', padding: '0.5rem' }}
            />
          </div>
          <button type="submit" className="btn" style={{ width: '100%' }}>
            Registreren
          </button>
        </form>
        <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>
          Heb je al een account? <Link to="/login">Log hier in</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
