import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, Loader2, Save } from 'lucide-react';
import { dispatchAppToast } from '../lib/fetcher';
import './PitchModal.css';

export function PitchModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    founderName: '',
    email: '',
    startupName: '',
    sector: 'AgriTech',
    stage: 'Pre-Seed',
    city: '',
    pitchDeckUrl: '',
    askAmount: '',
    summary: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSavedLocally, setIsSavedLocally] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Restore cached draft from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('kp-pitch-draft');
      if (saved) {
        setFormData(JSON.parse(saved));
        setIsSavedLocally(true);
      }
    } catch {
      // Ignore local storage error in private browsing
    }
  }, []);

  // Sync draft to localStorage on change
  const handleChange = (e) => {
    const { name, value } = e.target;
    const next = { ...formData, [name]: value };
    setFormData(next);
    try {
      localStorage.setItem('kp-pitch-draft', JSON.stringify(next));
      setIsSavedLocally(true);
    } catch {
      // Ignore local storage error
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!formData.founderName || !formData.email || !formData.startupName) {
      dispatchAppToast('warning', 'Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate resilient idempotent API submission
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // Clear draft on successful submission
      try {
        localStorage.removeItem('kp-pitch-draft');
      } catch {
        // Ignore local storage error
      }

      setSubmitted(true);
      dispatchAppToast('success', 'Application submitted successfully! Our curation team will review within 48 hours.');
    } catch {
      dispatchAppToast('error', 'Failed to submit application. Your draft has been preserved locally.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="kp-pitch-backdrop" onClick={onClose}>
          <motion.div
            className="kp-pitch-modal"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.24, ease: [0.4, 0, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="pitch-modal-title"
          >
            <div className="kp-pitch-header">
              <div>
                <div className="kp-pitch-badge">Season 1 Application</div>
                <h2 id="pitch-modal-title" className="kp-pitch-title">
                  Pitch Your Startup
                </h2>
              </div>
              <button
                className="kp-pitch-close-btn"
                onClick={onClose}
                aria-label="Close pitch modal"
              >
                <X size={20} />
              </button>
            </div>

            {submitted ? (
              <div className="kp-pitch-success-view">
                <div className="kp-pitch-success-icon">
                  <CheckCircle2 size={48} />
                </div>
                <h3>Application Received!</h3>
                <p>
                  Thank you for submitting <strong>{formData.startupName}</strong>. Our investor committee is actively reviewing Season 1 decks.
                </p>
                <button className="btn btn-primary" onClick={handleReset}>
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="kp-pitch-form">
                <div className="kp-form-row">
                  <div className="kp-form-group">
                    <label htmlFor="founderName">Founder Name *</label>
                    <input
                      id="founderName"
                      name="founderName"
                      type="text"
                      required
                      placeholder="e.g. Priyanshu Sharma"
                      value={formData.founderName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="kp-form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      inputMode="email"
                      placeholder="founder@startup.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="kp-form-row">
                  <div className="kp-form-group">
                    <label htmlFor="startupName">Startup Name *</label>
                    <input
                      id="startupName"
                      name="startupName"
                      type="text"
                      required
                      placeholder="e.g. BharatAI"
                      value={formData.startupName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="kp-form-group">
                    <label htmlFor="city">Headquarters (City, State) *</label>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      placeholder="e.g. Indore, Madhya Pradesh"
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="kp-form-row">
                  <div className="kp-form-group">
                    <label htmlFor="sector">Sector / Industry</label>
                    <select
                      id="sector"
                      name="sector"
                      value={formData.sector}
                      onChange={handleChange}
                    >
                      <option value="AgriTech">AgriTech</option>
                      <option value="FinTech">FinTech</option>
                      <option value="HealthTech">HealthTech</option>
                      <option value="EdTech">EdTech</option>
                      <option value="D2C">D2C & Consumer</option>
                      <option value="SaaS">SaaS / Enterprise AI</option>
                      <option value="CleanTech">CleanTech / EV</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="kp-form-group">
                    <label htmlFor="stage">Current Stage</label>
                    <select
                      id="stage"
                      name="stage"
                      value={formData.stage}
                      onChange={handleChange}
                    >
                      <option value="Idea">Idea / Prototype</option>
                      <option value="Pre-Seed">Pre-Seed</option>
                      <option value="Seed">Seed</option>
                      <option value="Pre-Series A">Pre-Series A</option>
                    </select>
                  </div>
                </div>

                <div className="kp-form-group">
                  <label htmlFor="pitchDeckUrl">Pitch Deck Link (Drive/DocSend/Notion)</label>
                  <input
                    id="pitchDeckUrl"
                    name="pitchDeckUrl"
                    type="url"
                    inputMode="url"
                    placeholder="https://docsend.com/view/..."
                    value={formData.pitchDeckUrl}
                    onChange={handleChange}
                  />
                </div>

                <div className="kp-form-group">
                  <label htmlFor="summary">Elevator Pitch (1-2 sentences)</label>
                  <textarea
                    id="summary"
                    name="summary"
                    rows={3}
                    placeholder="What problem are you solving and what traction have you achieved?"
                    value={formData.summary}
                    onChange={handleChange}
                  />
                </div>

                <div className="kp-pitch-footer">
                  <div className="kp-draft-status">
                    {isSavedLocally && (
                      <span>
                        <Save size={13} /> Draft auto-saved locally
                      </span>
                    )}
                  </div>

                  <div className="kp-form-actions">
                    <button
                      type="button"
                      className="btn btn-ghost"
                      onClick={onClose}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="kp-spinner" size={16} /> Submitting...
                        </>
                      ) : (
                        <>
                          Submit Pitch Application <Send size={16} />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
