import type { Language } from '../language/language';

type TopBarText = {
  navigationLabel: string;
  callLabel: string;
  callHoverLabel: string;
};

export const topBarText: Record<Language, TopBarText> = {
  en: { navigationLabel: 'Primary', callLabel: 'Send a message', callHoverLabel: 'On WhatsApp' },
  he: { navigationLabel: 'ראשי', callLabel: 'שלחו הודעה', callHoverLabel: 'בוואטסאפ' },
};
