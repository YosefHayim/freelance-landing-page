import { describe, expect, it } from 'vitest';
import { pagePathFor } from './pageLanguage';

const siteAddress = 'https://joseph-tech-solutions.dev/';

const pagePathForVisitor = (acceptLanguage: string, cookie = '', query = '') => {
  const headers = new Headers({ 'Accept-Language': acceptLanguage, Cookie: cookie });
  const request = new Request(`${siteAddress}${query}`, { headers });
  return pagePathFor(request);
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

  it.each([
    ['en-US', '?lang=he', '/index.he'],
    ['he-IL', '?lang=en', '/'],
    ['en-US', '?utm_source=facebook&lang=he&fbclid=abc', '/index.he'],
  ])('lets a link win over %s (%s)', (acceptLanguage, query, pagePath) =>
    expect(pagePathForVisitor(acceptLanguage, '', query)).toBe(pagePath),
  );

  it.each(['?lang=fr', '?lang=', '?lang=HE', '?language=en'])(
    'ignores the unknown link language %s',
    (query) => expect(pagePathForVisitor('he-IL', '', query)).toBe('/index.he'),
  );

  it('keeps a saved choice over the link', () =>
    expect(pagePathForVisitor('he-IL', 'jts-language=en', '?lang=he')).toBe('/'));
});
