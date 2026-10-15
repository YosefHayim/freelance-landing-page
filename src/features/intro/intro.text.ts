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
    greeting: "Hi, I'm Joseph",
    photoAlt: 'Joseph Sabag',
    headline: 'Software should work for you',
    mutedLine: 'Take back the reins',
    summary:
      "Right now it's the other way round: the product has been \"almost ready\" for months, the team types what a script does in a second, and the AI shines in the demo and falls over at 3am. What's stuck gets finished, what's manual gets automated, and what breaks gets rebuilt to hold.",
    callLabel: "Let's talk",
    callHoverLabel: '15 minutes, no sales pitch',
    showcaseLabel: 'What I build',
    workTypes: {
      website: {
        label: 'Websites',
        caption: "A nonprofit's system for donors, donations and reports",
      },
      app: { label: 'Apps', caption: 'Apps with AI that runs right on the phone' },
      automation: { label: 'Automations', caption: 'Automations that end hours of copy-paste' },
      aiTool: { label: 'AI tools', caption: 'Open-source AI tools, like AI that talks to eBay' },
      extension: {
        label: 'Extensions',
        caption: 'Chrome extensions that do the work on their own',
      },
    },
  },
  he: {
    sectionLabel: 'פתיחה',
    greeting: 'היי, אני יוסף',
    photoAlt: 'יוסף סבג',
    headline: 'התוכנה אמורה לעבוד בשבילכם',
    mutedLine: 'הגיע הזמן לקחת את המושכות לידיים',
    summary:
      'בינתיים זה הפוך: המוצר "כמעט מוכן" כבר חודשים, הצוות מקליד ביד מה שסקריפט גומר בשנייה, וה-AI מבריק בדמו ונופל בשלוש בלילה. מה שתקוע נסגר, מה שידני עובר לאוטומציה, ומה שנשבר נבנה כך שיחזיק.',
    callLabel: 'בואו נדבר',
    callHoverLabel: 'רבע שעה, בלי חפירות',
    showcaseLabel: 'מה אני בונה',
    workTypes: {
      website: { label: 'אתרים ומערכות', caption: 'מערכת ניהול לעמותה: תורמים, תרומות ודוחות' },
      app: { label: 'אפליקציות', caption: 'אפליקציות עם AI שרץ ישר על הטלפון' },
      automation: { label: 'אוטומציות', caption: 'אוטומציות שחוסכות שעות של העתק-הדבק' },
      aiTool: { label: 'כלי AI', caption: 'כלי AI בקוד פתוח, למשל AI שמדבר עם eBay' },
      extension: { label: 'תוספים לכרום', caption: 'תוספים לכרום שעושים את העבודה לבד' },
    },
  },
};
