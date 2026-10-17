import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { languageText } from '../src/features/language/language.text';
import { legalDocuments, legalPageNames, legalPagePath } from '../src/features/legal/legalPages';
import { languages, openSite } from './openSite';

for (const language of languages) {
  for (const legalPageName of legalPageNames) {
    test(`${language} ${legalPageName} page passes axe and fits a phone`, async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 800 });
      await page.emulateMedia({ reducedMotion: 'reduce' });
      const pageErrors: string[] = [];
      page.on('pageerror', (error) => pageErrors.push(error.message));
      page.on('console', (message) => {
        if (message.type() === 'error') pageErrors.push(message.text());
      });

      const legalDocument = legalDocuments[legalPageName][language];
      const response = await openSite(page, language, legalPagePath(legalPageName));
      expect(response?.status()).toBe(200);
      await expect(page).toHaveTitle(legalDocument.title);
      const heading = page.getByRole('heading', { level: 1 });
      await expect(heading).toHaveText(legalDocument.heading);

      const axeResults = await new AxeBuilder({ page }).analyze();
      expect(axeResults.violations).toEqual([]);
      const pageOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      expect(pageOverflow).toBe(0);
      expect(pageErrors).toEqual([]);
    });
  }
}

test('the home footer opens the privacy policy in the page language', async ({ page }) => {
  await openSite(page, 'he');
  const privacyHeading = legalDocuments.privacy.he.heading;
  await page.locator('.site-footer').getByRole('link', { name: privacyHeading }).click();
  await expect(page).toHaveURL(/\/privacy\?lang=he$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(privacyHeading);
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
});

test('the flag switches a legal page to the other language', async ({ page }) => {
  await openSite(page, 'en', legalPagePath('terms'));
  await page.getByRole('button', { name: languageText.en.switchLabel }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'he');
  await expect(page).toHaveTitle(legalDocuments.terms.he.title);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(legalDocuments.terms.he.heading);
});
