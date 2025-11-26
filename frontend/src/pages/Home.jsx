import React, { useEffect, useState } from 'react';

const Home = () => {
  const [risks, setRisks] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/risks')
      .then(res => res.json())
      .then(data => setRisks(data))
      .catch(err => console.error(err));
  }, []);

  if (!risks) return <div className="container">Laden...</div>;

  return (
    <div>
      <header>
        <div className="container">
          <h1>Overstromingsrisico's in Nederland</h1>
          <p>
            Nederland ligt voor een groot deel onder de zeespiegel. Zonder onze dijken, duinen en waterkeringen 
            zou meer dan de helft van het land onder water staan. Deze pagina legt uit welke risico's er zijn.
          </p>
        </div>
      </header>

      <div className="container">
        <section>
          <h2>Kerncijfers waterveiligheid</h2>
          <div className="grid">
            <div className="card stat-card">
              <div className="icon">📏</div>
              <div className="highlight">{risks.stats.belowSeaLevelPercentage}%</div>
              <p>van Nederland ligt onder de zeespiegel</p>
            </div>
            <div className="card stat-card">
              <div className="icon">⚠️</div>
              <div className="highlight">{risks.stats.floodPronePercentage}%</div>
              <p>zou overstromen zonder waterkeringen</p>
            </div>
            <div className="card stat-card">
              <div className="icon">👥</div>
              <div className="highlight">{risks.stats.protectedPopulation}</div>
              <p>mensen wonen in beschermde gebieden</p>
            </div>
          </div>
        </section>

        <section>
          <h2>Waarom Nederland kwetsbaar is</h2>
          <div className="card">
            <p>
              Nederland dankt zijn naam aan de lage ligging. Het land ligt in de delta van grote rivieren 
              (Rijn, Maas, Schelde) en grenst aan de Noordzee. Deze ligging maakt Nederland kwetsbaar voor 
              water uit twee richtingen:
            </p>
            <ul>
              <li><strong>Zee:</strong> Stormvloeden en zeespiegelstijging bedreigen de kust en lage gebieden</li>
              <li><strong>Rivieren:</strong> Hoge waterstanden door smeltwater en regen uit het buitenland</li>
              <li><strong>Neerslag:</strong> Extreme regenval veroorzaakt wateroverlast in steden en polders</li>
            </ul>
          </div>
        </section>

        <section>
          <h2>Risico's per type gebied</h2>
          <div className="grid">
            {risks.areas.map((area, index) => (
              <div key={index} className="card">
                <h3>{area.name}</h3>
                <h4>Risico</h4>
                <p>{area.risk}</p>
                <h4>Bescherming</h4>
                <p>{area.protection}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2>Waterveiligheidsnormen</h2>
          <div className="card">
            <p>
              Nederland hanteert strenge normen. Dijken worden berekend op overstromingen die gemiddeld 
              één keer per 100 tot 10.000 jaar voorkomen, afhankelijk van het gebied en het aantal inwoners.
            </p>
            <ul>
              <li>Randstad: <strong>1 op 10.000 jaar</strong> (hoogste norm)</li>
              <li>Rivierengebied: <strong>1 op 1.250 jaar</strong></li>
              <li>Overige gebieden: <strong>1 op 100 jaar</strong></li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;

