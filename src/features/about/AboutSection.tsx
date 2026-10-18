import './about.css';
import type { Language } from '../language/language';
import { aboutParagraphNames, aboutStepNames, aboutText } from './about.text';
import { aboutParagraphIcons } from './aboutParagraphIcons';

interface AboutSectionProps {
  language: Language;
}

export const AboutSection = ({ language }: AboutSectionProps) => {
  const text = aboutText[language];

  return (
    <section className="stacking-section" id="about" aria-labelledby="about-heading">
      <div className="section-content about-layout">
        <h2 id="about-heading" className="display-heading about-heading reveal-on-scroll">
          <span>{text.heading}</span>
          <span className="muted-line">{text.mutedHeading}</span>
        </h2>
        {aboutParagraphNames.map((paragraphName) => (
          <p key={paragraphName} className="about-paragraph reveal-on-scroll">
            <svg
              className="about-paragraph-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {aboutParagraphIcons[paragraphName]}
            </svg>
            <span>{text.paragraphs[paragraphName]}</span>
          </p>
        ))}
        <ol className="about-steps" aria-label={text.stepsLabel}>
          {aboutStepNames.map((stepName) => (
            <li key={stepName} className="about-step reveal-on-scroll">
              <p className="about-step-title">{text.steps[stepName].title}</p>
              <p className="about-step-detail">{text.steps[stepName].detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
