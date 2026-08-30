import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';
import './Toast.css';

export function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handleToast = (e) => {
      const { id, type, message, timestamp } = e.detail;
      setToasts((prev) => [...prev, { id, type, message, timestamp }]);

      // Auto dismiss after 4.5s
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4500);
    };

    window.addEventListener('kp:toast', handleToast);
    return () => window.removeEventListener('kp:toast', handleToast);
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="kp-toast-icon success" size={18} />;
      case 'error':
        return <AlertCircle className="kp-toast-icon error" size={18} />;
      case 'warning':
        return <AlertTriangle className="kp-toast-icon warning" size={18} />;
      default:
        return <Info className="kp-toast-icon info" size={18} />;
    }
  };

  return (
    <div className="kp-toast-viewport" aria-live="polite" aria-atomic="true">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            className={`kp-toast-card kp-toast-${t.type}`}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            role="alert"
          >
            <div className="kp-toast-content">
              {getIcon(t.type)}
              <span className="kp-toast-message">{t.message}</span>
            </div>
            <button
              className="kp-toast-close"
              onClick={() => removeToast(t.id)}
              aria-label="Close notification"
            >
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
