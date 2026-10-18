import type { Language } from '../language/language';

type TopBarText = {
  navigationLabel: string;
  callLabel: string;
  callHoverLabel: string;
};

export const topBarText: Record<Language, TopBarText> = {
  en: {
    navigationLabel: 'Primary',
    callLabel: 'Book a free call',
    callHoverLabel: '10 minutes by phone',
  },
  he: { navigationLabel: 'ראשי', callLabel: 'לקביעת שיחה בחינם', callHoverLabel: '10 דקות בטלפון' },
};
