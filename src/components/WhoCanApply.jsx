import { AnimSection, StaggerGrid } from './AnimSection';
import { itemVariant } from './animVariants';
import { motion } from 'framer-motion';
import './WhoCanApply.css';

const categories = [
  { icon: '🛍️', title: 'D2C Brands', desc: 'Consumer brands building direct-to-consumer products with strong unit economics and repeat buyers.' },
  { icon: '👥', title: 'Consumer Startups', desc: 'Apps, platforms, and services targeting the everyday Indian consumer with proven traction.' },
  { icon: '🏭', title: 'MSMEs', desc: 'Micro, small, and medium enterprises building scalable, profitable businesses in traditional sectors.' },
  { icon: '💻', title: 'SaaS Startups', desc: 'Software products solving real business problems for Indian SMEs, with recurring revenue models.' },
  { icon: '⚙️', title: 'Manufacturing', desc: 'Made-in-India manufacturing businesses leveraging quality, supply chains, or export opportunities.' },
  { icon: '🌾', title: 'Bharat-Focused', desc: 'Startups solving real problems specific to Tier-2 and Tier-3 India — AgriTech, EdTech, HealthTech & more.' },
];

export default function WhoCanApply({ onOpenPitch }) {
  return (
    <section className="who-can-apply" id="who-can-apply" aria-labelledby="apply-heading">
      <div className="container">
        <AnimSection className="section-header">
          <span className="section-badge">Who Can Apply</span>
          <h2 className="section-title" id="apply-heading">
            Built for Every<br /><span className="gradient-text">Bharat Founder</span>
          </h2>
          <p className="section-subtitle">From D2C brands to deep tech — if you're building something real, we want to hear from you.</p>
        </AnimSection>

        <StaggerGrid className="categories-grid">
          {categories.map((c) => (
            <motion.div
              key={c.title}
              className="category-card"
              variants={itemVariant}
              whileHover={{ y: -8, borderColor: 'var(--card-hover)', boxShadow: '0 24px 56px rgba(74,144,255,0.12)' }}
            >
              {/* SC 1.1.1 — emoji icon is decorative; h3 text names the category */}
              <div className="cat-icon" aria-hidden="true">{c.icon}</div>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
            </motion.div>
          ))}
        </StaggerGrid>

        <AnimSection className="apply-note">
          <p>Don't see your category? <strong>Apply anyway</strong> — we review all great businesses building for Bharat!</p>
          <button onClick={onOpenPitch} className="btn btn-primary">Apply Now →</button>
        </AnimSection>
      </div>
    </section>
  );
}
