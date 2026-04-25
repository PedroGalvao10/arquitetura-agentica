import { useEffect, useState } from 'react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="nav-content">
        <div className="logo">
          <div className="logo-icon">
            <div className="logo-pulse"></div>
          </div>
          <span className="logo-text">AGENTIC OS</span>
          <span className="badge">V4.0 PRIVATE</span>
        </div>
        <div className="nav-links">
          <a href="#visao">Visão</a>
          <a href="#numeros">Métricas</a>
          <a href="#fluxo">Arquitetura</a>
          <a href="#motor">Motor Híbrido</a>
          <a href="#skills">Skills</a>
          <a href="#cerebro">Cérebro</a>
          <a href="#evolucao">Evolução</a>
        </div>
        <div className="nav-actions">
          <div className="status-indicator">
            <span className="status-dot"></span>
            <span>ONLINE</span>
          </div>

        </div>
      </div>
    </nav>
  );
}
