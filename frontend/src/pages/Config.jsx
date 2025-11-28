import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Config = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('reports');
  const [reports, setReports] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fetch reports
  useEffect(() => {
    const loadReports = async () => {
      if (!user || (user.role !== 'admin' && user.role !== 'researcher')) return;
      try {
        setError(null);
        const res = await fetch('http://localhost:3000/api/reports', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        if (!res.ok) {
          throw new Error('Fout bij laden van onderzoeken');
        }
        const data = await res.json();
        setReports(data);
      } catch (e) {
        setError(e.message || 'Onbekende fout bij laden van onderzoeken');
      }
    };
    loadReports();
  }, [user]);

  // Fetch users (admin)
  useEffect(() => {
    const loadUsers = async () => {
      if (!user || user.role !== 'admin') return;
      try {
        setError(null);
        const res = await fetch('http://localhost:3000/api/users', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        if (!res.ok) {
          throw new Error('Fout bij laden van gebruikers');
        }
        const data = await res.json();
        setUsers(data);
      } catch (e) {
        setError(e.message || 'Onbekende fout bij laden van gebruikers');
      }
    };
    loadUsers();
  }, [user]);

  const deleteReport = async id => {
    const confirmDelete = window.confirm('Weet je zeker dat je dit onderzoek wilt verwijderen');
    if (!confirmDelete) return;
    setError(null);
    setSuccess(null);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:3000/api/reports/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) {
        throw new Error('Verwijderen mislukt');
      }
      setReports(prev => prev.filter(r => r.id !== id));
      setSuccess('Onderzoek verwijderd');
    } catch (e) {
      setError(e.message || 'Fout bij verwijderen van onderzoek');
    }
  };

  const updateUserRole = async (userId, newRole) => {
    setError(null);
    setSuccess(null);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:3000/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ role: newRole })
      });
      if (!res.ok) {
        throw new Error('Rol kon niet worden aangepast');
      }
      setUsers(prev => prev.map(u => (u.id === userId ? { ...u, role: newRole } : u)));
      setSuccess('Gebruikersrol aangepast');
    } catch (e) {
      setError(e.message || 'Fout bij aanpassen van gebruikersrol');
    }
  };

  const deleteUser = async userId => {
    const confirmDelete = window.confirm('Weet je zeker dat je deze gebruiker wilt verwijderen');
    if (!confirmDelete) return;
    setError(null);
    setSuccess(null);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:3000/api/users/${userId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
        });
      if (!res.ok) {
        throw new Error('Gebruiker kon niet worden verwijderd');
      }
      setUsers(prev => prev.filter(u => u.id !== userId));
      setSuccess('Gebruiker verwijderd');
    } catch (e) {
      setError(e.message || 'Fout bij verwijderen van gebruiker');
    }
  };

  if (!user) return <div>Loading...</div>;
  if (user.role === 'guest') return <div>Geen toegang</div>;

  return (
    <div className="container" style={{ padding: '2rem' }}>
      <h1>Configuratie</h1>

      {error && (
        <div style={{ color: 'red', marginBottom: '1rem' }}>
          {error}
        </div>
      )}
      {success && (
        <div style={{ color: 'green', marginBottom: '1rem' }}>
          {success}
        </div>
      )}

      <div style={{ marginBottom: '1rem' }}>
        <button
          className="btn"
          onClick={() => setActiveTab('reports')}
          style={{ marginRight: '0.5rem' }}
        >
          Rapporten
        </button>
        {user.role === 'admin' && (
          <button
            className="btn"
            onClick={() => setActiveTab('users')}
          >
            Gebruikers
          </button>
        )}
      </div>

      {activeTab === 'reports' && (
        <div>
          <button className="btn" onClick={() => navigate('/add-onderzoek')} style={{ marginBottom: '1rem' }}>
            + Nieuw onderzoek
          </button>

          <table className="table" style={{ width: '100%', marginBottom: '2rem' }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Titel</th>
                <th>Jaar</th>
                <th>Acties</th>
              </tr>
            </thead>
            <tbody>
              {reports.map(r => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.title}</td>
                  <td>{r.year}</td>
                  <td>
                    <button
                      className="btn"
                      onClick={() => navigate(`/edit-onderzoek/${r.id}`)}
                      style={{ marginRight: '0.5rem' }}
                    >
                      Bewerken
                    </button>
                    <button className="btn" onClick={() => deleteReport(r.id)}>
                      Verwijderen
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'users' && user.role === 'admin' && (
        <div>
          <h2>Gebruikers beheer</h2>
          <p style={{ marginBottom: '0.5rem' }}>
            Beheer hier de gebruikers en hun rollen.
          </p>
          <table className="table" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Gebruikersnaam</th>
                <th>Wachtwoord</th>
                <th>Rol</th>
                <th>Afdeling</th>
                <th>Acties</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.username}</td>
                  <td style={{ fontFamily: 'monospace', fontSize: '0.8rem', maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={u.password}>
                    {u.password}
                  </td>
                  <td>
                    <select value={u.role} onChange={e => updateUserRole(u.id, e.target.value)}>
                      <option value="guest">guest</option>
                      <option value="researcher">researcher</option>
                      <option value="admin">admin</option>
                    </select>
                  </td>
                  <td>{u.department}</td>
                  <td>
                    <button className="btn" onClick={() => deleteUser(u.id)}>
                      Verwijderen
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Config;

