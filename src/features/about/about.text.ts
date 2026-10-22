import type { Language } from '../language/language';

export const aboutParagraphNames = [
  'whoFor',
  'aiReview',
  'yourCode',
  'oneContact',
  'startSmall',
] as const;

export const aboutStepNames = ['call', 'questionnaire', 'spec'] as const;

export type AboutParagraphName = (typeof aboutParagraphNames)[number];

type AboutStepName = (typeof aboutStepNames)[number];

type AboutStepText = {
  title: string;
  detail: string;
};

type AboutText = {
  heading: string;
  mutedHeading: string;
  paragraphs: Record<AboutParagraphName, string>;
  stepsLabel: string;
  steps: Record<AboutStepName, AboutStepText>;
};

export const aboutText: Record<Language, AboutText> = {
  en: {
    heading: "Don't know code?",
    mutedHeading: "That's what I'm here for",
    paragraphs: {
      whoFor:
        'I build apps and systems for people with a good idea, and I check and fix products already built with AI.',
      aiReview:
        "AI writes code fast. I check that it's secure, that it passes tests, and that it's built for your product's next version. And I explain everything I found in plain words.",
      yourCode:
        'I build, and you decide at every step, and understand why. And in the end, the code is yours. All of it.',
      oneContact:
        'No project manager, no slide decks, and no "we\'ll get back to you". Just me, on WhatsApp, from day one until the product is live.',
      startSmall:
        'Start small, with the one thing your customers need most. Launch it, and grow from there.',
    },
    stepsLabel: 'How it works',
    steps: {
      call: {
        title: 'A 10-minute call',
        detail: "Tell me about the idea, or what you've already built.",
      },
      questionnaire: {
        title: 'A short questionnaire',
        detail: 'A few questions, so I understand exactly what you need.',
      },
      spec: {
        title: 'A ready spec',
        detail:
          "What gets built first and in what order, with a written offer. Or just advice, if that's what you need.",
      },
    },
  },
  he: {
    heading: 'לא מבינים בקוד?',
    mutedHeading: 'בשביל זה אני פה',
    paragraphs: {
      whoFor: 'אני בונה אפליקציות ומערכות לאנשים עם רעיון טוב, ובודק ומתקן מוצרים שכבר נבנו עם AI.',
      aiReview:
        'AI כותב קוד מהר. אני בודק שהוא מאובטח, שהוא עובר בדיקות, ושהוא בנוי לגרסה הבאה של המוצר. ומסביר לכם במילים פשוטות כל מה שמצאתי.',
      yourCode: 'אני בונה, ואתם מחליטים בכל שלב, ומבינים למה. ובסוף, הקוד שלכם. כולו.',
      oneContact:
        'אין אצלי מנהל פרויקט, אין מצגות, ואין "נחזור אליכם". יש אותי, בוואטסאפ, מהיום הראשון ועד שהמוצר באוויר.',
      startSmall: 'מתחילים קטן, עם הדבר האחד שהלקוחות שלכם הכי צריכים. משיקים אותו, ומשם גדלים.',
    },
    stepsLabel: 'איך זה עובד',
    steps: {
      call: {
        title: 'שיחה של 10 דקות',
        detail: 'מספרים לי על הרעיון, או על מה שכבר בניתם.',
      },
      questionnaire: { title: 'שאלון קצר', detail: 'כמה שאלות, כדי שאבין בדיוק מה אתם צריכים.' },
      spec: {
        title: 'אפיון מוכן',
        detail: 'מה בונים קודם ובאיזה סדר, עם הצעה בכתב. או רק ייעוץ, אם זה מה שאתם צריכים.',
      },
    },
  },
};
