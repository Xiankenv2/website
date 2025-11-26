import React, { useEffect, useState } from 'react';

const Tips = () => {
  const [tips, setTips] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/tips')
      .then(res => res.json())
      .then(data => setTips(data))
      .catch(err => console.error(err));
  }, []);

  if (!tips) return <div className="container">Laden...</div>;

  return (
    <div>
      <header>
        <div className="container">
          <h1>Tips voor Bewoners</h1>
          <p>
            Praktische tips om je huis en tuin voor te bereiden op wateroverlast. 
            Kleine aanpassingen kunnen grote schade voorkomen.
          </p>
        </div>
      </header>

      <div className="container">
        <section>
          <h2>🏠 Voorbereiding</h2>
          <p>Bereid je voor op extreme neerslag en hoogwater:</p>
          <div className="grid">
            {tips.preparation.map((tip, index) => (
              <div key={index} className="card">
                <h3>{tip.title}</h3>
                <p>{tip.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2>⚠️ Tijdens een overstroming</h2>
          <p style={{ marginBottom: '2rem' }}>
            <strong>Let op:</strong> Bij direct gevaar, bel altijd 112. De onderstaande tips zijn voor voorbereiding en beperking van schade.
          </p>
          <div className="grid">
            {tips.during.map((tip, index) => (
              <div key={index} className="card" style={{ borderLeft: '5px solid #dc3545' }}>
                <h3>{tip.title}</h3>
                <p>{tip.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2>🌱 Tuin en Omgeving</h2>
          <p>Maak je tuin klimaatbestendig:</p>
          <div className="grid">
            {tips.garden.map((tip, index) => (
              <div key={index} className="card">
                <h3>{tip.title}</h3>
                <p>{tip.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="card" style={{ backgroundColor: '#d1ecf1' }}>
            <h2 style={{ marginTop: 0 }}>📋 Snelle checklist</h2>
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
              <div>
                <h4>Nu doen:</h4>
                <ul>
                  <li>Check je verzekering</li>
                  <li>Maak een noodpakket</li>
                  <li>Reinig dakgoten</li>
                </ul>
              </div>
              <div>
                <h4>Bij noodweer:</h4>
                <ul>
                  <li>Spullen naar boven</li>
                  <li>Auto verplaatsen</li>
                  <li>Telefoon opladen</li>
                </ul>
              </div>
              <div>
                <h4>Na een overstroming:</h4>
                <ul>
                  <li>Foto's maken voor verzekering</li>
                  <li>Niet terug zonder toestemming</li>
                  <li>Gemeente informeren</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2>Meer informatie</h2>
          <p>
            Voor uitgebreide stappen en maatregelen, bekijk ook de pagina's 
            <strong> Schade Beperken</strong> en <strong> Tijdens Overstroming</strong> in het menu.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Tips;
