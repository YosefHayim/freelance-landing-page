import { describe, expect, it } from 'vitest';
import { addLanguageVary, localizedPageRequest } from './pageLanguage';

const homeRequest = (acceptLanguage: string) =>
  new Request('https://joseph-tech-solutions.dev/?ref=ad', {
    headers: { 'Accept-Language': acceptLanguage },
  });

describe('page language', () => {
  it.each(['he-IL,he;q=0.9,en;q=0.8', 'he', 'HE-il'])('serves the Hebrew page to %s', (header) => {
    const request = localizedPageRequest(homeRequest(header));
    expect(request.url).toBe('https://joseph-tech-solutions.dev/he/');
  });

  it.each(['en-US,he;q=0.9', 'hebrew', '', 'fr'])('serves the English page to "%s"', (header) => {
    const request = localizedPageRequest(homeRequest(header));
    expect(request.url).toBe('https://joseph-tech-solutions.dev/?ref=ad');
  });

  it('leaves other paths alone', () => {
    const original = new Request('https://joseph-tech-solutions.dev/favicon.svg', {
      headers: { 'Accept-Language': 'he-IL' },
    });
    expect(localizedPageRequest(original)).toBe(original);
  });

  it('marks only the home page as varying by language', () => {
    const homeHeaders = new Headers({ Vary: 'Accept-Encoding' });
    addLanguageVary(homeHeaders, homeRequest('he'));
    expect(homeHeaders.get('Vary')).toBe('Accept-Encoding, Accept-Language');

    const fileHeaders = new Headers();
    const fileRequest = new Request('https://joseph-tech-solutions.dev/robots.txt');
    addLanguageVary(fileHeaders, fileRequest);
    expect(fileHeaders.get('Vary')).toBeNull();
  });
});
