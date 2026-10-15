import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { App } from './App';
import { languageFromLocale } from './features/language/savedLanguage';

export const startApp = () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) throw new Error('Missing application root');
  const initialLanguage = languageFromLocale(document.documentElement.lang);
  const app = (
    <StrictMode>
      <App initialLanguage={initialLanguage} />
    </StrictMode>
  );
  if (rootElement.hasChildNodes()) {
    hydrateRoot(rootElement, app);
    return;
  }
  const root = createRoot(rootElement);
  root.render(app);
};
