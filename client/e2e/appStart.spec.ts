import { expect, test } from '@playwright/test';
import { introText } from '../src/features/intro/intro.text';
import { languages, openSite, visitSite } from './openSite';

const appCodeTimings = () => {
  const [firstPaint] = performance.getEntriesByName('first-contentful-paint');
  const resources = performance.getEntriesByType('resource');
  const appCodeRequests = resources.filter((entry) => entry.name.includes('/assets/startApp-'));
  const appCodeStarts = appCodeRequests.map((entry) => entry.startTime);
  return { firstPaint: firstPaint.startTime, appCodeStarts };
};

test('the app code is fetched only after the first paint', async ({ page }) => {
  await openSite(page, 'en');
  const { firstPaint, appCodeStarts } = await page.evaluate(appCodeTimings);
  expect(appCodeStarts).toHaveLength(1);
  expect(appCodeStarts[0]).toBeGreaterThan(firstPaint);
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  for (const language of languages) {
    test(`the ${language} page arrives complete`, async ({ page }) => {
      await visitSite(page, language);
      const headline = page.getByRole('heading', { level: 1 });
      await expect(headline).toContainText(introText[language].headline);
      await expect(page.locator('html')).toHaveAttribute('lang', language);
      await expect(page.locator('#contact')).toBeAttached();
    });
  }
});
