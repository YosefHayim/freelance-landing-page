import './fonts.css';
import './globalStyles.css';
import { loadChatWidget } from './features/chat/loadChatWidget';
import { runAfterFirstPaint } from './features/pageLoad/runAfterFirstPaint';
import { loadGoogleTagManager } from './features/visitorTracking/googleTagManager';
import { loadMetaPixel } from './features/visitorTracking/metaPixel';

const loadApp = async () => {
  const { startApp } = await import('./startApp');
  startApp();
};

if (import.meta.env.DEV) loadApp();
if (import.meta.env.PROD) runAfterFirstPaint(loadApp);
loadChatWidget();
loadMetaPixel();
loadGoogleTagManager();
