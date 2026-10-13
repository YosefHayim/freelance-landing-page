import './about.css';
import { useRef } from 'react';
import type { Language } from '../language/savedLanguage';
import { aboutText } from './about.text';
import { Iceberg } from './Iceberg';

interface AboutSectionProps {
  language: Language;
  prefersReducedMotion: boolean;
  isCovered: boolean;
}

export const AboutSection = ({ language, prefersReducedMotion, isCovered }: AboutSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const text = aboutText[language];

  return (
    <section
      ref={sectionRef}
      className="stacking-section"
      id="about"
      aria-labelledby="about-heading"
    >
      <div className="section-content about-layout">
        <h2 id="about-heading" className="display-heading about-heading reveal-on-scroll">
          <span>{text.heading}</span>
          {text.mutedHeadingLines.map((line) => (
            <span key={line} className="muted-line">
              {line}
            </span>
          ))}
        </h2>
        <p className="about-lead reveal-on-scroll">{text.lead}</p>
        <Iceberg
          language={language}
          prefersReducedMotion={prefersReducedMotion}
          isCovered={isCovered}
          tiltAreaRef={sectionRef}
        />
        <div className="about-story">
          {text.paragraphs.map((paragraph) => (
            <p key={paragraph.opening} className="about-paragraph reveal-on-scroll">
              <b className="about-paragraph-opening">{paragraph.opening}</b> {paragraph.rest}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};
