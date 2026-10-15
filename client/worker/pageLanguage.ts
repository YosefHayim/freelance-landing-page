const hebrewPagePath = '/he/';

const firstAcceptedLanguage = (request: Request) => {
  const acceptLanguage = request.headers.get('Accept-Language') || '';
  const [firstEntry] = acceptLanguage.split(',');
  const [languageTag] = firstEntry.split(';');
  return languageTag.trim().toLowerCase();
};

const prefersHebrew = (request: Request) => {
  const languageTag = firstAcceptedLanguage(request);
  return languageTag === 'he' || languageTag.startsWith('he-');
};

const isHomePage = (request: Request) => {
  const { pathname } = new URL(request.url);
  return pathname === '/';
};

export const localizedPageRequest = (request: Request) => {
  if (!isHomePage(request) || !prefersHebrew(request)) return request;
  const hebrewPage = new URL(hebrewPagePath, request.url);
  return new Request(hebrewPage, request);
};

export const addLanguageVary = (headers: Headers, request: Request) => {
  if (!isHomePage(request)) return;
  headers.append('Vary', 'Accept-Language');
};
