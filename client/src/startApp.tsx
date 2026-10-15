import { StrictMode, startTransition } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { App } from './App';
import { pageLanguage } from './features/language/savedLanguage';

export const startApp = () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) throw new Error('Missing application root');
  const page = (
    <StrictMode>
      <App initialLanguage={pageLanguage()} />
    </StrictMode>
  );
  const hydratePage = () => {
    hydrateRoot(rootElement, page);
  };
  if (import.meta.env.DEV) createRoot(rootElement).render(page);
  if (import.meta.env.PROD) startTransition(hydratePage);
};
