import React, { useState } from 'react';

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'Vraag', // Vraag, Opmerking, Toevoeging
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', type: 'Vraag', message: '' });
      } else {
        alert('Er ging iets mis bij het versturen.');
      }
    } catch (err) {
      console.error(err);
      alert('Fout bij versturen.');
    }
  };

  if (submitted) {
    return (
      <div className="container" style={{ marginTop: '4rem', textAlign: 'center' }}>
        <div className="card">
          <h2 style={{ color: 'var(--color-primary)' }}>Bedankt voor je bericht!</h2>
          <p>We hebben je vraag of opmerking ontvangen en zullen deze zo snel mogelijk bekijken.</p>
          <button onClick={() => setSubmitted(false)} className="btn" style={{ marginTop: '1rem' }}>Nog een bericht sturen</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ marginTop: '2rem', maxWidth: '600px' }}>
      <h1>Vragen & Feedback</h1>
      <p>Heb je een vraag over de data, mis je informatie of heb je een suggestie? Laat het ons weten!</p>
      
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Naam (Optioneel)</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              style={{ width: '100%', padding: '0.5rem' }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>E-mail (Optioneel)</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              style={{ width: '100%', padding: '0.5rem' }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Soort bericht *</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              style={{ width: '100%', padding: '0.5rem' }}
            >
              <option value="Vraag">Vraag</option>
              <option value="Opmerking">Opmerking</option>
              <option value="Toevoeging">Suggestie voor toevoeging</option>
              <option value="Foutmelding">Fout in de data melden</option>
            </select>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Je bericht *</label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              required
              rows="5"
              style={{ width: '100%', padding: '0.5rem' }}
            />
          </div>

          <button type="submit" className="btn" style={{ width: '100%' }}>Versturen</button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
