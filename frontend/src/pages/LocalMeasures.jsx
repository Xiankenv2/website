import React, { useEffect, useState } from 'react';

const LocalMeasures = () => {
  const [measures, setMeasures] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/local-measures')
      .then(res => res.json())
      .then(data => setMeasures(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <header>
        <div className="container">
          <h1>Lokale Maatregelen in Steden</h1>
          <p>
            Gemeenten pakken wateroverlast aan met slimme maatregelen. Groene daken, waterpleinen 
            en betere riolen houden water op de plek waar het valt.
          </p>
        </div>
      </header>

      <div className="container">
        <section>
          <h2>Waarom lokale maatregelen?</h2>
          <div className="card">
            <p>
              Steden hebben steeds meer last van wateroverlast door extreme regenbuien. Veel straten 
              en pleinen zijn verhard, waardoor regenwater niet de grond in kan. Het riool raakt 
              overbelast en water stroomt kelders, parkeergarages en huizen in.
            </p>
            <p>
              Gemeenten werken aan <strong>klimaatbestendige steden</strong>. Dit betekent: meer groen, 
              waterpleinen, vertraagde afvoer en betere riolering.
            </p>
          </div>
        </section>

        <section>
          <h2>🌧️ Soorten maatregelen</h2>
          <div className="grid">
            <div className="card">
              <h3>Groene daken</h3>
              <p>
                Planten op het dak houden water vast. Dit vertraagt de afvoer naar het riool 
                en vermindert de piekbelasting.
              </p>
              <p><strong>Voordeel:</strong> Minder wateroverlast, koeling in de zomer, meer groen</p>
            </div>

            <div className="card">
              <h3>Waterpleinen</h3>
              <p>
                Dit zijn pleinen die bij droog weer dienen als sportveld of speelruimte. Bij hevige 
                regen vangt het plein water op.
              </p>
              <p><strong>Voordeel:</strong> Multifunctioneel, zichtbare klimaatadaptatie</p>
            </div>

            <div className="card">
              <h3>Wadi's</h3>
              <p>
                Water Afvoer Drainerende Infiltratie-voorziening. Een greppel die water tijdelijk 
                opvangt en infiltreert in de bodem.
              </p>
              <p><strong>Voordeel:</strong> Natuurlijke waterafvoer, groen in de wijk</p>
            </div>

            <div className="card">
              <h3>Infiltratiekratten</h3>
              <p>
                Onder de grond liggen kratten die water opslaan. Het water zakt geleidelijk weg 
                in de bodem.
              </p>
              <p><strong>Voordeel:</strong> Grote opslagcapaciteit, onzichtbaar</p>
            </div>

            <div className="card">
              <h3>Vernieuwde riolen</h3>
              <p>
                Oudere riolen zijn te klein voor huidige regenbuien. Gemeenten leggen grotere 
                afvoerbuizen aan of scheiden hemelwater van afvalwater.
              </p>
              <p><strong>Voordeel:</strong> Minder overstortingen, grotere capaciteit</p>
            </div>

            <div className="card">
              <h3>Ontharden</h3>
              <p>
                Tegels vervangen door groen of waterdoorlatende bestrating. Water kan zo de bodem 
                in en vult grondwater aan.
              </p>
              <p><strong>Voordeel:</strong> Natuurlijke infiltratie, groener straatbeeld</p>
            </div>
          </div>
        </section>

        <section>
          <h2>Voorbeelden uit Nederland</h2>
          <div className="grid">
            {measures.map((measure) => (
              <div key={measure.id} className="card">
                <div style={{ 
                  display: 'inline-block',
                  background: 'var(--color-secondary)', 
                  color: 'white', 
                  padding: '4px 10px', 
                  borderRadius: '3px', 
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  marginBottom: '1rem'
                }}>
                  {measure.type}
                </div>
                <h3>{measure.city}</h3>
                <h4>{measure.measure}</h4>
                <p>{measure.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2>Klimaatadaptatiestrategie</h2>
          <div className="card">
            <p>
              Veel gemeenten werken met een <strong>klimaatadaptatiestrategie</strong>. Deze strategie 
              beschrijft hoe de stad zich aanpast aan klimaatverandering.
            </p>
            <h4>Onderdelen:</h4>
            <ul>
              <li>Risicokaarten: waar is de stad kwetsbaar?</li>
              <li>Actieplan: welke maatregelen worden genomen?</li>
              <li>Samenwerking: gemeente, waterbedrijf, bewoners en bedrijven werken samen</li>
              <li>Subsidies: inwoners krijgen steun voor groene daken en ontharding</li>
            </ul>
          </div>
        </section>

        <section>
          <h2>Meedoen als bewoner</h2>
          <div className="grid">
            <div className="card">
              <h3>Tegels eruit, groen erin</h3>
              <p>
                Veel gemeenten geven subsidie voor het vervangen van tegels door beplanting. 
                Check de website van je gemeente.
              </p>
            </div>

            <div className="card">
              <h3>Groen dak aanleggen</h3>
              <p>
                Ook voor groene daken zijn soms subsidies beschikbaar. Een groen dak houdt 
                water vast en isoleert het huis.
              </p>
            </div>

            <div className="card">
              <h3>Afkoppelen regenpijp</h3>
              <p>
                Laat regenwater niet naar het riool lopen, maar de grond in. Dit ontlast het 
                riool en vult grondwater aan.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LocalMeasures;

