import { PhoneIcon } from '../../components/PhoneIcon';
import { RollingLabel } from '../../components/RollingLabel';
import type { Language } from '../language/savedLanguage';
import { whatsappLink } from '../whatsapp/whatsappLink';
import { introText } from './intro.text';

const confettiPieces = [
  { x: '-70px', y: '-34px', color: 'var(--yellow)' },
  { x: '-30px', y: '-46px', color: 'var(--pink)' },
  { x: '20px', y: '-48px', color: 'var(--green-bright)' },
  { x: '64px', y: '-30px', color: 'var(--blue-light)' },
  { x: '74px', y: '20px', color: 'var(--yellow)' },
  { x: '-74px', y: '22px', color: 'var(--purple)' },
];

interface IntroCallButtonProps {
  language: Language;
}

export const IntroCallButton = ({ language }: IntroCallButtonProps) => {
  const text = introText[language];
  return (
    <a
      className="intro-call-button"
      data-track="intro_call"
      href={whatsappLink(language)}
      target="_blank"
      rel="noopener"
    >
      <RollingLabel label={text.callLabel} hoverLabel={text.callHoverLabel} />
      <span className="call-icon-swap" aria-hidden="true">
        <svg
          className="call-icon-arrow"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
        <span className="call-icon-phone">
          <PhoneIcon />
        </span>
      </span>
      <span className="confetti-burst" aria-hidden="true">
        {confettiPieces.map((piece) => (
          <b
            key={`${piece.x} ${piece.y}`}
            style={{ '--confetti-x': piece.x, '--confetti-y': piece.y, background: piece.color }}
          />
        ))}
      </span>
    </a>
  );
};
