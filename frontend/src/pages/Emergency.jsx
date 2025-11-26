import React from 'react';

const Emergency = () => {
  return (
    <div className="container">
      <header>
        <h1>Wat je moet doen tijdens een overstroming</h1>
        <p>
          Directe actie kan levens redden. Deze pagina bevat korte, heldere stappen 
          voor tijdens een overstroming of hoogwater.
        </p>
      </header>

      <div className="alert alert-danger">
        <h2 style={{ marginTop: 0, color: '#721c24' }}>⚠️ Bij acuut gevaar: Bel 112</h2>
        <p style={{ fontSize: '1.1rem', marginBottom: 0 }}>
          Bij directe dreiging voor je leven of dat van anderen, bel onmiddellijk 112.
        </p>
      </div>

      <section>
        <h2>🚨 Eerste minuten: Direct handelen</h2>
        <div className="grid">
          <div className="card" style={{ borderLeftColor: '#dc3545', borderLeftWidth: '6px' }}>
            <h3>1. Blijf kalm</h3>
            <p>Panik leidt tot verkeerde beslissingen. Adem rustig en denk na voordat je handelt.</p>
          </div>

          <div className="card" style={{ borderLeftColor: '#dc3545', borderLeftWidth: '6px' }}>
            <h3>2. Ga naar boven</h3>
            <p>Zoek onmiddellijk een hoge plek. Ga naar de eerste verdieping of zolder. Blijf nooit in de kelder.</p>
          </div>

          <div className="card" style={{ borderLeftColor: '#dc3545', borderLeftWidth: '6px' }}>
            <h3>3. Schakel stroom uit</h3>
            <p>Zet de hoofdschakelaar uit als dat veilig kan. Raak geen elektrische apparaten aan in nat gebied.</p>
          </div>
        </div>
      </section>

      <section>
        <h2>⚡ Elektriciteit en gas</h2>
        <div className="card" style={{ backgroundColor: '#fff3cd' }}>
          <h3>Cruciale veiligheidsstappen</h3>
          <ul>
            <li><strong>Schakel de stroom uit</strong> bij de meterkast als het water stijgt</li>
            <li><strong>Draai de gaskraan dicht</strong> om brand en ontploffingsgevaar te voorkomen</li>
            <li><strong>Raak geen stopcontacten of schakelaars aan</strong> met natte handen</li>
            <li><strong>Houd afstand van elektrische apparatuur</strong> die met water in contact is</li>
            <li><strong>Gebruik geen liften</strong> - deze kunnen vastlopen</li>
          </ul>
        </div>
      </section>

      <section>
        <h2>🏃 Evacuatie: Alleen als het moet</h2>
        <div className="grid">
          <div className="card">
            <h3>Vertrek alleen als:</h3>
            <ul>
              <li>Hulpdiensten opdracht geven tot evacuatie</li>
              <li>Het water snel stijgt naar levensgevaarlijke hoogtes</li>
              <li>Je huis instabiel wordt</li>
              <li>Er brand uitbreekt</li>
            </ul>
          </div>

          <div className="card">
            <h3>Wat mee te nemen:</h3>
            <ul>
              <li>Belangrijke documenten (paspoort, verzekeringspapieren)</li>
              <li>Medicijnen</li>
              <li>Telefoon met oplader</li>
              <li>Eten en water voor 24 uur</li>
              <li>Warme, droge kleding</li>
              <li>Contant geld</li>
            </ul>
          </div>

          <div className="card">
            <h3>Veilig evacueren:</h3>
            <ul>
              <li>Loop nooit door stromend water</li>
              <li>Vermijd ondergelopen wegen</li>
              <li>Gebruik geen auto door hoog water</li>
              <li>Let op open putten en losgeraakte straatklinkers</li>
              <li>Meld je vertrek aan buren indien mogelijk</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2>📱 Communicatie en informatie</h2>
        <div className="grid">
          <div className="card">
            <h3>Blijf geïnformeerd</h3>
            <ul>
              <li>Luister naar lokale radio (bijv. regionale omroep)</li>
              <li>Volg officiële kanalen zoals NL-Alert</li>
              <li>Check de website van je gemeente</li>
              <li>Volg updates van Rijkswaterstaat en KNMI</li>
            </ul>
          </div>

          <div className="card">
            <h3>Contact met hulpdiensten</h3>
            <p><strong>112:</strong> Alleen bij direct levensgevaar</p>
            <p><strong>0900-8844:</strong> Brandweer (geen spoed)</p>
            <p><strong>Gemeentelijk meldnummer:</strong> Voor wateroverlast zonder acuut gevaar</p>
          </div>

          <div className="card">
            <h3>Familie en vrienden</h3>
            <ul>
              <li>Stuur één kort bericht dat je veilig bent</li>
              <li>Beperk belgebruik – netwerken kunnen overbelast raken</li>
              <li>Spreek van tevoren een verzamelpunt af</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2>🏠 In huis tijdens hoogwater</h2>
        <div className="card">
          <h3>Blijf binnen, blijf veilig</h3>
          <p>Als evacuatie niet nodig is, blijf dan veilig binnen:</p>
          <div className="grid">
            <div>
              <h4>Ga naar boven</h4>
              <ul>
                <li>Blijf op de hoogste verdieping</li>
                <li>Zorg voor een vluchtroute naar het dak</li>
                <li>Neem noodpakket mee naar boven</li>
              </ul>
            </div>
            <div>
              <h4>Wat niet te doen</h4>
              <ul>
                <li>Ga niet terug naar beneden voor spullen</li>
                <li>Ga niet naar buiten uit nieuwsgierigheid</li>
                <li>Probeer geen auto uit garage te halen</li>
                <li>Drink geen kraanwater als dit afgekeurd is</li>
              </ul>
            </div>
            <div>
              <h4>Voorzieningen</h4>
              <ul>
                <li>Vul badkuip met schoon water (voordat water besmet raakt)</li>
                <li>Laad telefoons op zolang er stroom is</li>
                <li>Houd radio bij de hand</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2>🤝 Hulp aan anderen</h2>
        <div className="card" style={{ backgroundColor: '#d1ecf1' }}>
          <h3>Denk aan kwetsbare personen</h3>
          <p>Oudere buren, mensen met een beperking of gezinnen met kleine kinderen hebben mogelijk extra hulp nodig.</p>
          <ul>
            <li>Check bij buren of ze hulp nodig hebben</li>
            <li>Bied aan om te helpen met evacuatie (alleen als het veilig is)</li>
            <li>Deel informatie en waarschuwingen</li>
            <li>Meld bij hulpdiensten als je weet dat iemand vastzit</li>
          </ul>
          <p style={{ marginBottom: 0 }}><strong>Let op:</strong> Breng jezelf nooit in gevaar. Hulpdiensten zijn opgeleid voor reddingsacties.</p>
        </div>
      </section>

      <section>
        <h2>⏱️ Stappenplan samenvatting</h2>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          <div className="card" style={{ textAlign: 'center', backgroundColor: '#f8d7da' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>1</div>
            <h4>Direct</h4>
            <p>Naar boven<br/>Stroom uit<br/>Gas dicht</p>
          </div>
          
          <div className="card" style={{ textAlign: 'center', backgroundColor: '#fff3cd' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>2</div>
            <h4>Binnen 10 minuten</h4>
            <p>Noodpakket pakken<br/>112 bellen indien nodig<br/>Familie informeren</p>
          </div>
          
          <div className="card" style={{ textAlign: 'center', backgroundColor: '#d1ecf1' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>3</div>
            <h4>Daarna</h4>
            <p>Informatie volgen<br/>Hoog blijven<br/>Op instructies wachten</p>
          </div>
          
          <div className="card" style={{ textAlign: 'center', backgroundColor: '#d4edda' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>4</div>
            <h4>Na afloop</h4>
            <p>Wacht op all-clear<br/>Check veiligheid<br/>Schade documenteren</p>
          </div>
        </div>
      </section>

      <div className="alert alert-warning">
        <h3 style={{ marginTop: 0 }}>⚠️ Belangrijke waarschuwingen</h3>
        <ul style={{ marginBottom: 0 }}>
          <li><strong>Loop nooit door water</strong> van onbekende diepte – je kunt vallen of meegesleurd worden</li>
          <li><strong>Rij niet door ondergelopen gebieden</strong> – auto's kunnen al bij 30 cm water onbestuurbaar worden</li>
          <li><strong>Drink geen water</strong> uit de kraan zonder toestemming van de autoriteiten</li>
          <li><strong>Ga pas terug naar huis</strong> als hulpdiensten aangeven dat het veilig is</li>
        </ul>
      </div>
    </div>
  );
};

export default Emergency;
