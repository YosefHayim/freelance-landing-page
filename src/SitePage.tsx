import { App } from './App';
import type { Language } from './features/language/language';
import { LegalPage } from './features/legal/LegalPage';
import { legalPageAt } from './features/legal/legalPages';

interface SitePageProps {
  pagePath: string;
  initialLanguage: Language;
}

export const SitePage = ({ pagePath, initialLanguage }: SitePageProps) => {
  const legalPageName = legalPageAt(pagePath);
  if (!legalPageName) return <App initialLanguage={initialLanguage} />;
  return <LegalPage initialLanguage={initialLanguage} legalPageName={legalPageName} />;
};
