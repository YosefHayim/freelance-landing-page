import { PhoneIcon } from '../../components/PhoneIcon';
import { RollingLabel } from '../../components/RollingLabel';
import type { Language } from '../language/language';
import { whatsappLink } from '../whatsapp/whatsappLink';
import { topBarText } from './topBar.text';

interface TopBarCallButtonProps {
  language: Language;
}

export const TopBarCallButton = ({ language }: TopBarCallButtonProps) => {
  const text = topBarText[language];
  return (
    <a
      className="top-bar-call-button"
      data-track="top_bar_call"
      href={whatsappLink(language)}
      target="_blank"
      rel="noopener"
    >
      <span className="online-dot" aria-hidden="true" />
      <RollingLabel label={text.callLabel} hoverLabel={text.callHoverLabel} />
      <span className="phone-icon" aria-hidden="true">
        <PhoneIcon />
      </span>
    </a>
  );
};
