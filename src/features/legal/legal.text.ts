import type { Language } from '../language/language';

type LegalText = {
  linksLabel: string;
  homeLink: string;
  updated: string;
  sitesLabel: string;
  contactHeading: string;
  contactLead: string;
  whatsappLabel: string;
  phoneLabel: string;
  emailLabel: string;
};

export const legalText: Record<Language, LegalText> = {
  en: {
    linksLabel: 'Legal',
    homeLink: '← Back to the site',
    updated: 'Last updated: October 18, 2026',
    sitesLabel: 'Sites',
    contactHeading: 'Contact us',
    contactLead: 'Questions or requests? Reach Yosef Hayim Sabag:',
    whatsappLabel: 'WhatsApp',
    phoneLabel: 'Phone',
    emailLabel: 'Email',
  },
  he: {
    linksLabel: 'מידע משפטי',
    homeLink: '→ חזרה לאתר',
    updated: 'עודכן לאחרונה: 18 באוקטובר 2026',
    sitesLabel: 'אתרים',
    contactHeading: 'יצירת קשר',
    contactLead: 'שאלות או בקשות? פנו ליוסף חיים סבג:',
    whatsappLabel: 'וואטסאפ',
    phoneLabel: 'טלפון',
    emailLabel: 'אימייל',
  },
};
