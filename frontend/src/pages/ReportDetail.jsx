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

  // 👉 Zet kale URL's om naar <a href="...">...</a>
  const autoLinkify = (text) => {
    if (!text) return text;

    return text.replace(
      /(https?:\/\/[^\s]+)/g,
      (url) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`
    );
  };

  // 👉 Zet YouTube links om naar embed iframe
  const getYouTubeEmbed = (url) => {
    if (!url) return null;

    const idMatch = url.match(/(?:v=|youtu\.be\/)([^&]+)/);
    if (!idMatch) return null;

    const videoId = idMatch[1];

    return (
      <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, marginTop: "1rem" }}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          frameBorder="0"
          allowFullScreen
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
        ></iframe>
      </div>
    );
  };

  const styles = {
    container: { marginTop: '2rem', color: 'var(--color-text)' },
    header: { textAlign: 'center', marginBottom: '3rem', paddingBottom: '2rem', borderBottom: '1px solid var(--color-border)' },
    themeTag: { background: 'var(--color-primary)', color: 'white', padding: '6px 14px', borderRadius: '20px' },
    section: { marginBottom: '3rem' },
    sectionTitle: { color: 'var(--color-primary)', borderBottom: '2px solid var(--color-bg-light)', paddingBottom: '0.5rem', marginBottom: '1.5rem' },
    mediaGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' },
    mediaItem: { borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--color-border)' },
    mediaImage: { width: '100%', height: '200px', objectFit: 'cover' }
  };

  return (
    <div className="container" style={styles.container}>
      <Link to="/onderzoek" className="btn">← Terug naar overzicht</Link>

      <article className="card report-content">

        {/* Header */}
        <header style={styles.header}>
          {report.theme && <span style={styles.themeTag}>{report.theme}</span>}
          <h1>{report.title}</h1>
          <p>{report.source} • {report.year}</p>
        </header>

        {/* Samenvatting */}
        {report.summary && (
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Samenvatting</h2>

            <div
              dangerouslySetInnerHTML={{
                __html: autoLinkify(report.summary)
              }}
            />
          </section>
        )}

        {/* Dynamische sections */}
        {Array.isArray(report.sections) &&
          report.sections.map((section, index) => (
            <section key={index} style={styles.section}>
              {section.title && <h2 style={styles.sectionTitle}>{section.title}</h2>}

              {/* Content + URL linken */}
              {section.content && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: autoLinkify(section.content)
                  }}
                />
              )}

              {/* YouTube embed als section */}
              {section.youtube && getYouTubeEmbed(section.youtube)}

              {/* Files (images / video / download) */}
              {section.files?.length > 0 && (
                <div style={styles.mediaGrid}>
                  {section.files.map((file, fIdx) => {
                    const ext = file.originalName.split('.').pop().toLowerCase();

                    if (['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(ext)) {
                      return (
                        <div key={fIdx} style={styles.mediaItem}>
                          <img src={file.path} alt={file.originalName} style={styles.mediaImage} />
                        </div>
                      );
                    }

                    if (['mp4', 'webm', 'ogg'].includes(ext)) {
                      return (
                        <div key={fIdx} style={styles.mediaItem}>
                          <video src={file.path} controls style={styles.mediaImage} />
                        </div>
                      );
                    }

                    return (
                      <div key={fIdx} style={styles.mediaItem}>
                        <a href={file.path} download className="btn">Download {file.originalName}</a>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Moderne bronnen */}
              {section.modernSources?.length > 0 && (
                <div style={{ marginTop: "1rem" }}>
                  <h4>Moderne bronnen</h4>
                  <ul>
                    {section.modernSources.map((src, i) =>
                      src ? (
                        <li key={i}>
                          <a href={src} target="_blank" rel="noopener noreferrer">{src}</a>
                        </li>
                      ) : null
                    )}
                  </ul>
                </div>
              )}
            </section>
          ))}

        {/* Conclusies */}
        {report.conclusions && (
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Conclusies</h2>
            <div dangerouslySetInnerHTML={{ __html: autoLinkify(report.conclusions) }} />
          </section>
        )}

        {/* Bronnen */}
        {report.sources?.length > 0 && (
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Bronnen</h2>
            <ul>
              {report.sources.map((src, i) => (
                <li key={i}>
                  <a href={src} target="_blank" rel="noopener noreferrer">{src}</a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </div>
  );
};

export default ReportDetail;
