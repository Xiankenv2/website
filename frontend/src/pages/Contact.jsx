import React from 'react';

const Contact = () => {
  return (
    <div className="container">
      <h1>Contact en Meldpunt</h1>
      
      <div className="grid">
        <div className="card">
          <h2>Meld Wateroverlast</h2>
          <form>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Locatie</label>
              <input type="text" style={{ width: '100%', padding: '8px' }} placeholder="Straat en huisnummer" />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Type overlast</label>
              <select style={{ width: '100%', padding: '8px' }}>
                <option>Straat blank</option>
                <option>Kelder onder water</option>
                <option>Lekkage</option>
                <option>Anders</option>
              </select>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Beschrijving</label>
              <textarea style={{ width: '100%', padding: '8px', height: '100px' }}></textarea>
            </div>
            <button type="button" className="btn">Verstuur Melding</button>
          </form>
        </div>

        <div>
          <div className="card" style={{ borderLeft: '5px solid red', backgroundColor: '#fff5f5' }}>
            <h2 style={{ color: '#c00' }}>SPOED?</h2>
            <p>Is er acuut gevaar voor leven of grote schade?</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '1rem 0' }}>Bel 112</p>
            <p>Geen spoed, wel brandweer? Bel 0900-8844</p>
          </div>

          <div className="card">
            <h2>Contactgegevens</h2>
            <p><strong>Meldpunt Water</strong></p>
            <p>Email: info@waterveiligheid.nl</p>
            <p>Telefoon: 0800-1234567 (kantooruren)</p>
          </div>
        </div>
      </div>

      <section style={{ marginTop: '3rem' }}>
        <h2>Wat te doen bij acute overlast?</h2>
        <div className="grid">
          <div className="card">
            <h3>1. Veiligheid eerst</h3>
            <p>Sluit stroom en gas af als water de meterkast bereikt. Raak geen elektrische apparaten aan.</p>
          </div>
          <div className="card">
            <h3>2. Breng spullen hoog</h3>
            <p>Verplaats waardevolle spullen naar een hogere verdieping.</p>
          </div>
          <div className="card">
            <h3>3. Informeer buren</h3>
            <p>Waarschuw buren en help kwetsbare mensen als dat veilig kan.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
