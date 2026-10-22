import type { Language } from '../language/language';
import type { WorkTypeName } from './workTypes';

type WorkTypeText = {
  label: string;
  caption: string;
};

type IntroText = {
  sectionLabel: string;
  greeting: string;
  photoAlt: string;
  headline: string;
  mutedLine: string;
  summary: string;
  callLabel: string;
  callHoverLabel: string;
  showcaseLabel: string;
  workTypes: Record<WorkTypeName, WorkTypeText>;
};

export const introText: Record<Language, IntroText> = {
  en: {
    sectionLabel: 'Intro',
    greeting: "Hi, I'm Joseph. A software engineer, and a founder at heart.",
    photoAlt: 'Joseph Sabag',
    headline: 'With AI, building is easy',
    mutedLine: 'Trusting what you built, less so',
    summary:
      "Is it secure? Did it pass tests? Will it hold up when users arrive? For over two years I've been building apps, websites and AI systems. Let's start with an intro call: we'll work out together exactly what you need, and you'll get real help. Even if all you have is an idea.",
    callLabel: 'Book a call',
    callHoverLabel: '10 minutes by phone',
    showcaseLabel: 'What I build',
    workTypes: {
      website: {
        label: 'Websites',
        caption:
          "Landing pages, and an internal system that runs a nonprofit's income and expenses",
      },
      app: {
        label: 'Apps',
        caption: 'A yoga app that watches your pose and corrects it in real time',
      },
      automation: {
        label: 'Bots and automations',
        caption: 'Telegram bots, and bots that scan websites and collect information',
      },
      aiTool: {
        label: 'AI tools',
        caption: 'A site and an app with AI that connect unpublished stories with journalists',
      },
      extension: {
        label: 'Extensions',
        caption: 'Chrome extensions that do the work on their own',
      },
    },
  },
  he: {
    sectionLabel: 'פתיחה',
    greeting: 'היי, אני יוסף. מהנדס תוכנה, ויזם בנשמה.',
    photoAlt: 'יוסף סבג',
    headline: 'עם AI, לבנות זה קל',
    mutedLine: 'לסמוך על מה שבניתם, פחות',
    summary:
      'מאובטח? עבר בדיקות? יחזיק כשיגיעו משתמשים? כבר יותר משנתיים אני בונה אפליקציות, אתרים ומערכות AI. אני מזמין אתכם לשיחת היכרות: נבין ביחד מה בדיוק אתם צריכים, ותקבלו עזרה אמיתית. גם אם יש לכם רק רעיון.',
    callLabel: 'לקביעת שיחה',
    callHoverLabel: '10 דקות בטלפון',
    showcaseLabel: 'מה אני בונה',
    workTypes: {
      website: {
        label: 'אתרים ומערכות',
        caption: 'דפי נחיתה, ומערכת פנימית שמנהלת לעמותה את כל ההכנסות וההוצאות',
      },
      app: {
        label: 'אפליקציות',
        caption: 'אפליקציית יוגה שעוקבת אחרי התנוחה שלכם, ומתקנת אותה בזמן אמת',
      },
      automation: {
        label: 'בוטים ואוטומציות',
        caption: 'בוטים לטלגרם, ובוטים שסורקים אתרים ואוספים מהם מידע',
      },
      aiTool: {
        label: 'כלי AI',
        caption: 'אתר ואפליקציה עם AI, שמחברים סיפורים שעוד לא פורסמו לעיתונאים',
      },
      extension: { label: 'תוספים לכרום', caption: 'תוספים לכרום שעושים את העבודה לבד' },
    },
  },
};
