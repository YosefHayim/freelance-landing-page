import { expect, test } from '@playwright/test';
import { introText } from '../src/features/intro/intro.text';
import { languageCookieName } from '../src/features/language/language';
import { openSite } from './openSite';

const retiredPaths = [
  '/v1/',
  '/v2/',
  '/v3/',
  '/v4/',
  '/blog',
  '/jts',
  '/sorqa',
  '/prompt-queue',
  '/privacy',
  '/api/chat',
  '/missing.png',
  '/assets/missing.js',
  '/index.he',
  '/index.he.html',
];

const hebrewRequests: Record<string, string>[] = [
  { 'Accept-Language': 'he-IL,he;q=0.9,en;q=0.8' },
  { 'Accept-Language': 'en-US', Cookie: `${languageCookieName}=he` },
];

test('the page revalidates on every visit and repeat visits get a 304', async ({ request }) => {
  const response = await request.get('/');
  expect(response.status()).toBe(200);
  const headers = response.headers();
  expect(headers['cache-control']).toBe('public, max-age=0, must-revalidate, no-transform');
  expect(headers['content-encoding']).toMatch(/^(br|gzip)$/);
  expect(headers.vary).toBe('Accept-Encoding, Accept-Language, Cookie');
  expect(headers['x-content-type-options']).toBe('nosniff');
  expect(headers['x-frame-options']).toBe('DENY');
  expect(headers['content-security-policy']).toContain("frame-ancestors 'none'");
  expect(headers.etag).toBeTruthy();
  const repeatVisit = await request.get('/', { headers: { 'If-None-Match': headers.etag } });
  expect(repeatVisit.status()).toBe(304);
});

test('hashed files are cached for a year and left for Cloudflare to compress', async ({
  page,
  request,
}) => {
  await openSite(page, 'en');
  const assetUrls = await page.evaluate(() =>
    performance
      .getEntriesByType('resource')
      .map((entry) => entry.name)
      .filter((name) => new URL(name).pathname.startsWith('/assets/')),
  );
  expect(assetUrls.length).toBeGreaterThan(2);
  for (const assetUrl of assetUrls) {
    const asset = await request.get(assetUrl);
    expect(asset.status(), assetUrl).toBe(200);
    expect(asset.headers()['cache-control'], assetUrl).toBe('public, max-age=31536000, immutable');
  }
});

test('retired and unknown routes are real 404s that are never cached for long', async ({
  request,
}) => {
  for (const path of retiredPaths) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(404);
    expect(response.headers()['cache-control'], path).not.toContain('immutable');
    const body = await response.text();
    expect(body, path).not.toContain('<div id="root">');
  }
});

test('the page comes in the saved language, else in the browser language', async ({ request }) => {
  for (const headers of hebrewRequests) {
    const response = await request.get('/', { headers });
    const page = await response.text();
    const requestLabel = JSON.stringify(headers);
    expect(page, requestLabel).toContain('<html lang="he" dir="rtl">');
    expect(page, requestLabel).toContain(introText.he.headline);
  }
  const savedEnglish = { 'Accept-Language': 'he-IL', Cookie: `${languageCookieName}=en` };
  const englishResponse = await request.get('/', { headers: savedEnglish });
  const englishPage = await englishResponse.text();
  expect(englishPage).toContain('<html lang="en" dir="ltr">');
  expect(englishPage).toContain(introText.en.headline);
});

test('an ad link picks the page language over the browser language', async ({ request }) => {
  const hebrewResponse = await request.get('/?lang=he&utm_source=facebook', {
    headers: { 'Accept-Language': 'en-US' },
  });
  const hebrewPage = await hebrewResponse.text();
  expect(hebrewPage).toContain('<html lang="he" dir="rtl">');
  expect(hebrewPage).toContain(introText.he.headline);
  const englishResponse = await request.get('/?lang=en', {
    headers: { 'Accept-Language': 'he-IL' },
  });
  const englishPage = await englishResponse.text();
  expect(englishPage).toContain('<html lang="en" dir="ltr">');
  expect(englishPage).toContain(introText.en.headline);
});
