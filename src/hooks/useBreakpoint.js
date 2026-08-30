import { useState, useEffect } from 'react';

export function useBreakpoint() {
  const getSnapshot = () => {
    if (typeof window === 'undefined') {
      return {
        isMobile: false,
        isTablet: false,
        isLaptop: true,
        isDesktop: false,
        width: 1366,
        height: 768,
        isTouchDevice: false,
        orientation: 'landscape',
      };
    }

    const w = window.innerWidth;
    const h = window.innerHeight;
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    return {
      isMobile: w < 768,
      isTablet: w >= 768 && w < 1024,
      isLaptop: w >= 1024 && w < 1440,
      isDesktop: w >= 1440,
      width: w,
      height: h,
      isTouchDevice: isTouch,
      orientation: w > h ? 'landscape' : 'portrait',
    };
  };

  const [state, setState] = useState(getSnapshot);

  useEffect(() => {
    let timeoutId;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        setState(getSnapshot());
      }, 16);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleResize, { passive: true });

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return state;
}
