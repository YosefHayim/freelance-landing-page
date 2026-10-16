import { describe, expect, it } from 'vitest';
import { pagePathFor } from './pageLanguage';

const pagePathForVisitor = (acceptLanguage: string, cookie = '') => {
  const headers = new Headers({ 'Accept-Language': acceptLanguage, Cookie: cookie });
  return pagePathFor(headers);
};

describe('page language', () => {
  it.each(['he', 'he-IL', 'HE-il', 'he-IL,he;q=0.9,en-US;q=0.8'])(
    'opens the Hebrew page for a browser that asks for %s first',
    (acceptLanguage) => expect(pagePathForVisitor(acceptLanguage)).toBe('/index.he'),
  );

  it.each(['en-US', 'en-US,he;q=0.9', 'ar', 'fr', 'hello', ''])(
    'opens the English page for a browser that asks for %s first',
    (acceptLanguage) => expect(pagePathForVisitor(acceptLanguage)).toBe('/'),
  );

  it.each([
    ['en-US', 'jts-language=he', '/index.he'],
    ['he-IL', 'jts-language=en', '/'],
    ['he-IL', 'theme=dark; jts-language=en', '/'],
  ])('lets a saved choice win over %s (%s)', (acceptLanguage, cookie, pagePath) =>
    expect(pagePathForVisitor(acceptLanguage, cookie)).toBe(pagePath),
  );

  it.each(['jts-language=fr', 'old-jts-language=en', 'jts-language='])(
    'ignores the unknown choice %s',
    (cookie) => expect(pagePathForVisitor('he-IL', cookie)).toBe('/index.he'),
  );
});
