import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const Maps = () => {
  const position = [52.1326, 5.2913]; // Center of Netherlands

  const mapStyle = {
    height: '500px',
    width: '100%',
    borderRadius: '4px'
  };

  return (
    <div>
      <header>
        <div className="container">
          <h1>Kaarten en Visualisaties</h1>
          <p>
            Interactieve kaarten van Nederland met belangrijke waterwerken, risicogebieden 
            en lokale klimaatmaatregelen.
          </p>
        </div>
      </header>

      <div className="container">
        <section>
          <h2>Belangrijke waterwerken</h2>
          <div className="card">
            <MapContainer center={position} zoom={7} style={mapStyle}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              {/* Rotterdam Waterplein */}
              <Marker position={[51.9225, 4.47917]}>
                <Popup>
                  <strong>Rotterdam</strong><br />
                  Waterplein Benthemplein
                </Popup>
              </Marker>
              
              {/* Nijmegen */}
              <Marker position={[51.8425, 5.85278]}>
                <Popup>
                  <strong>Nijmegen</strong><br />
                  Ruimte voor de Rivier
                </Popup>
              </Marker>
              
              {/* Afsluitdijk */}
              <Marker position={[53.0000, 5.0000]}>
                <Popup>
                  <strong>Afsluitdijk</strong><br />
                  Versterkingsproject
                </Popup>
              </Marker>

              {/* Oosterscheldekering */}
              <Marker position={[51.6370, 3.6750]}>
                <Popup>
                  <strong>Oosterscheldekering</strong><br />
                  Onderdeel van de Deltawerken
                </Popup>
              </Marker>

              {/* Amsterdam */}
              <Marker position={[52.3676, 4.9041]}>
                <Popup>
                  <strong>Amsterdam</strong><br />
                  Groene daken en grachten
                </Popup>
              </Marker>

              {/* Flood-prone area visualization (Randstad) */}
              <Circle
                center={[52.2, 4.9]}
                radius={30000}
                pathOptions={{ color: 'blue', fillColor: 'blue', fillOpacity: 0.1 }}
              >
                <Popup>Randstad – hoogste veiligheidsnorm (1:10.000 jaar)</Popup>
              </Circle>
            </MapContainer>
            <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
              Klik op de markers voor meer informatie over waterwerken en maatregelen.
            </p>
          </div>
        </section>

        <section>
          <h2>Legenda</h2>
          <div className="grid">
            <div className="card">
              <h3>🔵 Risicogebieden</h3>
              <p>Blauwe cirkels tonen gebieden met verhoogd overstromingsrisico.</p>
            </div>
            <div className="card">
              <h3>📍 Waterwerken</h3>
              <p>Markers tonen belangrijke dijken, keringen en lokale klimaatprojecten.</p>
            </div>
            <div className="card">
              <h3>🌊 Kustlijn</h3>
              <p>De Nederlandse kust wordt beschermd door duinen, dijken en stormvloedkeringen.</p>
            </div>
          </div>
        </section>

        <section>
          <h2>Risicovisualisatie</h2>
          <div className="card">
            <h3>Hoe worden risicogebieden bepaald?</h3>
            <p>
              Risicogebieden worden vastgesteld op basis van:
            </p>
            <ul>
              <li><strong>Hoogteligging:</strong> Gebieden onder NAP (Normaal Amsterdams Peil)</li>
              <li><strong>Afstand tot waterwegen:</strong> Nabijheid van zee, riviereninmeren</li>
              <li><strong>Historische data:</strong> Overstromingen uit het verleden</li>
              <li><strong>Klimaatmodellen:</strong> Voorspellingen voor zeespiegelstijging en neerslag</li>
            </ul>
          </div>
        </section>

        <section>
          <h2>Databronnen en tools</h2>
          <div className="grid">
            <div className="card">
              <h3>Klimaateffectatlas</h3>
              <p>
                Interactieve kaart van de Nederlandse overheid met overstromingsrisico's, 
                hittestress en droogte per gebied.
              </p>
            </div>
            <div className="card">
              <h3>Waterinfo.nl</h3>
              <p>
                Actuele waterstanden en verwachtingen van Rijkswaterstaat voor rivieren en kust.
              </p>
            </div>
            <div className="card">
              <h3>Risicokaarten gemeentes</h3>
              <p>
                Veel gemeenten publiceren hun eigen risicokaarten voor wateroverlast en hitte.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Maps;
