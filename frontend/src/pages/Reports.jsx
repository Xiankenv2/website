import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [filter, setFilter] = useState('Alle');

  useEffect(() => {
    fetch('http://localhost:3000/api/reports')
      .then(res => res.json())
      .then(data => setReports(data))
      .catch(err => console.error(err));
  }, []);

  const filteredReports = filter === 'Alle' 
    ? reports 
    : reports.filter(r => r.theme === filter);

  const themes = ['Alle', ...new Set(reports.map(r => r.theme))];

  return (
    <div>
      <header>
        <div className="container">
          <h1>Onderzoek en Datarapporten</h1>
          <p>
            Overzicht van wetenschappelijke rapporten, onderzoeken en data over waterveiligheid, 
            klimaat en watermaatregelen in Nederland.
          </p>
        </div>
      </header>

      <div className="container">
        <section>
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <label style={{ fontWeight: 600, margin: 0 }}>Filter op thema:</label>
                <select 
                  value={filter} 
                  onChange={(e) => setFilter(e.target.value)}
                  style={{ 
                    padding: '8px 12px', 
                    fontSize: '1rem',
                    border: '1px solid var(--color-border)',
                    borderRadius: '3px',
                    minWidth: '200px'
                  }}
                >
                  {themes.map(theme => (
                    <option key={theme} value={theme}>{theme}</option>
                  ))}
                </select>
                <span style={{ color: 'var(--color-text-light)', fontSize: '0.9rem' }}>
                  {filteredReports.length} {filteredReports.length === 1 ? 'rapport' : 'rapporten'}
                </span>
              </div>
              <Link to="/config" className="btn" style={{ background: 'var(--color-secondary)' }}>
                ⚙️ Rapporten Beheren
              </Link>
            </div>
          </div>
        </section>

        <section>
          <div className="grid">
            {filteredReports.map((report) => (
              <div key={report.id} className="card">
                <div style={{ 
                  display: 'inline-block',
                  background: 'var(--color-bg-light)',
                  color: 'var(--color-primary)',
                  padding: '4px 10px', 
                  borderRadius: '3px', 
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  marginBottom: '1rem'
                }}>
                  {report.theme}
                </div>
                <h3 style={{ marginTop: '0.5rem', marginBottom: '0.75rem' }}>{report.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-light)', marginBottom: '1rem' }}>
                  {report.source} • {report.year}
                </p>
                <p>{report.summary}</p>
                <Link to={`/rapport/${report.id}`} className="btn" style={{ marginTop: '1rem', display: 'inline-block' }}>
                  Lees volledige rapport
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2>Bronnen en databanken</h2>
          <div className="grid">
            <div className="card">
              <h3>KNMI</h3>
              <p>Koninklijk Nederlands Meteorologisch Instituut – klimaatdata en weerstatistieken</p>
            </div>
            <div className="card">
              <h3>Rijkswaterstaat</h3>
              <p>Waterstanden, dijkversterkingen en infrastructuurprojecten</p>
            </div>
            <div className="card">
              <h3>Deltaprogramma</h3>
              <p>Voortgangsrapporten en strategieën voor klimaatadaptatie</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Reports;
