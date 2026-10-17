import './legalLinks.css';
import type { Language } from '../language/language';
import { legalText } from './legal.text';
import { type LegalPageName, legalDocuments, legalPageNames, legalPagePath } from './legalPages';

interface LegalLinksProps {
  language: Language;
  currentPage?: LegalPageName;
}

export const LegalLinks = ({ language, currentPage }: LegalLinksProps) => (
  <nav className="legal-links" aria-label={legalText[language].linksLabel}>
    {legalPageNames.map((legalPageName) => (
      <a
        key={legalPageName}
        data-track={`footer_${legalPageName}`}
        href={`${legalPagePath(legalPageName)}?lang=${language}`}
        aria-current={legalPageName === currentPage ? 'page' : undefined}
      >
        {legalDocuments[legalPageName][language].heading}
      </a>
    ))}
  </nav>
);
