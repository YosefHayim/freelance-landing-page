import type { Language } from '../language/language';
import { whatsappLink, whatsappNumber } from '../whatsapp/whatsappLink';
import { legalText } from './legal.text';

const businessEmail = 'hello@joseph-tech-solutions.dev';
const localPhoneNumber = '054-618-7549';

interface LegalContactProps {
  language: Language;
}

export const LegalContact = ({ language }: LegalContactProps) => {
  const text = legalText[language];

  return (
    <section className="legal-topic legal-contact">
      <h2>{text.contactHeading}</h2>
      <p>{text.contactLead}</p>
      <ul>
        <li>
          {text.whatsappLabel}:{' '}
          <a
            data-track="legal_whatsapp"
            href={whatsappLink(language)}
            target="_blank"
            rel="noopener"
            dir="ltr"
          >
            {localPhoneNumber}
          </a>
        </li>
        <li>
          {text.phoneLabel}:{' '}
          <a data-track="legal_phone" href={`tel:+${whatsappNumber}`} dir="ltr">
            {localPhoneNumber}
          </a>
        </li>
        <li>
          {text.emailLabel}:{' '}
          <a data-track="legal_email" href={`mailto:${businessEmail}`} dir="ltr">
            {businessEmail}
          </a>
        </li>
      </ul>
    </section>
  );
};
