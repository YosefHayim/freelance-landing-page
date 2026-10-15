import { Option, Schema } from 'effect';

const LanguageSchema = Schema.Literal('en', 'he');
const decodeLanguage = Schema.decodeUnknownOption(LanguageSchema);
const savedLanguagePattern = /(?:^|;\s*)jts-language=([^;]*)/;

export const hebrewPagePath = '/index.he';

const pagePaths: Record<typeof LanguageSchema.Type, string> = { en: '/', he: hebrewPagePath };

const browserLanguage = (acceptLanguage: string) => {
  const [firstLanguage] = acceptLanguage.split(/[,;]/);
  const locale = firstLanguage.trim().toLowerCase();
  const isHebrew = locale === 'he' || locale.startsWith('he-');
  return isHebrew ? 'he' : 'en';
};

const visitorLanguage = (headers: Headers) => {
  const cookies = headers.get('Cookie') || '';
  const savedCookie = cookies.match(savedLanguagePattern);
  const savedLanguage = decodeLanguage(savedCookie?.[1]);
  if (Option.isSome(savedLanguage)) return savedLanguage.value;
  const acceptLanguage = headers.get('Accept-Language') || '';
  return browserLanguage(acceptLanguage);
};

export const pagePathFor = (headers: Headers) => {
  const language = visitorLanguage(headers);
  return pagePaths[language];
};
