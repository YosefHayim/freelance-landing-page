import { runAfterPageSettles } from '../pageLoad/runAfterPageSettles';

const containerScriptAddress = 'https://www.googletagmanager.com/gtm.js?id=GTM-5KKTTCRT';

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

const addContainerScript = () => {
  const script = document.createElement('script');
  script.async = true;
  script.src = containerScriptAddress;
  document.head.append(script);
};

export const loadGoogleTagManager = () => {
  if (!import.meta.env.PROD) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
  runAfterPageSettles(addContainerScript);
};
