import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Search, Layers, CreditCard } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import './Navbar.css';

const pitchLinks = [
  { label: 'About',        href: '#about',         id: 'about' },
  { label: 'How It Works', href: '#how-it-works',   id: 'how-it-works' },
  { label: 'Apply',        href: '#who-can-apply',  id: 'who-can-apply' },
  { label: 'Investors',    href: '#investors',      id: 'investors' },
  { label: 'Startups',     href: '#startups',       id: 'startups' },
];

const fintechLinks = [
  { label: 'Architecture', href: '#fintech-platform',    id: 'fintech-platform' },
  { label: 'Calculator',   href: '#capital-calculator',  id: 'capital-calculator' },
  { label: 'Pitch Platform', href: '#pitch-platform',    id: 'pitch-platform' },
];

export default function Navbar({ currentView, onToggleView, onOpenPitch, onOpenSearch }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { resolvedTheme, setTheme } = useTheme();

  const links = currentView === 'fintech' ? fintechLinks : pitchLinks;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = links.map((l) => l.id);
    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [links]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const toggleTheme = () => {
    const next = resolvedTheme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    const msg = document.getElementById('theme-announcement');
    if (msg) msg.textContent = `Switched to ${next} mode`;
  };

  return (
    <>
      <motion.nav
        className={`navbar${scrolled ? ' scrolled' : ''}`}
        aria-label="Main"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="nav-container">
          <div className="nav-brand-group">
            <a href="#hero" className="nav-logo" aria-label="Karo Pitch Homepage">
              <span className="logo-karo">karo</span>
              <span className="logo-pitch">pitch</span>
            </a>

            {/* Platform Suite Switcher */}
            <div className="nav-suite-switcher" role="tablist" aria-label="Switch platform view">
              <button
                className={`suite-tab ${currentView === 'pitch' ? 'active' : ''}`}
                onClick={() => onToggleView('pitch')}
                role="tab"
                aria-selected={currentView === 'pitch'}
              >
                <Layers size={13} /> Pitch
              </button>
              <button
                className={`suite-tab ${currentView === 'fintech' ? 'active' : ''}`}
                onClick={() => onToggleView('fintech')}
                role="tab"
                aria-selected={currentView === 'fintech'}
              >
                <CreditCard size={13} /> Fintech
              </button>
            </div>
          </div>

          <ul className="nav-links">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={activeSection === l.id ? 'active' : ''}
                  onClick={() => {
                    if (l.id === 'pitch-platform') {
                      onToggleView('pitch');
                    }
                  }}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="nav-right">
            {/* Quick Search Launcher */}
            <button
              className="nav-search-btn"
              onClick={onOpenSearch}
              aria-label="Search & Shortcuts (Cmd+K)"
              title="Search & Shortcuts (Cmd+K)"
            >
              <Search size={15} />
              <span className="nav-search-text">Search...</span>
              <kbd className="nav-search-kbd">⌘K</kbd>
            </button>

            {/* Theme Toggle */}
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
            >
              <AnimatePresence mode="wait">
                {resolvedTheme === 'dark' ? (
                  <motion.span
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                  >
                    <Sun size={18} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                  >
                    <Moon size={18} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Primary Action Button */}
            <button
              onClick={onOpenPitch}
              className="btn btn-primary nav-cta"
            >
              Apply Now →
            </button>
          </div>

          <div className="nav-mobile-actions">
            <button
              className="nav-mobile-search-btn"
              onClick={onOpenSearch}
              aria-label="Search"
            >
              <Search size={18} />
            </button>
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {resolvedTheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              className="hamburger"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
          >
            <motion.div
              className="mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mobile-menu-header">
                <div className="nav-logo">
                  <span className="logo-karo">karo</span>
                  <span className="logo-pitch">pitch</span>
                </div>
                <button
                  className="mobile-close"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close navigation menu"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Mobile Suite Switcher */}
              <div className="mobile-suite-toggle">
                <button
                  className={`mobile-suite-btn ${currentView === 'pitch' ? 'active' : ''}`}
                  onClick={() => {
                    onToggleView('pitch');
                    setMenuOpen(false);
                  }}
                >
                  Karo Pitch Platform
                </button>
                <button
                  className={`mobile-suite-btn ${currentView === 'fintech' ? 'active' : ''}`}
                  onClick={() => {
                    onToggleView('fintech');
                    setMenuOpen(false);
                  }}
                >
                  Akoin Fintech Rails
                </button>
              </div>

              <ul>
                {links.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <a
                      href={l.href}
                      className={activeSection === l.id ? 'active' : ''}
                      onClick={() => {
                        setMenuOpen(false);
                        if (l.id === 'pitch-platform') {
                          onToggleView('pitch');
                        }
                      }}
                    >
                      {l.label}
                    </a>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: links.length * 0.05 }}
                  style={{ marginTop: '16px' }}
                >
                  <button
                    className="btn btn-primary"
                    style={{ width: '100%', justifyContent: 'center' }}
                    onClick={() => {
                      setMenuOpen(false);
                      if (onOpenPitch) onOpenPitch();
                    }}
                  >
                    Apply to Pitch Now →
                  </button>
                </motion.li>
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        id="theme-announcement"
        role="status"
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: 'absolute',
          width: 1,
          height: 1,
          padding: 0,
          overflow: 'hidden',
          clip: 'rect(0,0,0,0)',
          whiteSpace: 'nowrap',
          border: 0,
        }}
      />
    </>
  );
}
