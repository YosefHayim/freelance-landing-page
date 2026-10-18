import type { Language } from '../language/language';

export const aboutParagraphNames = [
  'whoFor',
  'oneContact',
  'writtenOffer',
  'startSmall',
  'yourCode',
] as const;

type AboutParagraphName = (typeof aboutParagraphNames)[number];

type AboutText = {
  heading: string;
  mutedHeading: string;
  paragraphs: Record<AboutParagraphName, string>;
};

export const aboutText: Record<Language, AboutText> = {
  en: {
    heading: 'That part',
    mutedHeading: 'leave it to me',
    paragraphs: {
      whoFor: 'I build apps and systems for people with a good idea and no tech side.',
      oneContact:
        'No project manager, no slide decks, and no "we\'ll get back to you". Just me, on WhatsApp, from day one until the product is live.',
      writtenOffer:
        "Tell me about the idea, even if it's still messy. You get a written offer: what gets built first, what each part costs, and when it's ready.",
      startSmall:
        'Start small, with the one thing your customers need most. Launch it, and grow from there.',
      yourCode:
        'I build, and you decide at every step. And in the end, the code is yours. All of it.',
    },
  },
  he: {
    heading: 'את החלק הזה',
    mutedHeading: 'תשאירו לי',
    paragraphs: {
      whoFor: 'אני בונה אפליקציות ומערכות לאנשים עם רעיון טוב ובלי צד טכני.',
      oneContact:
        'אין אצלי מנהל פרויקט, אין מצגות, ואין "נחזור אליכם". יש אותי, בוואטסאפ, מהיום הראשון ועד שהמוצר באוויר.',
      writtenOffer:
        'מספרים לי על הרעיון, גם אם הוא עוד מבולגן. מקבלים הצעה בכתב: מה בונים קודם, כמה עולה כל חלק, ומתי זה מוכן.',
      startSmall: 'מתחילים קטן, עם הדבר האחד שהלקוחות שלכם הכי צריכים. משיקים אותו, ומשם גדלים.',
      yourCode: 'אני בונה, ואתם מחליטים בכל שלב. ובסוף, הקוד שלכם. כולו.',
    },
  },
};
