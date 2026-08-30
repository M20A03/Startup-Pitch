import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import About from './components/About';
import HowItWorks from './components/HowItWorks';
import WhoCanApply from './components/WhoCanApply';
import Investors from './components/Investors';
import FeaturedStartups from './components/FeaturedStartups';
import KaroStartup from './components/KaroStartup';
import CTA from './components/CTA';
import Footer from './components/Footer';
import { FintechView } from './components/FintechView';
import { PitchModal } from './components/PitchModal';
import { CommandPalette } from './components/CommandPalette';
import { ToastContainer } from './components/Toast';
import { useGlobalKeyboardShortcuts } from './hooks/useKeyboardShortcut';
import { useUrlState } from './hooks/useUrlState';

export default function App() {
  const [urlState, setUrlState] = useUrlState({ view: 'pitch' });
  const [pitchOpen, setPitchOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const currentView = urlState.view || 'pitch';

  const handleToggleView = (nextView) => {
    setUrlState({ view: nextView });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Global Keyboard Shortcuts (Cmd+K / Ctrl+K and Escape)
  useGlobalKeyboardShortcuts({
    onCmdK: () => setSearchOpen((prev) => !prev),
    onEscape: () => {
      setSearchOpen(false);
      setPitchOpen(false);
    },
  });

  return (
    <>
      {/* SC 2.4.1 Level A — Bypass Blocks: skip link lets keyboard users jump past the navbar */}
      <a href="#main-content" className="skip-link">Skip to main content</a>

      <Navbar
        currentView={currentView}
        onToggleView={handleToggleView}
        onOpenPitch={() => setPitchOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
      />

      {/* Main Landmark Area */}
      <main id="main-content">
        {currentView === 'fintech' ? (
          <FintechView onOpenPitch={() => setPitchOpen(true)} />
        ) : (
          <div id="pitch-platform">
            <Hero onOpenPitch={() => setPitchOpen(true)} />
            <TrustBar />
            <About />
            <HowItWorks />
            <WhoCanApply onOpenPitch={() => setPitchOpen(true)} />
            <FeaturedStartups onApplyToPitch={() => setPitchOpen(true)} />
            <Investors />
            <KaroStartup />
            <CTA onOpenPitch={() => setPitchOpen(true)} />
          </div>
        )}
      </main>

      <Footer onToggleView={handleToggleView} />

      {/* Interactive Global Drawers and Modals */}
      <PitchModal
        isOpen={pitchOpen}
        onClose={() => setPitchOpen(false)}
      />

      <CommandPalette
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onOpenPitch={() => setPitchOpen(true)}
      />

      {/* Reactive Global Toast Viewport */}
      <ToastContainer />
    </>
  );
}
