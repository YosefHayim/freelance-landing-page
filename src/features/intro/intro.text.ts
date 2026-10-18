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
    headline: 'The worst is seeing your idea in the app store',
    mutedLine: "With someone else's name on it",
    summary:
      "And it happens. Not because they're smarter. They just started. What stops most founders isn't the idea. It's the tech side.",
    callLabel: 'Message on WhatsApp',
    callHoverLabel: 'Tell me your idea',
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
    headline: 'הכי מבאס זה לראות את הרעיון שלכם בחנות',
    mutedLine: 'עם השם של מישהו אחר',
    summary:
      'וזה קורה. לא כי הם חכמים יותר. הם פשוט התחילו. מה שעוצר את רוב היזמים זה לא הרעיון. זה הצד הטכני.',
    callLabel: 'שלחו הודעה בוואטסאפ',
    callHoverLabel: 'ספרו לי על הרעיון',
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
