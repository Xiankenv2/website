import React from 'react';

const Prevention = () => {
  return (
    <div className="container">
      <header>
        <h1>Wat je zelf kunt doen om schade te beperken</h1>
        <p>
          Met eenvoudige maatregelen voorkom of verklein je waterschade aan je woning. 
          Deze pagina geeft praktische stappen die je zelf kunt nemen.
        </p>
      </header>

      <section>
        <h2>💧 In en om je huis</h2>
        <div className="grid">
          <div className="card">
            <h3>Kelder en kruipruimte</h3>
            <ul>
              <li>Controleer regelmatig de drainage rondom je huis</li>
              <li>Plaats waardevolle spullen minimaal 30 cm boven de vloer</li>
              <li>Installeer een watermelder in de kelder</li>
              <li>Denk na over terugkleppen in afvoeren</li>
            </ul>
          </div>

          <div className="card">
            <h3>Elektrische installaties</h3>
            <ul>
              <li>Plaats meterkast en zekeringkast boven grondniveau</li>
              <li>Verhoog stopcontacten in ruimtes met overstromingsrisico</li>
              <li>Zorg dat je weet waar de hoofdschakelaar zit</li>
              <li>Laat installaties periodiek controleren</li>
            </ul>
          </div>

          <div className="card">
            <h3>Belangrijke documenten</h3>
            <ul>
              <li>Bewaar geboorteaktes, diploma's en contracten waterdicht</li>
              <li>Maak digitale kopieën van belangrijke papieren</li>
              <li>Berg waardevolle voorwerpen hoog op</li>
              <li>Noteer polisnummers en bewaar ze veilig</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2>🌱 Tuin en bestrating</h2>
        <div className="grid">
          <div className="card">
            <h3>Wateropvang</h3>
            <p><strong>Plaats een regenton</strong></p>
            <p>Een regenton vangt water op van je dak. Dit ontlast het riool en je kunt het water gebruiken voor je tuin.</p>
            <p><strong>Vergroening</strong></p>
            <p>Vervang tegels door planten. Groen neemt regenwater op en verkoelt je omgeving.</p>
          </div>

          <div className="card">
            <h3>Drainage en afwatering</h3>
            <p><strong>Check je afwatering</strong></p>
            <p>Controleer of water goed wegstroomt van je huis. Houd goten en putjes schoon.</p>
            <p><strong>Waterdoorlatende bestrating</strong></p>
            <p>Overweeg bij vernieuwing waterdoorlatende bestrating zoals grasbetontegels.</p>
          </div>

          <div className="card">
            <h3>Onderhoud</h3>
            <ul>
              <li>Reinig dakgoten minstens twee keer per jaar</li>
              <li>Verwijder bladeren uit regenpijpen</li>
              <li>Controleer of hemelwaterafvoeren vrij zijn</li>
              <li>Let op verzakkingen rond het huis</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2>📋 Voorbereiding en planning</h2>
        <div className="grid">
          <div className="card">
            <h3>Noodpakket samenstellen</h3>
            <ul>
              <li>Drinkwater: 9 liter per persoon voor 3 dagen</li>
              <li>Houdbaar eten: blikvoer, crackers, notenbars</li>
              <li>EHBO-doos en medicijnen</li>
              <li>Zaklamp, batterijen en radio</li>
              <li>Mobiele telefoon met powerbank</li>
              <li>Contant geld in kleine coupures</li>
            </ul>
          </div>

          <div className="card">
            <h3>Verzekeringen controleren</h3>
            <p>Controleer of je verzekerd bent tegen waterschade:</p>
            <ul>
              <li><strong>Inboedelverzekering:</strong> dekt vaak binnenkomend water</li>
              <li><strong>Opstalverzekering:</strong> voor schade aan het gebouw</li>
              <li>Check uitsluitingen en eigen risico</li>
              <li>Maak foto's van waardevolle bezittingen</li>
            </ul>
          </div>

          <div className="card">
            <h3>Noodplan maken</h3>
            <ul>
              <li>Bepaal een veilige ontmoetingsplek met je gezin</li>
              <li>Zorg dat iedereen belangrijke telefoonnummers kent</li>
              <li>Oefen de evacuatieroute</li>
              <li>Spreek af wie wat meeneemt bij evacuatie</li>
              <li>Noteer adressen van familie en vrienden buiten het risicogebied</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2>🔧 Technische maatregelen</h2>
        <div className="grid">
          <div className="card">
            <h3>Terugkleppen</h3>
            <p>Een terugklep voorkomt dat rioolwater je huis in stroomt bij extreme neerslag.</p>
            <p><strong>Waar installeren:</strong></p>
            <ul>
              <li>In de hoofdafvoer naar het riool</li>
              <li>Bij afvoeren in kelder of souterrain</li>
            </ul>
            <p className="alert-info" style={{padding: '1rem', marginTop: '1rem'}}>
              💡 Tip: Laat dit installeren door een erkend loodgieter
            </p>
          </div>

          <div className="card">
            <h3>Waterdichte afsluiting</h3>
            <p>Voor deuren en ramen op grondniveau kun je waterdichte schotten plaatsen.</p>
            <ul>
              <li>Aluminium waterkeringen voor deuren</li>
              <li>Speciale afdichtingen voor garagedeuren</li>
              <li>Zandzakken als tijdelijke oplossing</li>
            </ul>
          </div>

          <div className="card">
            <h3>Verhoogde vloeren</h3>
            <p>Bij nieuwbouw of verbouwing:</p>
            <ul>
              <li>Plaats begane grond minimaal 30 cm boven maaiveld</li>
              <li>Verhoog vloeren in kritieke ruimtes</li>
              <li>Gebruik waterbestendige materialen bij de fundering</li>
            </ul>
          </div>
        </div>
      </section>

      <div className="card" style={{ backgroundColor: '#e7f3ff', borderLeftColor: '#007bc7' }}>
        <h2 style={{ marginTop: 0 }}>✓ Checklist preventie</h2>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
          <div>
            <h4>Jaarlijks</h4>
            <ul>
              <li>Goten schoonmaken</li>
              <li>Regenpijpen controleren</li>
              <li>Verzekeringen checken</li>
              <li>Noodpakket verversen</li>
            </ul>
          </div>
          <div>
            <h4>Voor het regenseizoen</h4>
            <ul>
              <li>Drainage controleren</li>
              <li>Putjes reinigen</li>
              <li>Noodplan doornemen</li>
              <li>Pomp testen (indien van toepassing)</li>
            </ul>
          </div>
          <div>
            <h4>Bij weeralarmen</h4>
            <ul>
              <li>Spullen uit kelder naar boven</li>
              <li>Zandzakken klaarzetten</li>
              <li>Telefoon opladen</li>
              <li>Auto op hoger terrein parkeren</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prevention;
