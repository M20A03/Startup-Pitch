import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, ShieldCheck } from 'lucide-react';
import './StartupModal.css';

export function StartupModal({ startup, onClose, onApplyToPitch }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && startup) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [startup, onClose]);

  return (
    <AnimatePresence>
      {startup && (
        <div className="kp-startup-backdrop" onClick={onClose}>
          <motion.div
            className="kp-startup-modal"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="startup-modal-title"
          >
            <div className="kp-startup-modal-header">
              <div className="kp-startup-avatar-lg" aria-hidden="true">
                {startup.emoji}
              </div>
              <div className="kp-startup-modal-title-area">
                <div className="kp-startup-tag-row">
                  <span className="kp-startup-tag">{startup.tag}</span>
                  <span className="kp-startup-stage-pill">{startup.stage}</span>
                </div>
                <h2 id="startup-modal-title" className="kp-startup-title">
                  {startup.name}
                </h2>
              </div>
              <button
                className="kp-startup-close-btn"
                onClick={onClose}
                aria-label="Close details"
              >
                <X size={20} />
              </button>
            </div>

            <div className="kp-startup-modal-body">
              <div className="kp-startup-location-meta">
                <MapPin size={15} />
                <span>{startup.loc}</span>
                <span className="meta-sep">•</span>
                <ShieldCheck size={15} className="verified-icon" />
                <span>Verified Karo Pitch Cohort</span>
              </div>

              <div className="kp-startup-desc-block">
                <h4>About the Startup</h4>
                <p>{startup.desc}</p>
              </div>

              <div className="kp-startup-metrics-grid">
                <div className="metric-box">
                  <span className="metric-label">Target Ask</span>
                  <span className="metric-val">₹50L - ₹1.5Cr</span>
                </div>
                <div className="metric-box">
                  <span className="metric-label">Pitch Slot</span>
                  <span className="metric-val">Season 1 Spotlight</span>
                </div>
                <div className="metric-box">
                  <span className="metric-label">Traction</span>
                  <span className="metric-val">High Growth</span>
                </div>
              </div>
            </div>

            <div className="kp-startup-modal-footer">
              <button className="btn btn-ghost" onClick={onClose}>
                Close
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  onClose();
                  if (onApplyToPitch) onApplyToPitch();
                }}
              >
                Apply to Pitch Similar Startup →
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
