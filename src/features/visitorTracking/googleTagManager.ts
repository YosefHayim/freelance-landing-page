import { runAfterFirstInteraction } from '../pageLoad/runAfterFirstInteraction';
import { addScript } from './addScript';

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
  runAfterFirstInteraction(() => addScript(containerScriptAddress));
};
