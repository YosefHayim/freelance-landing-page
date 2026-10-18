import './experience.css';
import type { Language } from '../language/language';
import { experienceProofNames, experienceRoleNames, experienceText } from './experience.text';

const ebayMcpLink = 'https://github.com/YosefHayim/ebay-mcp';

interface ExperienceSectionProps {
  language: Language;
}

export const ExperienceSection = ({ language }: ExperienceSectionProps) => {
  const text = experienceText[language];

  return (
    <section className="stacking-section" id="experience" aria-labelledby="experience-heading">
      <div className="section-content">
        <h2 id="experience-heading" className="display-heading experience-heading reveal-on-scroll">
          <span>{text.heading}</span>
          <span className="muted-line">{text.mutedHeading}</span>
        </h2>
        <ul className="experience-roles reveal-on-scroll" aria-label={text.rolesLabel}>
          {experienceRoleNames.map((roleName) => (
            <li key={roleName} className="experience-role">
              {text.roles[roleName]}
            </li>
          ))}
        </ul>
        <p className="experience-lead reveal-on-scroll">{text.lead}</p>
        <ul className="experience-proofs">
          {experienceProofNames.map((proofName) => (
            <li key={proofName} className="experience-proof reveal-on-scroll">
              <p className="experience-figure">{text.proofs[proofName].figure}</p>
              <p className="experience-proof-detail">{text.proofs[proofName].detail}</p>
              {proofName === 'ebayMcp' && (
                <a
                  className="experience-proof-link"
                  data-track="experience_ebay_mcp"
                  href={ebayMcpLink}
                  target="_blank"
                  rel="noopener"
                >
                  {text.ebayMcpLinkLabel}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
