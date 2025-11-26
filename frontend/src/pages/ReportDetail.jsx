import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const ReportDetail = () => {
  const { id } = useParams();
  const [report, setReport] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/reports/${id}`)
      .then(res => res.json())
      .then(data => setReport(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!report) return <div className="container">Laden...</div>;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container" style={{ marginTop: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Link to="/onderzoek" className="btn" style={{ background: '#666' }}>← Terug naar overzicht</Link>
      </div>

      <article className="card report-content">
        <header style={{ borderBottom: '1px solid #eee', paddingBottom: '1rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ 
                background: 'var(--color-primary)', 
                color: 'white', 
                padding: '4px 12px', 
                borderRadius: '20px', 
                fontSize: '0.9rem',
                display: 'inline-block',
                marginBottom: '1rem'
              }}>
                {report.theme}
              </span>
              <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{report.title}</h1>
              <p style={{ color: '#666', fontSize: '1.1rem' }}>
                {report.source} • {report.year}
              </p>
            </div>
            <button onClick={handlePrint} className="btn" style={{ background: 'var(--color-secondary)' }}>
              📄 Exporteer naar PDF
            </button>
          </div>

          <div style={{ marginTop: '1rem', display: 'flex', gap: '2rem', fontSize: '0.9rem', color: '#555' }}>
            <div><strong>Onderzoeker:</strong> {report.researcher || 'Onbekend'}</div>
            <div><strong>Versie:</strong> {report.version || 'v1.0'}</div>
            <div><strong>Status:</strong> {report.status || 'Concept'}</div>
            <div><strong>Laatst gewijzigd:</strong> {new Date(report.updatedAt || Date.now()).toLocaleDateString()}</div>
          </div>
        </header>

        {/* Summary */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ color: 'var(--color-primary)' }}>Samenvatting</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>{report.summary}</p>
        </section>

        {/* Dynamic Sections */}
        {report.sections && report.sections.map((section, index) => (
          <section key={section.id || index} style={{ marginBottom: '3rem' }}>
            <h2 style={{ color: 'var(--color-primary)', borderBottom: '2px solid #f0f9ff', paddingBottom: '0.5rem' }}>
              {section.title}
            </h2>
            
            {/* Rich Text Content */}
            <div 
              dangerouslySetInnerHTML={{ __html: section.content }} 
              style={{ lineHeight: '1.8', marginBottom: '2rem' }}
            />

            {/* Media Grid */}
            {section.media && section.media.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
                {section.media.map((item, mIndex) => (
                  <div key={mIndex} style={{ background: '#f9fafb', borderRadius: '8px', overflow: 'hidden' }}>
                    {item.type === 'image' && (
                      <img src={item.url} alt={item.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                    )}
                    {item.type === 'video' && (
                      <video src={item.url} controls style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                    )}
                    {item.type === 'youtube' && (
                      <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                        <iframe 
                          src={item.url.replace('watch?v=', 'embed/')} 
                          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                          frameBorder="0" 
                          allowFullScreen
                          title={item.name}
                        />
                      </div>
                    )}
                    {item.type === 'file' && (
                      <div style={{ padding: '2rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📄</div>
                        <a href={item.url} download className="btn" style={{ fontSize: '0.9rem' }}>Download {item.name}</a>
                      </div>
                    )}
                    {item.type !== 'youtube' && item.type !== 'file' && (
                      <div style={{ padding: '1rem' }}>
                        <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>{item.name}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}

        {/* Legacy Content Fallback */}
        {!report.sections && report.content && (
          <section style={{ marginBottom: '3rem' }}>
            <div dangerouslySetInnerHTML={{ __html: report.content }} />
          </section>
        )}

        {/* Conclusions */}
        {report.conclusions && (
          <section style={{ marginBottom: '3rem', background: '#f0f9ff', padding: '2rem', borderRadius: '8px' }}>
            <h2 style={{ color: 'var(--color-primary)', marginTop: 0 }}>Conclusies</h2>
            <div dangerouslySetInnerHTML={{ __html: report.conclusions }} />
          </section>
        )}

        {/* Sources */}
        {report.sources && (
          <section style={{ marginBottom: '3rem', fontSize: '0.9rem', color: '#666', borderTop: '1px solid #eee', paddingTop: '2rem' }}>
            <h3>Bronnen</h3>
            <pre style={{ fontFamily: 'inherit', whiteSpace: 'pre-wrap' }}>{report.sources}</pre>
          </section>
        )}

      </article>
    </div>
  );
};

export default ReportDetail;
