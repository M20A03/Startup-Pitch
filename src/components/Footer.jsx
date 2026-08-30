import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            {/* SC 2.4.4 — link purpose: 'Karo Pitch home' is clear from visible text */}
            <a href="#hero" className="nav-logo footer-logo" aria-label="Karo Pitch — go to top">
              <span className="logo-karo">karo</span><span className="logo-pitch">pitch</span>
            </a>
            <p>India's startup pitch platform bridging founders and investors from every corner of Bharat.</p>
            <a href="https://www.instagram.com/karopitch/" target="_blank" rel="noopener noreferrer" className="social-link"
               aria-label="Karo Pitch on Instagram (opens in new tab)">
              {/* SC 1.1.1 — emoji is decorative; label above covers the link */}
              <span aria-hidden="true">📷</span> @karopitch
            </a>
          </div>

          <div className="footer-col">
            <h4>Platform</h4>
            <ul aria-label="Platform links">
              <li><a href="#about">About Karo Pitch</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#who-can-apply">Who Can Apply</a></li>
              <li><a href="#startups">Featured Startups</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>For Investors</h4>
            <ul aria-label="Investor links">
              <li><a href="#investors">Join as Investor</a></li>
              <li><a href="#">Partner With Us</a></li>
              <li><a href="#">Sponsor an Event</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>KaroStartup</h4>
            <ul aria-label="KaroStartup links">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Startup Stories</a></li>
              <li><a href="#">Community</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 KaroStartup. All rights reserved. Karo Pitch is an initiative by KaroStartup.</p>
          <nav className="footer-bottom-links" aria-label="Legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
