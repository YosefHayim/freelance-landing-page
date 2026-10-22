import type { Language } from '../language/language';

type TopBarText = {
  navigationLabel: string;
  callLabel: string;
  callHoverLabel: string;
};

export const topBarText: Record<Language, TopBarText> = {
  en: {
    navigationLabel: 'Primary',
    callLabel: 'Book a call',
    callHoverLabel: '10 minutes by phone',
  },
  he: { navigationLabel: 'ראשי', callLabel: 'לקביעת שיחה', callHoverLabel: '10 דקות בטלפון' },
};
