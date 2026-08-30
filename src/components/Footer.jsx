import './Footer.css';

export default function Footer({ onToggleView }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#hero" className="nav-logo footer-logo" aria-label="Karo Pitch — go to top">
              <span className="logo-karo">karo</span><span className="logo-pitch">pitch</span>
            </a>
            <p>India's unified startup &amp; financial infrastructure platform bridging Bharat founders with top investors and institutional capital.</p>
            <a href="https://www.instagram.com/karopitch/" target="_blank" rel="noopener noreferrer" className="social-link"
               aria-label="Karo Pitch on Instagram (opens in new tab)">
              <span aria-hidden="true">📷</span> @karopitch
            </a>
          </div>

          <div className="footer-col">
            <h4>Pitch Platform</h4>
            <ul aria-label="Platform links">
              <li><a href="#about" onClick={() => onToggleView && onToggleView('pitch')}>About Karo Pitch</a></li>
              <li><a href="#how-it-works" onClick={() => onToggleView && onToggleView('pitch')}>How It Works</a></li>
              <li><a href="#who-can-apply" onClick={() => onToggleView && onToggleView('pitch')}>Who Can Apply</a></li>
              <li><a href="#startups" onClick={() => onToggleView && onToggleView('pitch')}>Featured Startups</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Fintech &amp; Capital</h4>
            <ul aria-label="Fintech links">
              <li><button className="footer-btn-link" onClick={() => onToggleView && onToggleView('fintech')}>Akoin Fintech Rails</button></li>
              <li><button className="footer-btn-link" onClick={() => onToggleView && onToggleView('fintech')}>Working Capital Calculator</button></li>
              <li><button className="footer-btn-link" onClick={() => onToggleView && onToggleView('fintech')}>Digital Payments</button></li>
              <li><button className="footer-btn-link" onClick={() => onToggleView && onToggleView('fintech')}>Risk Telemetry</button></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Investors &amp; Community</h4>
            <ul aria-label="KaroStartup links">
              <li><a href="#investors" onClick={() => onToggleView && onToggleView('pitch')}>Join as Investor</a></li>
              <li><a href="#apply" onClick={() => onToggleView && onToggleView('pitch')}>Partner With Us</a></li>
              <li><a href="#">Startup Stories</a></li>
              <li><a href="#">Community Network</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Karo Pitch &amp; Akoin Fintech. All rights reserved.</p>
          <nav className="footer-bottom-links" aria-label="Legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
