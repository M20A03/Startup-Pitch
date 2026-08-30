import { AnimSection, StaggerGrid } from './AnimSection';
import { itemVariant } from './animVariants';
import { motion } from 'framer-motion';
import './Investors.css';

const investors = [
  { initials: 'AK', name: 'Arjun Kapoor',  type: 'Angel Investor',  tags: ['D2C','Consumer Tech'],   bg: 'linear-gradient(135deg,#FF6B35,#FFB800)' },
  { initials: 'RP', name: 'Rahul Patel',   type: 'Venture Capital',  tags: ['SaaS','Fintech'],         bg: 'linear-gradient(135deg,#7C3AED,#4F46E5)' },
  { initials: 'NS', name: 'Neha Sharma',   type: 'Family Office',    tags: ['MSME','Manufacturing'],   bg: 'linear-gradient(135deg,#10B981,#059669)' },
  { initials: 'VG', name: 'Vikram Gupta',  type: 'Angel Network',    tags: ['AgriTech','Bharat'],      bg: 'linear-gradient(135deg,#F59E0B,#D97706)' },
  { initials: 'PM', name: 'Priya Mehta',   type: 'Impact Investor',  tags: ['EdTech','HealthTech'],    bg: 'linear-gradient(135deg,#EC4899,#BE185D)' },
  { initials: 'SR', name: 'Suresh Reddy',  type: 'VC Partner',       tags: ['Deep Tech','AI / ML'],    bg: 'linear-gradient(135deg,#06B6D4,#0891B2)' },
];

export default function Investors() {
  return (
    <section className="investors" id="investors" aria-labelledby="investors-heading">
      <div className="container">
        <AnimSection className="section-header">
          <span className="section-badge">Investor Network</span>
          <h2 className="section-title" id="investors-heading">The Investors Waiting<br /><span className="gradient-text">To Fund Your Startup</span></h2>
          <p className="section-subtitle">Karo Pitch works exclusively with angel investors, VCs, and family offices who are actively deploying capital — not just attending events.</p>
        </AnimSection>

        <StaggerGrid className="investors-grid">
          {investors.map((inv) => (
            <motion.div
              key={inv.name}
              className="investor-card"
              variants={itemVariant}
              whileHover={{ y: -8, borderColor: 'var(--card-hover)' }}
            >
              {/* SC 1.3.1 — avatar initials duplicate the investor name below; presentational */}
              <div className="investor-avatar" aria-hidden="true" style={{ background: inv.bg }}>{inv.initials}</div>
              <h4>{inv.name}</h4>
              <p className="inv-type">{inv.type}</p>
              <div className="investor-tags">
                {inv.tags.map((t) => <span key={t}>{t}</span>)}
              </div>
            </motion.div>
          ))}
        </StaggerGrid>

        <AnimSection className="investors-footer">
          <div className="inv-note">
            <span>🔒</span>
            <p>Every investor on Karo Pitch is screened for active investment intent. Your pitch, your deck, and your data stay strictly confidential.</p>
          </div>
          <a href="#apply" className="btn btn-outline">Apply to Meet Investors →</a>
        </AnimSection>
      </div>
    </section>
  );
}
