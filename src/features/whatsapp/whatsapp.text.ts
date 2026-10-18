import type { Language } from '../language/language';

type WhatsappText = {
  message: string;
};

export const whatsappText: Record<Language, WhatsappText> = {
  en: {
    message:
      'Hi Joseph, I found you through your site. I have an idea and would love to tell you about it.',
  },
  he: { message: 'היי יוסף, הגעתי דרך האתר. יש לי רעיון ואשמח לספר לך עליו.' },
};
