import type { Language } from '../language/language';

type ContactText = {
  heading: string;
  lead: string;
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
    heading: "Tell me about your idea, or what you've already built",
    lead: "In 10 minutes we'll work out together the right way forward, professionally. Free.",
    callLabel: 'Book a call on WhatsApp →',
    phoneLead: 'Or call:',
    phoneLabel: '+972 52-584-2972',
    startFormLead: 'Rather write?',
    startFormLabel: 'To the short questionnaire →',
    copyHandleLabel: 'Copy X handle @yosefhayim',
    copyHandleTooltip: 'Copy @yosefhayim',
    copiedNotice: 'Copied @yosefhayim',
  },
  he: {
    heading: 'ספרו לי על הרעיון, או על מה שכבר בניתם',
    lead: 'ב-10 דקות נבין ביחד איך נכון להמשיך, בצורה מקצועית. בחינם.',
    callLabel: 'לקביעת שיחה בוואטסאפ ←',
    phoneLead: 'או תתקשרו:',
    phoneLabel: '052-584-2972',
    startFormLead: 'מעדיפים לכתוב?',
    startFormLabel: 'לשאלון הקצר ←',
    copyHandleLabel: 'העתקת שם המשתמש ב-X: @yosefhayim',
    copyHandleTooltip: 'העתקת @yosefhayim',
    copiedNotice: 'הועתק: @yosefhayim',
  },
};
