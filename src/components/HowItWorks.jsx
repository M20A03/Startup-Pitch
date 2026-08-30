import { AnimSection, StaggerGrid } from './AnimSection';
import { itemVariant } from './animVariants';
import { motion } from 'framer-motion';
import './HowItWorks.css';

const steps = [
  { n: '01', icon: '📋', title: 'Apply with Your Pitch Deck', desc: 'Submit your startup details, pitch deck, and a short business overview through our simple application form.' },
  { n: '02', icon: '🔍', title: 'Get Shortlisted by KaroStartup', desc: 'Our expert team reviews every application. Selected startups are shortlisted and briefed for the pitch event.' },
  { n: '03', icon: '🎤', title: 'Pitch Live to Investors', desc: 'Present your startup in a curated, closed-room pitch event directly in front of active, verified investors.' },
  { n: '04', icon: '📈', title: 'Raise Funding & Scale', desc: 'Connect with investors post-event, close deals, and take your startup to the next level with funding and mentorship.', last: true },
];

export default function HowItWorks() {
  return (
    <section className="how-it-works" id="how-it-works" aria-labelledby="hiw-heading">
      <div className="container">
        <AnimSection className="section-header">
          <span className="section-badge">How It Works</span>
          <h2 className="section-title" id="hiw-heading">
            From Application to<br /><span className="gradient-text">Funding in 4 Steps</span>
          </h2>
          <p className="section-subtitle">A simple, transparent process built for founders — not just for metros.</p>
        </AnimSection>

        <StaggerGrid className="steps-grid">
          {steps.map((s) => (
            <motion.div
              key={s.n}
              className="step-card"
              variants={itemVariant}
              whileHover={{ y: -10, borderColor: 'var(--card-hover)', boxShadow: '0 24px 64px rgba(74,144,255,0.14)' }}
            >
              {/* SC 1.3.1 — step number badge is presentational; heading conveys the step */}
              <div className="step-number-badge" aria-hidden="true">{s.n}</div>
              {/* SC 1.1.1 — emoji icon is decorative; aria-hidden prevents double-reading */}
              <div className="step-icon-wrap" aria-hidden="true">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              {!s.last && <div className="step-arrow" aria-hidden="true">→</div>}
            </motion.div>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}
