import React from 'react';

const Footer = () => {
  return (
    <footer style={{ 
      backgroundColor: 'var(--color-primary)', 
      color: 'white', 
      padding: '3rem 0 2rem 0', 
      marginTop: '4rem',
      borderTop: '4px solid var(--color-secondary)'
    }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <p style={{ margin: 0, fontSize: '0.95rem', opacity: 0.9 }}>
          &copy; 2023 Waterveiligheid Nederland – Een educatief informatieproject over waterveiligheid in Nederland
        </p>
        <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.85rem', opacity: 0.7 }}>
          Disclaimer: Dit is een schoolproject. De informatie is gebaseerd op bronnen maar niet officieel van KNMI of overheidsdiensten.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
