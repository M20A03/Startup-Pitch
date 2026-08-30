import { AnimSection, StaggerGrid } from './AnimSection';
import { itemVariant } from './animVariants';
import { motion } from 'framer-motion';
import './About.css';

const features = [
  { icon: '🎯', title: 'Curated Pitch Events', desc: 'Structured investor-founder matchmaking sessions, not just a job board.' },
  { icon: '🇮🇳', title: 'Bharat-First Approach', desc: 'Laser-focused on Tier-2 and Tier-3 city founders who lack access.' },
  { icon: '🔍', title: 'Discovery Platform', desc: 'Ongoing visibility for your brand beyond just the pitch day.' },
];

const stats = [
  { icon: '🇮🇳', number: 28, label: 'States Covered' },
  { icon: '🚀', number: '500', label: 'Founders Community', highlight: true },
  { icon: '💼', number: '50', label: 'Investor Network', highlight2: true },
  { icon: '🏆', number: '10', label: 'Pitch Formats Planned' },
];

export default function About() {
  return (
    <section className="about" id="about" aria-labelledby="about-heading">
      <div className="container about-grid">
        {/* Text */}
        <AnimSection>
          <span className="section-badge">About Karo Pitch</span>
          <h2 className="section-title" id="about-heading">
            Bridging the gap between<br />
            <span className="gradient-text">Founders &amp; Investors</span>
          </h2>
          <p className="section-subtitle" style={{ marginBottom: '16px' }}>
            Thousands of founders across India are building amazing businesses — in Jaipur, Indore, Coimbatore, Patna, and beyond. But they lack access to the right investors, mentorship, and visibility.
          </p>
          <p className="section-subtitle">
            Karo Pitch changes that. We create structured pitch events where selected startups present their businesses directly in front of active investors — giving founders from every corner of India a fair shot at funding.
          </p>
          <div className="about-features">
            {features.map((f) => (
              <div className="feature-item" key={f.title}>
                {/* SC 1.1.1 — decorative emoji; heading text conveys the feature name */}
                <div className="feature-icon" aria-hidden="true">{f.icon}</div>
                <div>
                  <h4>{f.title}</h4>
                  <p>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </AnimSection>

        {/* Stat cards */}
        <StaggerGrid className="about-card-grid">
          {stats.map((s) => (
            <motion.div
              key={s.label}
              className={`about-stat-card${s.highlight ? ' highlight' : s.highlight2 ? ' highlight-2' : ''}`}
              variants={itemVariant}
              whileHover={{ y: -6, borderColor: 'var(--card-hover)' }}
            >
              <div className="asc-icon">{s.icon}</div>
              <div className="asc-number">{s.number}+</div>
              <div className="asc-label">{s.label}</div>
            </motion.div>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}
