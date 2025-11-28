import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [filter, setFilter] = useState('Alle');

  // Rapporten ophalen
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
        {/* ---------------- FILTER ---------------- */}
        <section>
          <div className="card">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              flexWrap: 'wrap',
              justifyContent: 'space-between'
            }}>
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
            </div>
          </div>
        </section>

        {/* ---------------- LIJST MET RAPPORTEN ---------------- */}
        <section>
          <div className="grid">
            {filteredReports.map((report) => (
              <div key={report.id} className="card">

                {/* THEMA LABEL */}
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

                {/* TITEL */}
                <h3 style={{ marginTop: '0.5rem', marginBottom: '0.75rem' }}>
                  {report.title}
                </h3>

                {/* META */}
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-light)', marginBottom: '1rem' }}>
                  {report.year}
                </p>

                {/* SAMENVATTING */}
                <p style={{ marginBottom: '1rem' }}>
                  {report.summary}
                </p>

                {/* BRONNEN */}
                {report.sources && report.sources.length > 0 && (
                  <div style={{ marginBottom: '1rem' }}>
                    <strong>Bronnen:</strong>
                    <ul>
                      {report.sources.map((src, i) => (
                        <li key={i}>{src}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* SECTIES */}
                {report.sections && report.sections.length > 0 && (
                  <div style={{ marginBottom: '1rem' }}>
                    <strong>Secties:</strong>
                    <ul>
                      {report.sections.map((sec, i) => (
                        <li key={i}>
                          <strong>{sec.title}</strong>
                          <div dangerouslySetInnerHTML={{ __html: sec.content }} />
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* CONCLUSIES */}
                {report.conclusions && (
                  <p><strong>Conclusies:</strong> {report.conclusions}</p>
                )}

                {/* PDF LINK */}
                {report.pdfLink && (
                  <p>
                    <a href={report.pdfLink} target="_blank" rel="noreferrer">
                      📄 PDF openen
                    </a>
                  </p>
                )}

                {/* LEES VOLLEDIG RAPPORT */}
                <Link
                  to={`/rapport/${report.id}`}
                  className="btn"
                  style={{ marginTop: '1rem', display: 'inline-block' }}
                >
                  Lees volledige rapport
                </Link>

              </div>
            ))}
          </div>
        </section>

        {/* ---------------- EXTRA INFO ---------------- */}
       {/* ---------------- DYNAMISCHE BRONNEN ---------------- */}
<section>
  <h2>Bronnen en databanken</h2>

  <div className="grid">

    {[
      ...new Set(
        reports
          .flatMap(r => r.sources || [])
          .filter(src => src && src.trim() !== "")
      )
    ].map((src, idx) => (
      <div key={idx} className="card">
        <h3>{src}</h3>
        <p>Bron uit een van de onderzoeken in de database.</p>
      </div>
    ))}

    {reports.every(r => !r.sources || r.sources.length === 0) && (
      <p style={{ color: "var(--color-text-light)" }}>
        Geen bronnen gevonden in de database.
      </p>
    )}

  </div>
</section>

      </div>
    </div>
  );
};

export default Reports;
