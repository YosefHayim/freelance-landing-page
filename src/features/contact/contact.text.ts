import type { Language } from '../language/language';

type ContactText = {
  heading: string;
  callLabel: string;
  phoneLead: string;
  phoneLabel: string;
  startFormLead: string;
  startFormLabel: string;
  copyHandleLabel: string;
  copyHandleTooltip: string;
  copiedNotice: string;
};

export const contactText: Record<Language, ContactText> = {
  en: {
    heading: 'Start before someone else does',
    callLabel: 'Message on WhatsApp',
    phoneLead: 'Or call:',
    phoneLabel: '+972 54-618-7549',
    startFormLead: 'Want a price estimate before we talk?',
    startFormLabel: 'Tell me about the idea here →',
    copyHandleLabel: 'Copy X handle @yosefhayim',
    copyHandleTooltip: 'Copy @yosefhayim',
    copiedNotice: 'Copied @yosefhayim',
  },
  he: {
    heading: 'תתחילו לפני מישהו אחר',
    callLabel: 'שלחו הודעה בוואטסאפ',
    phoneLead: 'או תתקשרו:',
    phoneLabel: '054-618-7549',
    startFormLead: 'רוצים הערכת מחיר עוד לפני שמדברים?',
    startFormLabel: 'ספרו לי על הרעיון כאן ←',
    copyHandleLabel: 'העתקת שם המשתמש ב-X: @yosefhayim',
    copyHandleTooltip: 'העתקת @yosefhayim',
    copiedNotice: 'הועתק: @yosefhayim',
  },
};
