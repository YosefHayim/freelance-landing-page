import type { Language } from './language';

export type PageHeadText = {
  title: string;
  description: string;
};

export const pageHeadText: Record<Language, PageHeadText> = {
  en: {
    title: 'Joseph Sabag | x10 AI Native Developer',
    description:
      "Built with AI, or have only an idea? In a 10-minute call, we'll work out together how to build a product you can trust.",
  },
  he: {
    title: 'יוסף סבג | x10 AI Native Developer',
    description:
      'בניתם עם AI, או שיש לכם רק רעיון? ב-10 דקות של שיחה נבין ביחד איך לבנות מוצר שאפשר לסמוך עליו.',
  },
};
