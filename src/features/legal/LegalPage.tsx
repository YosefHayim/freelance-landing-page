import './legal.css';
import { useRef } from 'react';
import { startFormAddress } from '../contact/startFormLink';
import type { Language } from '../language/language';
import { useLanguage } from '../language/useLanguage';
import { TopBar } from '../topBar/TopBar';
import { useVisitorTracking } from '../visitorTracking/useVisitorTracking';
import { LegalContact } from './LegalContact';
import { LegalLinks } from './LegalLinks';
import { LegalTopic } from './LegalTopic';
import { legalText } from './legal.text';
import { type LegalPageName, legalDocuments } from './legalPages';

const siteAddress = 'joseph-tech-solutions.dev';

interface LegalPageProps {
  initialLanguage: Language;
  legalPageName: LegalPageName;
}

export const LegalPage = ({ initialLanguage, legalPageName }: LegalPageProps) => {
  const documentText = legalDocuments[legalPageName];
  const { language, toggleLanguage } = useLanguage(initialLanguage, documentText);
  const mainRef = useRef<HTMLElement>(null);
  useVisitorTracking(mainRef);
  const legalDocument = documentText[language];
  const text = legalText[language];
  const headingId = `${legalPageName}-heading`;

  return (
    <>
      <TopBar language={language} onToggleLanguage={toggleLanguage} />
      <main ref={mainRef} className="legal-page">
        <section id={legalPageName} className="legal-document" aria-labelledby={headingId}>
          <div className="legal-content">
            <a className="legal-home-link" data-track="legal_home" href={`/?lang=${language}`}>
              {text.homeLink}
            </a>
            <h1 id={headingId} className="display-heading legal-heading">
              {legalDocument.heading}
            </h1>
            <p className="legal-details">{text.updated}</p>
            <p className="legal-details">
              {text.sitesLabel}: <bdi>{siteAddress}</bdi>, <bdi>{startFormAddress}</bdi>
            </p>
            <p className="legal-intro">{legalDocument.intro}</p>
            {legalDocument.topics.map((topic) => (
              <LegalTopic key={topic.heading} topic={topic} />
            ))}
            <LegalContact language={language} />
          </div>
        </section>
      </main>
      <footer className="legal-footer">
        <LegalLinks language={language} currentPage={legalPageName} />
      </footer>
    </>
  );
};
