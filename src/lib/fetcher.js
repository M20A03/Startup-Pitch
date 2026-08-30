/**
 * KARO PITCH — Resilient Enterprise Network Fetcher
 * Features:
 * - Exponential backoff retry
 * - Timeout interception with AbortController
 * - Automatic idempotency key injection
 * - 401 Unauthorized handling & local state purge
 * - 403 Forbidden handling
 * - Global toast dispatch
 */

export class FetchError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'FetchError';
    this.status = status;
    this.data = data;
  }
}

export function dispatchAppToast(type, message) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('kp:toast', {
        detail: {
          id: Math.random().toString(36).substring(2),
          type,
          message,
          timestamp: Date.now(),
        },
      })
    );
  }
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function resilientFetch(url, options = {}) {
  const {
    timeoutMs = 8000,
    retries = 3,
    backoffFactor = 500,
    idempotent = false,
    headers = {},
    ...restOptions
  } = options;

  const requestHeaders = new Headers(headers);
  if (!requestHeaders.has('Content-Type') && !(restOptions.body instanceof FormData)) {
    requestHeaders.set('Content-Type', 'application/json');
  }

  if (idempotent && !requestHeaders.has('kp-idempotency-key')) {
    requestHeaders.set(
      'kp-idempotency-key',
      `idem_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
    );
  }

  let attempt = 0;
  while (attempt <= retries) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, {
        ...restOptions,
        headers: requestHeaders,
        signal: controller.signal,
      });

      clearTimeout(timer);

      // Handle 401 Unauthorized globally
      if (response.status === 401) {
        localStorage.removeItem('kp-auth-token');
        dispatchAppToast('warning', 'Session expired. Please log in again.');
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('kp:unauthorized'));
        }
        throw new FetchError('Session Expired', 401);
      }

      // Handle 403 Forbidden
      if (response.status === 403) {
        dispatchAppToast('error', 'You do not have permission to perform this action.');
        throw new FetchError('Forbidden', 403);
      }

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          errorData = null;
        }

        const errorMessage =
          errorData?.message ||
          (response.status === 409
            ? 'A record with this identifier already exists.'
            : `Request failed with status ${response.status}`);

        if (response.status >= 500 && attempt < retries) {
          throw new FetchError(errorMessage, response.status, errorData);
        }

        dispatchAppToast('error', errorMessage);
        throw new FetchError(errorMessage, response.status, errorData);
      }

      if (response.status === 204) {
        return {};
      }

      return await response.json();
    } catch (err) {
      clearTimeout(timer);
      const isAbort = err.name === 'AbortError';
      const isServerFault = err.status >= 500 || isAbort;

      if (attempt < retries && (isServerFault || !err.status)) {
        const delay = Math.pow(2, attempt) * backoffFactor;
        console.warn(`[resilientFetch] Attempt ${attempt + 1} failed (${err.message}). Retrying in ${delay}ms...`);
        await wait(delay);
        attempt++;
      } else {
        if (isAbort) {
          dispatchAppToast('error', 'The request timed out. Please check your network connection.');
        }
        throw err;
      }
    }
  }

  throw new FetchError('Max retry limit exceeded', 504);
}
