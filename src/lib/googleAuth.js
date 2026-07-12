/**
 * Google Identity Services (GIS) wrapper for the chat widget.
 * Loads Google's script lazily, renders the official sign-in button, and
 * keeps the signed ID token + decoded profile in localStorage. The token is
 * sent to /api/chat, where it is cryptographically verified server-side.
 */

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';
const STORAGE_KEY = 'as_user';
const GIS_SRC = 'https://accounts.google.com/gsi/client';

const listeners = new Set();

export function isAuthConfigured() {
  return Boolean(CLIENT_ID);
}

function decodeJwtPayload(token) {
  try {
    const payload = token.split('.')[1];
    const pad = '='.repeat((4 - (payload.length % 4)) % 4);
    return JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/') + pad));
  } catch {
    return null;
  }
}

export function getUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const user = JSON.parse(raw);
    if (!user?.token || !user?.exp) return null;
    if (user.exp * 1000 < Date.now() + 60_000) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return user;
  } catch {
    return null;
  }
}

export function signOut() {
  localStorage.removeItem(STORAGE_KEY);
  notify();
}

export function onAuthChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function notify() {
  const user = getUser();
  listeners.forEach((fn) => fn(user));
}

function handleCredential(response) {
  const payload = decodeJwtPayload(response.credential);
  if (!payload) return;
  const user = {
    token: response.credential,
    exp: payload.exp,
    sub: payload.sub,
    name: payload.name || '',
    firstName: (payload.given_name || payload.name || '').split(' ')[0],
    email: payload.email || '',
    picture: payload.picture || '',
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  notify();
}

let gisLoading = null;

function loadGis() {
  if (window.google?.accounts?.id) return Promise.resolve();
  if (gisLoading) return gisLoading;
  gisLoading = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = GIS_SRC;
    script.async = true;
    script.onload = resolve;
    script.onerror = () => reject(new Error('Failed to load Google Sign-In'));
    document.head.appendChild(script);
  });
  return gisLoading;
}

let initialized = false;

/**
 * Render the official Google button into `container`.
 * Resolves once rendered; rejects if GIS can't load or no client id is set.
 */
export async function renderSignInButton(container) {
  if (!CLIENT_ID) throw new Error('VITE_GOOGLE_CLIENT_ID is not set');
  await loadGis();
  if (!initialized) {
    window.google.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: handleCredential,
      auto_select: false,
    });
    initialized = true;
  }
  container.innerHTML = '';
  window.google.accounts.id.renderButton(container, {
    theme: 'outline',
    size: 'large',
    shape: 'pill',
    text: 'signin_with',
    width: 240,
  });
}
