import type { Language } from '../language/language';

type WhatsappText = {
  message: string;
};

export const whatsappText: Record<Language, WhatsappText> = {
  en: { message: 'Hi Joseph, I have an idea I want to build. When can we set up a call?' },
  he: { message: 'היי יוסף, יש לי רעיון שאני רוצה לפתח. מתי אפשר לקבוע שיחה?' },
};
