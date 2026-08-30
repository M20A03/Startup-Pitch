import { AnimSection, StaggerGrid } from './AnimSection';
import { itemVariant } from './animVariants';
import { motion } from 'framer-motion';
import './KaroStartup.css';

const stats = [
  { n: '5+',     l: 'Years of Storytelling' },
  { n: '10,000+',l: 'Startup Stories Published' },
  { n: '1M+',    l: 'Reach Across India' },
  { n: '500+',   l: 'Founder Community' },
];

export default function KaroStartup() {
  return (
    <section className="about-ks" id="karostartup" aria-labelledby="ks-heading">
      <div className="container">
        <div className="ks-grid">
          <AnimSection>
            <span className="section-badge">About KaroStartup</span>
            <h2 className="section-title" id="ks-heading">
              India's Largest Startup<br /><span className="gradient-text">Storytelling Platform</span>
            </h2>
            <p className="ks-text">
              For over 5 years, KaroStartup has been sharing real founder stories from every corner of India — inspiring the next generation of entrepreneurs and building one of the country's most vibrant startup communities.
            </p>
            <p className="ks-text">
              With thousands of startup stories published and a reach of over 1 million entrepreneurs, KaroStartup has become the voice of Bharat's startup ecosystem. Karo Pitch is our next chapter — turning inspiration into action.
            </p>
            <a
              href="https://www.instagram.com/karopitch/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
              style={{ marginTop: '16px' }}
            >
              {/* SC 1.1.1 — camera emoji is decorative; link text is sufficient */}
              <span aria-hidden="true">📷</span> Follow @karopitch on Instagram →
            </a>
          </AnimSection>

          <StaggerGrid className="ks-stats">
            {stats.map((s) => (
              <motion.div key={s.l} className="ks-stat" variants={itemVariant} whileHover={{ y: -5, borderColor: 'var(--card-hover)' }}>
                <div className="ks-number">{s.n}</div>
                <div className="ks-label">{s.l}</div>
              </motion.div>
            ))}
          </StaggerGrid>
        </div>
      </div>
    </section>
  );
}
