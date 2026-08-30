import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, Send, Sun, Moon, Users, Layers, X, ArrowRight, CreditCard } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import './CommandPalette.css';

export function CommandPalette({ isOpen, onClose, onOpenPitch }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const { setTheme } = useTheme();

  const commands = [
    {
      id: 'apply',
      title: 'Apply to Pitch (Season 1)',
      subtitle: 'Submit pitch deck for Bharat founders',
      icon: <Send size={16} />,
      action: () => {
        onClose();
        if (onOpenPitch) onOpenPitch();
      },
    },
    {
      id: 'startups',
      title: 'Browse Featured Startups',
      subtitle: 'Explore 6+ startups in Season 1 spotlight',
      icon: <Sparkles size={16} />,
      action: () => {
        onClose();
        window.location.hash = '#startups';
      },
    },
    {
      id: 'investors',
      title: 'View Attending Investors',
      subtitle: 'See angels, VC funds, and family offices',
      icon: <Users size={16} />,
      action: () => {
        onClose();
        window.location.hash = '#investors';
      },
    },
    {
      id: 'how-it-works',
      title: 'How It Works',
      subtitle: '3-step transparent pitch pipeline',
      icon: <Layers size={16} />,
      action: () => {
        onClose();
        window.location.hash = '#how-it-works';
      },
    },
    {
      id: 'fintech-suite',
      title: 'Akoin Fintech Platform',
      subtitle: 'Digital payments, working capital & risk analytics',
      icon: <CreditCard size={16} />,
      action: () => {
        onClose();
        const url = new URL(window.location.href);
        url.searchParams.set('view', 'fintech');
        window.history.pushState(null, '', url.toString());
        window.dispatchEvent(new Event('kp:popstate'));
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
    },
    {
      id: 'pitch-suite',
      title: 'Karo Pitch Platform',
      subtitle: 'Bharat startup showcase & investor matchmaking',
      icon: <Layers size={16} />,
      action: () => {
        onClose();
        const url = new URL(window.location.href);
        url.searchParams.set('view', 'pitch');
        window.history.pushState(null, '', url.toString());
        window.dispatchEvent(new Event('kp:popstate'));
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
    },
    {
      id: 'theme-dark',
      title: 'Switch to Dark Mode',
      subtitle: 'Deep Navy & Neon Blue aesthetic',
      icon: <Moon size={16} />,
      action: () => {
        setTheme('dark');
        onClose();
      },
    },
    {
      id: 'theme-light',
      title: 'Switch to Light Mode',
      subtitle: 'Clean High-Contrast Blue aesthetic',
      icon: <Sun size={16} />,
      action: () => {
        setTheme('light');
        onClose();
      },
    },
  ];

  const filteredCommands = commands.filter((c) =>
    c.title.toLowerCase().includes(query.toLowerCase()) ||
    c.subtitle.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev === 0 ? filteredCommands.length - 1 : prev - 1
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="kp-cmdk-backdrop" onClick={onClose}>
          <motion.div
            className="kp-cmdk-modal"
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Command Palette"
          >
            <div className="kp-cmdk-input-wrapper">
              <Search className="kp-cmdk-search-icon" size={18} />
              <input
                ref={inputRef}
                type="text"
                className="kp-cmdk-input"
                placeholder="Type a command or search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                className="kp-cmdk-close-btn"
                onClick={onClose}
                aria-label="Close search"
              >
                <X size={16} />
              </button>
            </div>

            <div className="kp-cmdk-list" role="listbox">
              {filteredCommands.length === 0 ? (
                <div className="kp-cmdk-empty">No results found for "{query}"</div>
              ) : (
                filteredCommands.map((cmd, idx) => (
                  <div
                    key={cmd.id}
                    className={`kp-cmdk-item ${idx === selectedIndex ? 'active' : ''}`}
                    onClick={() => cmd.action()}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    role="option"
                    aria-selected={idx === selectedIndex}
                  >
                    <div className="kp-cmdk-item-icon">{cmd.icon}</div>
                    <div className="kp-cmdk-item-content">
                      <div className="kp-cmdk-item-title">{cmd.title}</div>
                      <div className="kp-cmdk-item-sub">{cmd.subtitle}</div>
                    </div>
                    <ArrowRight className="kp-cmdk-item-arrow" size={14} />
                  </div>
                ))
              )}
            </div>

            <div className="kp-cmdk-footer">
              <span><kbd>↑</kbd> <kbd>↓</kbd> to navigate</span>
              <span><kbd>↵</kbd> to select</span>
              <span><kbd>esc</kbd> to close</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
