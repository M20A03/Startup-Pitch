import { AnimSection } from './AnimSection';
import { ArrowRight, CheckCircle } from 'lucide-react';
import './CTA.css';

const perks = [
  'Free to apply',
  'No equity taken for applying',
  '100% transparent process',
  'Direct investor access',
];

export default function CTA({ onOpenPitch }) {
  return (
    <section className="cta-section" id="apply" aria-labelledby="cta-heading">
      {/* Always-dark gradient bg — SC 1.1.1 decorative */}
      <div className="cta-bg" aria-hidden="true">
        <div className="cta-orb cta-orb-1" />
        <div className="cta-orb cta-orb-2" />
        <div className="cta-orb cta-orb-3" />
        <div className="cta-grid-overlay" />
      </div>

      <div className="container">
        <AnimSection className="cta-content">
          <div className="cta-live-badge" aria-label="Applications are currently live">
            <span className="cta-live-dot" aria-hidden="true" />
            Season 1 — Applications Live Now
          </div>

          <h2 className="cta-title" id="cta-heading">
            Your Startup Deserves<br />
            <span className="cta-gradient-word">To Be Funded.</span>
          </h2>

          <p className="cta-subtitle">
            India's most founder-friendly pitch platform connects you directly
            with angels, VCs &amp; family offices — for free.
          </p>

          <div className="cta-perks" role="list" aria-label="Application benefits">
            {perks.map((p) => (
              <div key={p} className="cta-perk" role="listitem">
                <CheckCircle size={16} aria-hidden="true" />
                {p}
              </div>
            ))}
          </div>

          <div className="cta-buttons">
            <button
              onClick={onOpenPitch}
              className="btn btn-primary btn-lg cta-apply-btn"
            >
              Apply Now — It's Free <ArrowRight size={18} />
            </button>
            <a href="#investors" className="btn btn-ghost btn-lg cta-partner-btn">Partner With Us</a>
          </div>

          <p className="cta-note">Applications close when seats fill up. Don't wait.</p>
        </AnimSection>
      </div>
    </section>
  );
}
