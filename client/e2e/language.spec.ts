import { expect, test } from '@playwright/test';
import { introText } from '../src/features/intro/intro.text';
import { languageText } from '../src/features/language/language.text';
import { pageTitleText } from '../src/pageTitle.text';
import { openSite, standInForOutsideScripts, waitForAppStart } from './openSite';

const pageLanguages = [
  { locale: 'he-IL', language: 'he', direction: 'rtl' },
  { locale: 'en-US', language: 'en', direction: 'ltr' },
] as const;

test('a Hebrew browser opens in Hebrew, and the flag switch is remembered', async ({ browser }) => {
  const context = await browser.newContext({ locale: 'he-IL', reducedMotion: 'reduce' });
  const page = await context.newPage();
  await standInForOutsideScripts(page);
  await page.goto('/');
  await waitForAppStart(page, 'he');
  const html = page.locator('html');
  await expect(html).toHaveAttribute('lang', 'he');
  await expect(html).toHaveAttribute('dir', 'rtl');
  await expect(page).toHaveTitle(pageTitleText.he.title);
  await expect(page.getByRole('heading', { level: 1 })).toContainText(introText.he.headline);

  await page.getByRole('button', { name: languageText.he.switchLabel }).click();
  await expect(html).toHaveAttribute('lang', 'en');
  await expect(html).toHaveAttribute('dir', 'ltr');
  await expect(page).toHaveTitle(pageTitleText.en.title);
  await expect(page.getByRole('heading', { level: 1 })).toContainText(introText.en.headline);

  await page.reload();
  await expect(html).toHaveAttribute('lang', 'en');
  await context.close();
});

test('an English browser opens in English', async ({ browser }) => {
  const context = await browser.newContext({ locale: 'en-US' });
  const page = await context.newPage();
  await standInForOutsideScripts(page);
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
  await expect(page).toHaveTitle(pageTitleText.en.title);
  await context.close();
});

for (const { locale, language, direction } of pageLanguages) {
  test.describe(`a ${locale} browser without JavaScript`, () => {
    test.use({ locale, javaScriptEnabled: false });

    test('gets the first screen in its language', async ({ page }) => {
      await standInForOutsideScripts(page);
      await page.goto('/');
      const html = page.locator('html');
      await expect(html).toHaveAttribute('lang', language);
      await expect(html).toHaveAttribute('dir', direction);
      await expect(page).toHaveTitle(pageTitleText[language].title);
      const headline = page.getByRole('heading', { level: 1 });
      await expect(headline).toContainText(introText[language].headline);
      await expect(page.locator('.intro-call-button')).toBeVisible();
    });
  });

  test.describe(`a ${locale} browser`, () => {
    test.use({ locale });

    test('takes over the rendered page without errors', async ({ page }) => {
      const pageErrors: string[] = [];
      page.on('pageerror', (error) => pageErrors.push(error.message));
      page.on('console', (message) => {
        if (message.type() === 'error') pageErrors.push(message.text());
      });
      await openSite(page, language);
      await page.getByRole('button', { name: languageText[language].switchLabel }).click();
      await expect(page.locator('html')).not.toHaveAttribute('lang', language);
      expect(pageErrors).toEqual([]);
    });
  });
}
