import type { Language } from '../language/savedLanguage';

type ContactText = {
  headingLines: [string, string];
  mutedLine: string;
  callLabel: string;
  copyHandleLabel: string;
  copyHandleTooltip: string;
  copiedNotice: string;
};

export const contactText: Record<Language, ContactText> = {
  en: {
    headingLines: ["Send what's stuck", "In 15 minutes you'll know the next step"],
    mutedLine: 'Free, on WhatsApp, no forms',
    callLabel: 'Start on WhatsApp →',
    copyHandleLabel: 'Copy X handle @yosefhayim',
    copyHandleTooltip: 'Copy @yosefhayim',
    copiedNotice: 'Copied @yosefhayim',
  },
  he: {
    headingLines: ['שלחו את מה שתקוע', 'תוך רבע שעה תדעו מה הצעד הבא'],
    mutedLine: 'בחינם, בוואטסאפ, בלי טפסים',
    callLabel: 'מתחילים בוואטסאפ ←',
    copyHandleLabel: 'העתקת שם המשתמש ב-X: @yosefhayim',
    copyHandleTooltip: 'העתקת @yosefhayim',
    copiedNotice: 'הועתק: @yosefhayim',
  },
};
