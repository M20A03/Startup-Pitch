import { useEffect } from 'react';

export function useGlobalKeyboardShortcuts({ onCmdK, onEscape }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Check Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        if (onCmdK) {
          e.preventDefault();
          onCmdK(e);
        }
      }

      // Check Escape key
      if (e.key === 'Escape') {
        if (onEscape) {
          onEscape(e);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onCmdK, onEscape]);
}
