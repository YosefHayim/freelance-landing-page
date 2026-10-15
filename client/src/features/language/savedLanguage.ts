export type Language = 'en' | 'he';

export const languageCookieName = 'jts-language';
const cookieLifetimeSeconds = 31536000;

export const languageDirection: Record<Language, 'ltr' | 'rtl'> = { en: 'ltr', he: 'rtl' };

export const pageLanguage = (): Language => (document.documentElement.lang === 'he' ? 'he' : 'en');

export const saveLanguage = (language: Language) => {
  // biome-ignore lint/suspicious/noDocumentCookie: the Cookie Store API needs Safari 18.4 or later
  document.cookie = `${languageCookieName}=${language}; Path=/; Max-Age=${cookieLifetimeSeconds}; SameSite=Lax`;
};
