import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  CreditCard, 
  TrendingUp, 
  Cpu, 
  ArrowRight, 
  CheckCircle
} from 'lucide-react';
import { AnimSection, StaggerGrid } from './AnimSection';
import { itemVariant } from './animVariants';
import { dispatchAppToast } from '../lib/fetcher';
import './FintechView.css';

const fintechPillars = [
  {
    icon: <CreditCard className="pillar-icon" size={28} />,
    title: 'Digital Payments & Gateway',
    desc: 'Instant settlement rail supporting UPI, IMPS, Cards & Multi-Currency Cross-Border transfers with sub-second latency.',
    tag: 'Payments Engine',
  },
  {
    icon: <TrendingUp className="pillar-icon" size={28} />,
    title: 'Smart Lending & Capital',
    desc: 'AI-driven automated underwriting and working capital financing for high-growth MSMEs and venture-backed startups.',
    tag: 'Credit Infrastructure',
  },
  {
    icon: <ShieldCheck className="pillar-icon" size={28} />,
    title: 'Risk & Fraud Telemetry',
    desc: 'Real-time transaction scoring, behavioral biometric anomaly detection, and automated AML compliance pipelines.',
    tag: 'Security & AML',
  },
  {
    icon: <Cpu className="pillar-icon" size={28} />,
    title: 'Smart Settlement Protocol',
    desc: 'Automated escrow accounts, smart-contract disbursement workflows, and instant multi-party revenue splitting.',
    tag: 'Settlement Tech',
  },
];

const fintechMetrics = [
  { val: '₹1,200Cr+', label: 'Quarterly Processing Volume' },
  { val: '99.99%', label: 'Infrastructure Uptime SLA' },
  { val: '45ms', label: 'Median API Response Time' },
  { val: '25,000+', label: 'Active Enterprise Businesses' },
];

export function FintechView({ onOpenPitch }) {
  const [loanAmount, setLoanAmount] = useState(2500000);
  const [tenureMonths, setTenureMonths] = useState(12);
  const [isSimulating, setIsSimulating] = useState(false);

  // Approximate working capital calculation
  const interestRate = 0.115; // 11.5% annual
  const monthlyRate = interestRate / 12;
  const estimatedEmi = Math.round(
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
    (Math.pow(1 + monthlyRate, tenureMonths) - 1)
  );

  const handleApplyCapital = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      dispatchAppToast('success', `Fintech credit line pre-approval initiated for ₹${(loanAmount / 100000).toFixed(1)} Lakhs.`);
    }, 800);
  };

  return (
    <div className="fintech-view-wrapper" id="fintech-platform">
      {/* FINTECH HERO */}
      <section className="fintech-hero">
        <div className="fintech-hero-bg" aria-hidden="true">
          <div className="fintech-glow-1" />
          <div className="fintech-glow-2" />
        </div>

        <div className="container fintech-hero-container">
          <AnimSection className="fintech-hero-content">
            <div className="fintech-badge">
              <span className="fintech-badge-dot" />
              Akoin Fintech Infrastructure
            </div>

            <h1 className="fintech-hero-title">
              Smart Financial Rails for{' '}
              <span className="gradient-text">India's Digital Economy.</span>
            </h1>

            <p className="fintech-hero-subtitle">
              Enterprise-grade digital payments, automated lending pipelines, and risk analytics built for Bharat enterprises and next-generation startups.
            </p>

            <div className="fintech-hero-buttons">
              <a href="#capital-calculator" className="btn btn-primary btn-lg">
                Explore Business Capital <ArrowRight size={18} />
              </a>
              <button onClick={onOpenPitch} className="btn btn-ghost btn-lg">
                Pitch for Venture Debt
              </button>
            </div>

            <div className="fintech-stats-bar">
              {fintechMetrics.map((m) => (
                <div key={m.label} className="fintech-stat-item">
                  <span className="fintech-stat-val">{m.val}</span>
                  <span className="fintech-stat-lbl">{m.label}</span>
                </div>
              ))}
            </div>
          </AnimSection>
        </div>
      </section>

      {/* CORE CAPABILITIES */}
      <section className="fintech-pillars-section">
        <div className="container">
          <AnimSection className="section-header">
            <span className="section-badge">Institutional Architecture</span>
            <h2 className="section-title">
              Built for Scale, Security &amp; <br />
              <span className="gradient-text">Uncompromising Speed</span>
            </h2>
            <p className="section-subtitle">
              Our microservices-based financial architecture handles millions of mission-critical transactions every day.
            </p>
          </AnimSection>

          <StaggerGrid className="fintech-pillars-grid">
            {fintechPillars.map((p) => (
              <motion.div
                key={p.title}
                className="fintech-pillar-card"
                variants={itemVariant}
              >
                <div className="pillar-header">
                  <div className="pillar-icon-box">{p.icon}</div>
                  <span className="pillar-tag">{p.tag}</span>
                </div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <div className="pillar-footer">
                  <span className="pillar-link">Learn specifications →</span>
                </div>
              </motion.div>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* INTERACTIVE WORKING CAPITAL CALCULATOR */}
      <section className="fintech-calculator-section" id="capital-calculator">
        <div className="container">
          <div className="calculator-card">
            <div className="calculator-info">
              <span className="section-badge">Instant Liquidity</span>
              <h2>Working Capital Estimator</h2>
              <p>
                Calculate instant business credit eligibility and estimated monthly payback schedules for your growing enterprise.
              </p>
              <ul className="calculator-perks">
                <li><CheckCircle size={16} className="text-success" /> Zero collateral requirements for verified startups</li>
                <li><CheckCircle size={16} className="text-success" /> 24-hour direct-to-account disbursement</li>
                <li><CheckCircle size={16} className="text-success" /> Dynamic repayment synced to daily revenue</li>
              </ul>
            </div>

            <div className="calculator-interactive">
              <div className="calc-slider-group">
                <div className="calc-label-row">
                  <span>Required Capital</span>
                  <span className="calc-highlight">₹{(loanAmount / 100000).toFixed(1)} Lakhs</span>
                </div>
                <input
                  type="range"
                  min="500000"
                  max="10000000"
                  step="250000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="calc-range"
                />
                <div className="calc-scale-labels">
                  <span>₹5 Lakhs</span>
                  <span>₹50 Lakhs</span>
                  <span>₹1 Crore</span>
                </div>
              </div>

              <div className="calc-slider-group">
                <div className="calc-label-row">
                  <span>Repayment Tenure</span>
                  <span className="calc-highlight">{tenureMonths} Months</span>
                </div>
                <div className="tenure-pills">
                  {[6, 12, 18, 24, 36].map((m) => (
                    <button
                      key={m}
                      className={`tenure-pill ${tenureMonths === m ? 'active' : ''}`}
                      onClick={() => setTenureMonths(m)}
                    >
                      {m} Mo
                    </button>
                  ))}
                </div>
              </div>

              <div className="calc-result-box">
                <div>
                  <span className="result-label">Estimated Monthly EMI</span>
                  <span className="result-value">₹{estimatedEmi.toLocaleString('en-IN')} / mo</span>
                </div>
                <button
                  className="btn btn-primary calc-apply-btn"
                  onClick={handleApplyCapital}
                  disabled={isSimulating}
                >
                  {isSimulating ? 'Evaluating...' : 'Apply for Credit Line →'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
