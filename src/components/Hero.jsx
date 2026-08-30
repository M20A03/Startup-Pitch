import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import './Hero.css';

function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function Stat({ count, label, started }) {
  const val = useCountUp(count, 1800, started);
  return (
    <div className="stat">
      <div className="stat-row">
        <span className="stat-number">{val}</span>
        <span className="stat-plus">+</span>
      </div>
      <span className="stat-label">{label}</span>
    </div>
  );
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] },
});

export default function Hero({ onOpenPitch }) {
  const [statsStarted, setStatsStarted] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setStatsStarted(true); obs.disconnect(); }
    }, { threshold: 0.3 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="hero" id="hero" aria-labelledby="hero-heading">
      {/* Background */}
      <div className="hero-bg" aria-hidden="true">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="grid-overlay" />
      </div>

      <div className="hero-container container">
        {/* LEFT: Copy */}
        <div className="hero-content">
          <motion.div className="hero-badge" {...fadeUp(0.1)} aria-hidden="true">
            <span className="badge-dot" />
            India's Startup Pitch Platform for Bharat
          </motion.div>

          <motion.h1 className="hero-title" id="hero-heading" {...fadeUp(0.2)}>
            Pitch Your Startup to{' '}
            {/* SC 1.3.1 — the gradient is presentational; screen readers read full text naturally */}
            <span className="gradient-text">India's Top Investors.</span>
          </motion.h1>

          <motion.p className="hero-subtitle" {...fadeUp(0.3)}>
            Karo Pitch is a platform where founders from across India — especially Tier-2 and Tier-3 cities — can present their startups directly to investors and raise funding.
          </motion.p>

          <motion.div className="hero-buttons" {...fadeUp(0.4)}>
            <button
              onClick={onOpenPitch}
              className="btn btn-primary btn-lg"
            >
              Apply to Pitch <ArrowRight size={18} />
            </button>
            <a href="#startups" className="btn btn-ghost btn-lg">
              Explore Startups
            </a>
          </motion.div>

          <motion.div className="hero-stats" ref={statsRef} {...fadeUp(0.5)}>
            <Stat count={500} label="Founders Applied" started={statsStarted} />
            <div className="stat-divider" />
            <Stat count={50} label="Active Investors" started={statsStarted} />
            <div className="stat-divider" />
            <Stat count={20} label="Cities Represented" started={statsStarted} />
          </motion.div>
        </div>

        {/* RIGHT: Mockup card */}
        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="pitch-card-mockup">
            <div className="mockup-header">
              <div className="mockup-dots">
                <span /><span /><span />
              </div>
              <span className="mockup-title">Pitch Dashboard — Season 1</span>
            </div>
            <div className="mockup-body">
              <div className="mockup-startup-card">
                <div className="startup-avatar-sm">🚀</div>
                <div className="startup-info-sm">
                  <h4>TechBharat AI</h4>
                  <span className="tag-sm">SaaS · Seed Stage</span>
                </div>
                <div className="startup-status live">● Live</div>
              </div>
              <div className="mockup-startup-card">
                <div className="startup-avatar-sm">🌾</div>
                <div className="startup-info-sm">
                  <h4>AgroConnect</h4>
                  <span className="tag-sm">AgriTech · Pre-Seed</span>
                </div>
                <div className="startup-status shortlisted">Shortlisted</div>
              </div>
              <div className="mockup-progress">
                <div className="progress-label">
                  <span>Applications Open</span>
                  <span className="progress-pct">68%</span>
                </div>
                <div className="progress-bar">
                  <motion.div
                    className="progress-fill"
                    initial={{ width: '0%' }}
                    animate={{ width: '68%' }}
                    transition={{ duration: 2, delay: 1, ease: 'easeOut' }}
                  />
                </div>
              </div>
              <div className="mockup-investors-row">
                <span className="inv-label">Investors Attending</span>
                <div className="investor-avatars">
                  {['A','R','N','S'].map((l, i) => (
                    <div key={l} className="inv-av" style={{ background: ['linear-gradient(135deg,#FF6B35,#FFB800)','linear-gradient(135deg,#7C3AED,#4F46E5)','linear-gradient(135deg,#10B981,#059669)','linear-gradient(135deg,#F59E0B,#D97706)'][i] }}>{l}</div>
                  ))}
                  <div className="inv-av more">+8</div>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            className="floating-badge badge-top-right"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            🎯 12 Pitches Today
          </motion.div>
          <motion.div
            className="floating-badge badge-bottom-left"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          >
            💰 ₹2Cr+ Funded
          </motion.div>
        </motion.div>
      </div>

      <div className="scroll-indicator" aria-hidden="true">
        <div className="scroll-mouse"><motion.div className="scroll-wheel" animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity }} /></div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
}
