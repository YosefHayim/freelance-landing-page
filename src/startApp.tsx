import { StrictMode, startTransition } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { pageLanguage } from './features/language/language';
import { SitePage } from './SitePage';

export const startApp = () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) throw new Error('Missing application root');
  const page = (
    <StrictMode>
      <SitePage pagePath={location.pathname} initialLanguage={pageLanguage()} />
    </StrictMode>
  );
  const hydratePage = () => {
    hydrateRoot(rootElement, page);
  };
  if (import.meta.env.DEV) createRoot(rootElement).render(page);
  if (import.meta.env.PROD) startTransition(hydratePage);
};
