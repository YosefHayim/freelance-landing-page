import type { Language } from './language';

export type PageHeadText = {
  title: string;
  description: string;
};

export const pageHeadText: Record<Language, PageHeadText> = {
  en: {
    title: 'Joseph Sabag | Apps and systems for founders with no tech side',
    description:
      'Got a good idea and no tech side? Joseph Sabag builds apps and systems with you, from day one until the product is live. A written offer, and the code is yours.',
  },
  he: {
    title: 'יוסף סבג | אפליקציות ומערכות ליזמים בלי צד טכני',
    description:
      'יש לכם רעיון טוב ואין לכם צד טכני? יוסף סבג בונה איתכם אפליקציות ומערכות, מהיום הראשון ועד שהמוצר באוויר. הצעה בכתב, והקוד שלכם.',
  },
};
