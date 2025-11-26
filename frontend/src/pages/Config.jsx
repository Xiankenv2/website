import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Config = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('reports');
  const [reports, setReports] = useState([]);
  const [users, setUsers] = useState([]);
  const [editingReport, setEditingReport] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    theme: 'Waterveiligheid',
    year: new Date().getFullYear(),
    source: '',
    summary: '',
    sections: [],
    conclusions: ''
  });

  // Fetch reports (admin & researcher)
  useEffect(() => {
    if (user && (user.role === 'admin' || user.role === 'researcher')) {
      fetch('http://localhost:3000/api/reports', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
        .then(r => r.json())
        .then(setReports)
        .catch(console.error);
    }
  }, [user]);

  // Fetch users (admin only)
  useEffect(() => {
    if (user && user.role === 'admin') {
      fetch('http://localhost:3000/api/users', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
        .then(r => r.json())
        .then(setUsers)
        .catch(console.error);
    }
  }, [user]);

  const resetForm = () => {
    setFormData({
      title: '',
      theme: 'Waterveiligheid',
      year: new Date().getFullYear(),
      source: '',
      summary: '',
      sections: [],
      conclusions: ''
    });
    setEditingReport(null);
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSectionChange = (index, field, value) => {
    const newSections = [...formData.sections];
    newSections[index] = { ...newSections[index], [field]: value };
    setFormData(prev => ({ ...prev, sections: newSections }));
  };

  const addSection = () => {
    setFormData(prev => ({
      ...prev,
      sections: [...prev.sections, { title: '', content: '', media: [] }]
    }));
  };

  const handleFileUpload = async (sectionIndex, files) => {
    const token = localStorage.getItem('token');
    const fd = new FormData();
    for (const f of files) {
      fd.append('files', f);
    }
    const res = await fetch('http://localhost:3000/api/upload', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: fd
    });
    const data = await res.json();
    const newSections = [...formData.sections];
    const existing = newSections[sectionIndex].media || [];
    newSections[sectionIndex].media = [...existing, ...data.files];
    setFormData(prev => ({ ...prev, sections: newSections }));
  };

  const saveReport = async e => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const method = editingReport ? 'PUT' : 'POST';
    const url = editingReport
      ? `http://localhost:3000/api/reports/${editingReport.id}`
      : 'http://localhost:3000/api/reports';
    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    });
    if (res.ok) {
      // Refresh reports list
      const refreshed = await fetch('http://localhost:3000/api/reports', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(r => r.json());
      setReports(refreshed);
      resetForm();
    } else {
      const err = await res.json();
      alert('Error saving report: ' + (err.error || 'unknown'));
    }
  };

  const editReport = report => {
    setEditingReport(report);
    setFormData({
      title: report.title || '',
      theme: report.theme || 'Waterveiligheid',
      year: report.year || new Date().getFullYear(),
      source: report.source || '',
      summary: report.summary || '',
      sections: report.sections || [],
      conclusions: report.conclusions || ''
    });
    setActiveTab('reports');
  };

  const deleteReport = async id => {
    if (!window.confirm('Weet je zeker dat je dit rapport wilt verwijderen?')) return;
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:3000/api/reports/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) {
      setReports(prev => prev.filter(r => r.id !== id));
    } else {
      alert('Failed to delete report');
    }
  };

  const updateUserRole = async (userId, newRole) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:3000/api/users/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ role: newRole })
    });
    if (res.ok) {
      setUsers(prev => prev.map(u => (u.id === userId ? { ...u, role: newRole } : u)));
    } else {
      alert('Failed to update role');
    }
  };

  const deleteUser = async userId => {
    if (!window.confirm('Delete this user?')) return;
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:3000/api/users/${userId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) {
      setUsers(prev => prev.filter(u => u.id !== userId));
    } else {
      alert('Failed to delete user');
    }
  };

  if (!user) return <div>Loading...</div>;
  if (user.role === 'guest') return <div>Geen toegang</div>;

  return (
    <div className="container" style={{ padding: '2rem' }}>
      <h1>Configuratie</h1>
      <div style={{ marginBottom: '1rem' }}>
        <button className="btn" onClick={() => setActiveTab('reports')} style={{ marginRight: '0.5rem' }}>
          Rapporten
        </button>
        {user.role === 'admin' && (
          <button className="btn" onClick={() => setActiveTab('users')}>
            Gebruikers
          </button>
        )}
      </div>

      {activeTab === 'reports' && (
        <div>
          <button className="btn" onClick={resetForm} style={{ marginBottom: '1rem' }}>
            + Nieuw Rapport
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
                    <button className="btn" onClick={() => editReport(r)} style={{ marginRight: '0.5rem' }}>
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

          <form onSubmit={saveReport} style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '5px' }}>
            <h2>{editingReport ? 'Bewerk Rapport' : 'Nieuw Rapport'}</h2>
            <div>
              <label>Titel:</label>
              <input type="text" name="title" value={formData.title} onChange={handleInputChange} required />
            </div>
            <div>
              <label>Thema:</label>
              <input type="text" name="theme" value={formData.theme} onChange={handleInputChange} />
            </div>
            <div>
              <label>Jaar:</label>
              <input type="number" name="year" value={formData.year} onChange={handleInputChange} />
            </div>
            <div>
              <label>Bron:</label>
              <input type="text" name="source" value={formData.source} onChange={handleInputChange} />
            </div>
            <div>
              <label>Samenvatting:</label>
              <textarea name="summary" value={formData.summary} onChange={handleInputChange} rows={3} />
            </div>
            <div>
              <h3>Sections</h3>
              {formData.sections.map((sec, idx) => (
                <div key={idx} style={{ marginBottom: '1rem', padding: '0.5rem', border: '1px solid #ccc' }}>
                  <input
                    type="text"
                    placeholder="Section title"
                    value={sec.title}
                    onChange={e => handleSectionChange(idx, 'title', e.target.value)}
                  />
                  <ReactQuill
                    theme="snow"
                    value={sec.content}
                    onChange={value => handleSectionChange(idx, 'content', value)}
                  />
                  <input type="file" multiple onChange={e => handleFileUpload(idx, e.target.files)} />
                  <div style={{ marginTop: '0.5rem' }}>
                    {sec.media && sec.media.map((m, i) => (
                      <div key={i}>
                        {m.mimetype && m.mimetype.startsWith('image/') ? (
                          <img src={m.path} alt={m.originalName} style={{ maxWidth: '100px' }} />
                        ) : m.mimetype && m.mimetype.startsWith('video/') ? (
                          <video src={m.path} controls style={{ maxWidth: '200px' }} />
                        ) : (
                          <a href={m.path} target="_blank" rel="noreferrer">
                            {m.originalName}
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <button type="button" className="btn" onClick={addSection}>
                + Sectie Toevoegen
              </button>
            </div>
            <div>
              <label>Conclusies:</label>
              <textarea name="conclusions" value={formData.conclusions} onChange={handleInputChange} rows={3} />
            </div>
            <button type="submit" className="btn" style={{ marginTop: '1rem' }}>
              {editingReport ? 'Opslaan' : 'Aanmaken'}
            </button>
          </form>
        </div>
      )}

      {activeTab === 'users' && user.role === 'admin' && (
        <div>
          <h2>Gebruikers Beheer</h2>
          <table className="table" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Gebruikersnaam</th>
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
