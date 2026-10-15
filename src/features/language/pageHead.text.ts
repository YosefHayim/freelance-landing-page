import type { Language } from './language';

type PageHeadText = {
  title: string;
  description: string;
};

export const pageHeadText: Record<Language, PageHeadText> = {
  en: {
    title: 'Joseph Sabag | Software engineer for founders and businesses',
    description:
      'Launch an idea, rescue an unfinished product, or automate your business with Joseph Sabag, your technical partner.',
  },
  he: {
    title: 'יוסף סבג | מהנדס תוכנה ליזמים ולעסקים',
    description:
      'להשיק רעיון, להציל מוצר שנתקע או להכניס אוטומציה לעסק, עם יוסף סבג, השותף הטכני שלכם.',
  },
};
