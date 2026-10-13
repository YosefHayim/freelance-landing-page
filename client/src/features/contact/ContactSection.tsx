import './contact.css';
import { LogoMark } from '../../components/LogoMark';
import type { Language } from '../language/savedLanguage';
import { whatsappLink } from '../whatsapp/whatsappLink';
import { CopiedNotice } from './CopiedNotice';
import { contactText } from './contact.text';
import { SocialLinks } from './SocialLinks';
import { StarrySkyCanvas } from './StarrySkyCanvas';
import { useCopiedNotice } from './useCopiedNotice';

const skyGlows = [
  {
    width: '60%',
    height: '28%',
    left: '-10%',
    bottom: '8%',
    background: 'var(--blue-dark)',
    animationDuration: '28s',
    animationDelay: '-8s',
  },
  {
    width: '50%',
    height: '22%',
    right: '-8%',
    bottom: '20%',
    background: 'var(--blue)',
    animationDuration: '34s',
    animationDelay: '-14s',
  },
  {
    width: '70%',
    height: '20%',
    left: '20%',
    bottom: '-6%',
    background: 'var(--blue-light)',
    animationDuration: '25s',
    animationDelay: '-4s',
  },
];

interface ContactSectionProps {
  language: Language;
  prefersReducedMotion: boolean;
}

export const ContactSection = ({ language, prefersReducedMotion }: ContactSectionProps) => {
  const text = contactText[language];
  const { copiedCount, isNoticeVisible, showNotice } = useCopiedNotice();
  const [firstHeadingLine, secondHeadingLine] = text.headingLines;

  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-heading">
      <div className="moving-sky" aria-hidden="true" />
      {skyGlows.map((glow) => (
        <div key={glow.background} className="sky-glow" style={glow} />
      ))}
      <StarrySkyCanvas prefersReducedMotion={prefersReducedMotion} />
      <div className="section-content contact-content">
        <h2 id="contact-heading" className="display-heading contact-heading reveal-on-scroll">
          <span>{firstHeadingLine}</span> <span>{secondHeadingLine}</span>{' '}
          <span className="contact-muted-line">{text.mutedLine}</span>
        </h2>
        <div className="contact-actions reveal-on-scroll" style={{ transitionDelay: '.1s' }}>
          <a
            className="contact-call-button"
            data-track="contact_call"
            href={whatsappLink(language)}
            target="_blank"
            rel="noopener"
          >
            {text.callLabel}
          </a>
        </div>
      </div>
      <footer className="site-footer">
        <LogoMark />
        <SocialLinks language={language} onHandleCopied={showNotice} />
      </footer>
      <CopiedNotice
        copiedCount={copiedCount}
        isVisible={isNoticeVisible}
        message={text.copiedNotice}
      />
    </section>
  );
};
