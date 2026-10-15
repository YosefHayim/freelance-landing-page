import './fonts.css';
import './globalStyles.css';
import { loadChatWidget } from './features/chat/loadChatWidget';
import { loadMonoFont } from './features/pageLoad/loadMonoFont';
import { runAfterFirstPaint } from './features/pageLoad/runAfterFirstPaint';
import { loadGoogleTagManager } from './features/visitorTracking/googleTagManager';
import { loadMetaPixel } from './features/visitorTracking/metaPixel';

const loadApp = async () => {
  const [appModule] = await Promise.all([import('./startApp'), loadMonoFont()]);
  appModule.startApp();
};

runAfterFirstPaint(loadApp);
loadChatWidget();
loadMetaPixel();
loadGoogleTagManager();
