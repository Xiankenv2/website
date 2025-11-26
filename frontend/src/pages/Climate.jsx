import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Climate = () => {
  const [climateData, setClimateData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/climate')
      .then(res => res.json())
      .then(data => setClimateData(data))
      .catch(err => console.error(err));
  }, []);

  if (!climateData) return <div className="container">Laden...</div>;

  const tempChartData = {
    labels: climateData.temperatureTrend.map(d => d.year),
    datasets: [
      {
        label: 'Gemiddelde Temperatuur (°C)',
        data: climateData.temperatureTrend.map(d => d.temp),
        borderColor: 'rgb(220, 38, 38)',
        backgroundColor: 'rgba(220, 38, 38, 0.5)',
        tension: 0.3,
      },
    ],
  };

  const precipChartData = {
    labels: climateData.precipitation.map(d => d.year),
    datasets: [
      {
        label: 'Dagen met zware neerslag',
        data: climateData.precipitation.map(d => d.days),
        borderColor: 'rgb(37, 99, 235)',
        backgroundColor: 'rgba(37, 99, 235, 0.5)',
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  return (
    <div>
      <header>
        <div className="container">
          <h1>Klimaatverandering en Water</h1>
          <p>
            Het klimaat in Nederland verandert. Winters worden natter, zomers droger en heviger. 
            Dit heeft grote gevolgen voor wateroverlast en waterveiligheid.
          </p>
        </div>
      </header>

      <div className="container">
        <section>
          <h2>Wat verandert er?</h2>
          <div className="grid">
            <div className="card">
              <h3>🌡️ Temperatuur stijgt</h3>
              <p>Nederland is sinds 1900 ongeveer 2°C warmer geworden. De opwarming versnelt.</p>
              <ul>
                <li>Warmere zomers</li>
                <li>Mildere winters</li>
                <li>Meer hittegolven</li>
              </ul>
            </div>

            <div className="card">
              <h3>🌧️ Extreme neerslag</h3>
              <p>Zware regenbuien komen vaker voor. Het aantal dagen met meer dan 20 mm regen is toegenomen.</p>
              <ul>
                <li>Korte, heftige buien</li>
                <li>Grotere kans op wateroverlast</li>
                <li>Riolen kunnen water niet aan</li>
              </ul>
            </div>

            <div className="card">
              <h3>🏜️ Langere droogte</h3>
              <p>Droge perioden duren langer. Dit beïnvloedt grondwaterpeil en bodemdaling.</p>
              <ul>
                <li>Lagere grondwaterstand</li>
                <li>Verzakkingen en schade</li>
                <li>Drinkwatertekort</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2>Trends in cijfers</h2>
          <div className="grid">
            <div className="card">
              <h3>Temperatuurontwikkeling</h3>
              <Line options={chartOptions} data={tempChartData} />
              <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
                De gemiddelde jaartemperatuur in Nederland stijgt gestaag. 
                De laatste decennia is de stijging versneld.
              </p>
            </div>
            <div className="card">
              <h3>Toename extreme neerslag</h3>
              <Line options={chartOptions} data={precipChartData} />
              <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
                Het aantal dagen per jaar met zware neerslag (meer dan 20 mm) neemt toe.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2>Gevolgen voor Nederland</h2>
          <div className="card">
            <h3>Zeespiegelstijging</h3>
            <p>
              De zeespiegel langs de Nederlandse kust is in de afgelopen 100 jaar ongeveer 20 cm gestegen. 
              Volgens KNMI-scenario's kan de stijging tot 2100 oplopen tot 1 tot 2 meter.
            </p>
          </div>

          <div className="card">
            <h3>Meer overstromingsrisico</h3>
            <p>
              Door stijgende zeespiegel en meer extreme neerslag neemt de kans op overstroming toe. 
              Dit vraagt om hogere en sterkere dijken en meer ruimte voor water.
            </p>
          </div>

          <div className="card">
            <h3>Wateroverlast in steden</h3>
            <p>
              Hevige regenbuien veroorzaken vaker wateroverlast in steden. Riolen zijn niet berekend 
              op deze hoeveelheden water. Steden werken aan maatregelen zoals groene daken en waterpleinen.
            </p>
          </div>
        </section>

        <section>
          <h2>Recente voorbeelden</h2>
          <div className="grid">
            <div className="card">
              <h3>Hoogwater Limburg (2021)</h3>
              <p>
                In juli 2021 viel er in enkele dagen tijd extreem veel regen. Rivieren in Zuid-Limburg 
                traden buiten hun oevers. Duizenden mensen moesten evacueren.
              </p>
            </div>

            <div className="card">
              <h3>Droogtezomer (2018)</h3>
              <p>
                De zomer van 2018 was extreem droog en warm. Waterstanden in rivieren waren historisch 
                laag. Scheepvaart, landbouw en natuur kregen te maken met tekorten.
              </p>
            </div>

            <div className="card">
              <h3>Stormvloed (2023)</h3>
              <p>
                Tijdens storm Poly in 2023 bereikte het water gevaarlijke hoogtes langs de kust. 
                De stormvloedkeringen moesten gesloten worden om overstromingen te voorkomen.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Climate;

