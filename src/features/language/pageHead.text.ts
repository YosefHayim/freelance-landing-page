import type { Language } from './language';

export type PageHeadText = {
  title: string;
  description: string;
};

export const pageHeadText: Record<Language, PageHeadText> = {
  en: {
    title: 'Joseph Sabag | Software engineer',
    description:
      "Built with AI, or have only an idea? In a free 10-minute call, we'll work out together how to build a product you can trust.",
  },
  he: {
    title: 'יוסף סבג | מהנדס תוכנה',
    description:
      'בניתם עם AI, או שיש לכם רק רעיון? ב-10 דקות של שיחה, בחינם, נבין ביחד איך לבנות מוצר שאפשר לסמוך עליו.',
  },
};
