import { describe, expect, it } from 'vitest';
import site from './main';

const siteServing = (fetchFile: (input: RequestInfo | URL) => Promise<Response>): Env => ({
  ASSETS: {
    fetch: fetchFile,
    connect: () => {
      throw new Error('The site never opens sockets');
    },
  },
});

const revalidatingFile = () =>
  Promise.resolve(
    new Response('file', { headers: { 'Cache-Control': 'public, max-age=0, must-revalidate' } }),
  );

const revalidatingPage = () =>
  Promise.resolve(
    new Response('<!doctype html>', {
      headers: {
        'Cache-Control': 'public, max-age=0, must-revalidate',
        'Content-Type': 'text/html',
      },
    }),
  );

const fileBodies: Record<string, string> = {
  '/': 'English page',
  '/index.he': 'Hebrew page',
  '/404': 'Not found page',
};

const fileAtPath = (input: RequestInfo | URL) => {
  const fileRequest = new Request(input);
  const { pathname } = new URL(fileRequest.url);
  const file = new Response(fileBodies[pathname], { headers: { 'Content-Type': 'text/html' } });
  return Promise.resolve(file);
};

describe('site worker', () => {
  it('sends former domains to the canonical site', async () => {
    const env = siteServing(revalidatingFile);
    const request = new Request('https://yosefhayimsabag.com/page?ref=old');
    const response = await site.fetch(request, env);
    expect(response.status).toBe(308);
    expect(response.headers.get('Location')).toBe('https://joseph-tech-solutions.dev/page?ref=old');
  });
  it('serves hashed files with a long cache and security headers', async () => {
    const env = siteServing(revalidatingFile);
    const request = new Request('https://joseph-tech-solutions.dev/assets/main-Bx81kQ2a.js');
    const response = await site.fetch(request, env);
    expect(response.headers.get('Cache-Control')).toBe('public, max-age=31536000, immutable');
    expect(response.headers.get('X-Frame-Options')).toBe('DENY');
  });
  it('keeps the page itself revalidating and compresses it', async () => {
    const env = siteServing(revalidatingPage);
    const request = new Request('https://joseph-tech-solutions.dev/', {
      headers: { 'Accept-Encoding': 'gzip, br' },
    });
    const response = await site.fetch(request, env);
    expect(response.headers.get('Cache-Control')).toBe(
      'public, max-age=0, must-revalidate, no-transform',
    );
    expect(response.headers.get('Content-Encoding')).toBe('br');
  });
  it('serves the page in the visitor language and varies on what chose it', async () => {
    const env = siteServing(fileAtPath);
    const request = new Request('https://joseph-tech-solutions.dev/?fbclid=ad', {
      headers: { 'Accept-Language': 'he-IL,he;q=0.9' },
    });
    const response = await site.fetch(request, env);
    const page = await response.text();
    expect(page).toBe('Hebrew page');
    expect(response.headers.get('Vary')).toBe('Accept-Encoding, Accept-Language, Cookie');
  });
  it.each(['/index.he', '/index.he.html'])('hides %s behind the 404 page', async (pathname) => {
    const env = siteServing(fileAtPath);
    const request = new Request(`https://joseph-tech-solutions.dev${pathname}`);
    const response = await site.fetch(request, env);
    expect(response.status).toBe(404);
    const page = await response.text();
    expect(page).toBe('Not found page');
  });
  it('answers 503 when the file store fails', async () => {
    const env = siteServing(() => Promise.reject(new Error('asset store down')));
    const request = new Request('https://joseph-tech-solutions.dev/');
    const response = await site.fetch(request, env);
    expect(response.status).toBe(503);
  });
});
