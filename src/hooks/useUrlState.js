import { useCallback, useState, useEffect } from 'react';

export function useUrlState(defaultState) {
  const readCurrentState = useCallback(() => {
    if (typeof window === 'undefined') return defaultState;
    const params = new URLSearchParams(window.location.search);
    const current = { ...defaultState };

    Object.keys(defaultState).forEach((key) => {
      if (params.has(key)) {
        const val = params.get(key);
        if (typeof defaultState[key] === 'number') {
          current[key] = Number(val);
        } else if (typeof defaultState[key] === 'boolean') {
          current[key] = val === 'true';
        } else {
          current[key] = val;
        }
      }
    });

    return current;
  }, [defaultState]);

  const [state, setState] = useState(readCurrentState);

  useEffect(() => {
    const onPop = () => setState(readCurrentState());
    window.addEventListener('popstate', onPop);
    window.addEventListener('kp:popstate', onPop);
    return () => {
      window.removeEventListener('popstate', onPop);
      window.removeEventListener('kp:popstate', onPop);
    };
  }, [readCurrentState]);

  const setUrlState = useCallback(
    (updates) => {
      const next = typeof updates === 'function' ? updates(state) : { ...state, ...updates };
      const nextParams = new URLSearchParams(window.location.search);

      Object.entries(next).forEach(([key, val]) => {
        if (val === undefined || val === null || val === defaultState[key] || val === '') {
          nextParams.delete(key);
        } else {
          nextParams.set(key, String(val));
        }
      });

      const queryString = nextParams.toString();
      const nextUrl = `${window.location.pathname}${queryString ? `?${queryString}` : ''}${window.location.hash}`;
      window.history.pushState(null, '', nextUrl);
      setState(next);
      window.dispatchEvent(new Event('kp:popstate'));
    },
    [state, defaultState]
  );

  return [state, setUrlState];
}
