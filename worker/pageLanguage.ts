import { Option, Schema } from 'effect';

const LanguageSchema = Schema.Literal('en', 'he');
const decodeLanguage = Schema.decodeUnknownOption(LanguageSchema);
const savedLanguagePattern = /(?:^|;\s*)jts-language=([^;]*)/;
const linkLanguageParameter = 'lang';

export const hebrewPagePath = '/index.he';

const pagePaths: Record<typeof LanguageSchema.Type, string> = { en: '/', he: hebrewPagePath };

const browserLanguage = (acceptLanguage: string) => {
  const [firstLanguage] = acceptLanguage.split(/[,;]/);
  const locale = firstLanguage.trim().toLowerCase();
  const isHebrew = locale === 'he' || locale.startsWith('he-');
  return isHebrew ? 'he' : 'en';
};

const visitorLanguage = (request: Request) => {
  const cookies = request.headers.get('Cookie') || '';
  const savedCookie = cookies.match(savedLanguagePattern);
  const savedLanguage = decodeLanguage(savedCookie?.[1]);
  if (Option.isSome(savedLanguage)) return savedLanguage.value;
  const { searchParams } = new URL(request.url);
  const requestedLanguage = searchParams.get(linkLanguageParameter);
  const linkLanguage = decodeLanguage(requestedLanguage);
  if (Option.isSome(linkLanguage)) return linkLanguage.value;
  const acceptLanguage = request.headers.get('Accept-Language') || '';
  return browserLanguage(acceptLanguage);
};

export const pagePathFor = (request: Request) => {
  const language = visitorLanguage(request);
  return pagePaths[language];
};
