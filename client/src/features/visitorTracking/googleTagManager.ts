import { loadOutsideScript } from './loadOutsideScript';

const containerScriptAddress = 'https://www.googletagmanager.com/gtm.js?id=GTM-5KKTTCRT';

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export const loadGoogleTagManager = () => {
  if (!import.meta.env.PROD) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
  loadOutsideScript(containerScriptAddress);
};
