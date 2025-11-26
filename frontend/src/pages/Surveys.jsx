import React, { useState } from 'react';

const Surveys = () => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const questions = [
    {
      id: 1,
      question: "Heb je in het afgelopen jaar wateroverlast gehad?",
      options: ["ja", "nee"]
    },
    {
      id: 2,
      question: "Waar trad de wateroverlast op?",
      options: ["straat", "tuin", "kelder", "woning", "geen overlast"]
    },
    {
      id: 3,
      question: "Hoe vaak trad de wateroverlast op?",
      options: ["één keer", "twee tot drie keer", "vier keer of vaker", "geen overlast"]
    },
    {
      id: 4,
      question: "Wanneer treedt de wateroverlast meestal op?",
      options: ["korte regen", "langdurige regen", "smeltwater", "onbekend"]
    },
    {
      id: 5,
      question: "Wat is volgens jou de belangrijkste oorzaak?",
      options: ["te weinig afvoer", "verouderde riolering", "hoge grondwaterstand", "extreme regen"]
    },
    {
      id: 6,
      question: "Hoeveel overlast ervaar je bij een zware bui?",
      options: ["geen", "beperkt", "duidelijk merkbaar", "ernstig"]
    },
    {
      id: 7,
      question: "Hoe snel trekt het water weg?",
      options: ["binnen een uur", "binnen enkele uren", "binnen een dag", "langer dan een dag"]
    },
    {
      id: 8,
      question: "Hoeveel schade heb je gehad?",
      options: ["geen", "beperkt", "gemiddeld", "hoog"]
    },
    {
      id: 9,
      question: "Heb je maatregelen genomen?",
      options: ["ja", "nee", "gepland"]
    },
    {
      id: 10,
      question: "Welke maatregel gebruik je?",
      options: ["regenpijp aanpassing", "drainage", "wateropvang", "ophoging terrein", "geen van deze"]
    },
    {
      id: 11,
      question: "Hoe goed voel je je voorbereid op zware regen?",
      options: ["goed", "redelijk", "onvoldoende", "helemaal niet"]
    },
    {
      id: 12,
      question: "Hoe beoordeel je de informatie van de gemeente over wateroverlast?",
      options: ["goed", "voldoende", "matig", "slecht"]
    },
    {
      id: 13,
      question: "Hoe vaak controleer je goten of afvoeren?",
      options: ["elke maand", "elk kwartaal", "één keer per jaar", "nooit"]
    }
  ];

  const handleOptionChange = (questionId, option) => {
    setAnswers({
      ...answers,
      [questionId]: option
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch('http://localhost:3000/api/surveys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: new Date().toISOString(),
          answers: answers
        })
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        alert('Er ging iets mis bij het opslaan.');
      }
    } catch (err) {
      console.error(err);
      alert('Fout bij versturen.');
    }
  };

  const progress = Math.round((Object.keys(answers).length / questions.length) * 100);

  if (submitted) {
    return (
      <div className="container" style={{ marginTop: '4rem', textAlign: 'center' }}>
        <div className="card" style={{ padding: '3rem', maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
          <h2 style={{ color: 'var(--color-primary)', marginBottom: '1rem' }}>Bedankt voor je deelname!</h2>
          <p style={{ fontSize: '1.2rem', color: '#555', lineHeight: '1.6' }}>
            Je antwoorden zijn succesvol opgeslagen. Jouw input helpt ons om wateroverlast beter in kaart te brengen en aan te pakken.
          </p>
          <button onClick={() => { setSubmitted(false); setAnswers({}); }} className="btn" style={{ marginTop: '2rem' }}>Nieuwe enquête invullen</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ marginTop: '2rem', maxWidth: '800px' }}>
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>Enquête Wateroverlast</h1>
        <p style={{ fontSize: '1.1rem', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
          Help ons inzicht te krijgen in wateroverlast in jouw omgeving door deze korte vragenlijst in te vullen.
        </p>
      </header>

      {/* Progress Bar */}
      <div style={{ background: '#e5e7eb', height: '10px', borderRadius: '5px', marginBottom: '2rem', overflow: 'hidden' }}>
        <div style={{ width: `${progress}%`, background: 'var(--color-secondary)', height: '100%', transition: 'width 0.3s ease' }}></div>
      </div>
      
      <form onSubmit={handleSubmit}>
        {questions.map((q, index) => (
          <div key={q.id} className="card" style={{ marginBottom: '2rem', padding: '2rem', borderLeft: answers[q.id] ? '5px solid var(--color-secondary)' : '5px solid transparent', transition: 'all 0.3s ease' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: '#1f2937' }}>
              <span style={{ color: '#9ca3af', marginRight: '0.5rem' }}>{index + 1}.</span> 
              {q.question}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              {q.options.map((option) => (
                <label 
                  key={option} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.8rem', 
                    cursor: 'pointer', 
                    padding: '1rem', 
                    borderRadius: '8px', 
                    border: answers[q.id] === option ? '2px solid var(--color-primary)' : '2px solid #e5e7eb',
                    background: answers[q.id] === option ? '#f0f9ff' : 'white',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <input
                    type="radio"
                    name={`question-${q.id}`}
                    value={option}
                    checked={answers[q.id] === option}
                    onChange={() => handleOptionChange(q.id, option)}
                    required
                    style={{ width: '1.2rem', height: '1.2rem', accentColor: 'var(--color-primary)' }}
                  />
                  <span style={{ fontSize: '1rem', fontWeight: answers[q.id] === option ? '600' : '400' }}>{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
        
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <button 
            type="submit" 
            className="btn" 
            style={{ 
              width: '100%', 
              maxWidth: '400px', 
              fontSize: '1.2rem', 
              padding: '1rem',
              opacity: progress === 100 ? 1 : 0.7,
              cursor: progress === 100 ? 'pointer' : 'not-allowed'
            }}
            disabled={progress !== 100}
          >
            {progress === 100 ? 'Versturen' : `Nog ${questions.length - Object.keys(answers).length} vragen te gaan`}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Surveys;
