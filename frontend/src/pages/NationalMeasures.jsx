import React, { useEffect, useState } from 'react';

const NationalMeasures = () => {
  const [measures, setMeasures] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/national-measures')
      .then(res => res.json())
      .then(data => setMeasures(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <header>
        <div className="container">
          <h1>Nationale Maatregelen</h1>
          <p>
            De Rijksoverheid zorgt voor de hoofdwaterkeringen. Dijken, duinen en stormvloedkeringen 
            beschermen Nederland tegen de zee en rivieren.
          </p>
        </div>
      </header>

      <div className="container">
        <section>
          <h2>Soorten waterkeringen</h2>
          <div className="grid">
            <div className="card">
              <h3>🛡️ Dijken</h3>
              <p>
                Kunstmatige waterkeringen van aarde, klei en steen. Nederland heeft meer dan 
                3.700 kilometer aan primaire dijken.
              </p>
              <p><strong>Functie:</strong> Bescherming tegen zee en rivieren</p>
            </div>

            <div className="card">
              <h3>🏖️ Duinen</h3>
              <p>
                Natuurlijke zeewering langs de kust. Duinen zijn belangrijk voor kustbescherming 
                en drinkwaterwinning.
              </p>
              <p><strong>Functie:</strong> Buffer tegen de zee en zandreservoir</p>
            </div>

            <div className="card">
              <h3>🚧 Stormvloedkeringen</h3>
              <p>
                Technische kunstwerken die bij extreem weer gesloten worden. Nederland heeft 
                meerdere grote keringen, waaronder de Oosterscheldekering en Maeslantkering.
              </p>
              <p><strong>Functie:</strong> Afsluitbaar bij storm</p>
            </div>
          </div>
        </section>

        <section>
          <h2>Grote projecten</h2>
          <div className="grid">
            {measures.map((measure) => (
              <div key={measure.id} className="card">
                <h3>{measure.name}</h3>
                <div style={{ 
                  display: 'inline-block',
                  background: measure.status.includes('Voltooid') ? '#d4edda' : '#fff3cd',
                  color: measure.status.includes('Voltooid') ? '#155724' : '#856404',
                  padding: '4px 12px', 
                  borderRadius: '3px', 
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  marginBottom: '1rem'
                }}>
                  {measure.status}
                </div>
                <p><strong>Periode:</strong> {measure.year}</p>
                <p>{measure.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2>Hoogwaterbeschermingsprogramma (HWBP)</h2>
          <div className="card">
            <p>
              Het HWBP is een groot programma waarin Rijkswaterstaat en waterschappen samen 
              werken aan de versterking van dijken. Tussen 2014 en 2050 worden honderden kilometers 
              dijk versterkt en verhoogd.
            </p>
            <div className="grid" style={{ marginTop: '2rem' }}>
              <div>
                <h4>Kerncijfers</h4>
                <ul>
                  <li>1.400 kilometer dijk wordt versterkt</li>
                  <li>Investering: € 5,8 miljard</li>
                  <li>Looptijd: 2014-2050</li>
                </ul>
              </div>
              <div>
                <h4>Doel</h4>
                <p>
                  Alle dijken voldoen aan de nieuwe waterveiligheidsnormen. Deze normen houden 
                  rekening met klimaatverandering en zeespiegelstijging.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2>Ruimte voor de Rivier</h2>
          <div className="card">
            <p>
              Dit programma gaf rivieren letterlijk meer ruimte. In plaats van alleen dijken te 
              verhogen, werden nevengeulen gegraven en uiterwaarden verlaagd.
            </p>
            <div className="grid" style={{ marginTop: '2rem' }}>
              <div>
                <h4>Maatregelen</h4>
                <ul>
                  <li>Dijken zijn verlegd</li>
                  <li>Uiterwaarden zijn verlaagd</li>
                  <li>Nevengeulen zijn gegraven</li>
                  <li>Obstakels zijn verwijderd</li>
                </ul>
              </div>
              <div>
                <h4>Resultaat</h4>
                <p>
                  De rivieren kunnen grotere hoeveelheden water veilig afvoeren. Tegelijk 
                  ontstonden waardevolle natuurgebieden en recreatiegebieden.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2>Deltaprogramma</h2>
          <div className="card">
            <p>
              Het Deltaprogramma bereidt Nederland voor op klimaatverandering. Het programma 
              richt zich op waterveiligheid en zoetwatervoorziening.
            </p>
            <h4>Thema's</h4>
            <ul>
              <li><strong>Waterveiligheid:</strong> Bescherming tegen overstromingen</li>
              <li><strong>Zoetwater:</strong> Voldoende water van goede kwaliteit</li>
              <li><strong>Ruimtelijke adaptatie:</strong> Waterbestendige inrichting van Nederland</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default NationalMeasures;

