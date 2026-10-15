import { expect, test } from '@playwright/test';
import { introText } from '../src/features/intro/intro.text';
import { languageText } from '../src/features/language/language.text';
import { pageTitleText } from '../src/features/language/pageTitle.text';
import { waitForAppStart } from './letAppStart';
import { openSite, revealEverySection, standInForOutsideScripts } from './openSite';

test('a Hebrew browser opens in Hebrew, and the flag switch is remembered', async ({ browser }) => {
  const context = await browser.newContext({ locale: 'he-IL', reducedMotion: 'reduce' });
  const page = await context.newPage();
  await standInForOutsideScripts(page);
  await page.goto('/');
  await waitForAppStart(page);
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

test('switching the language keeps the revealed text visible', async ({ page }) => {
  await openSite(page, 'en');
  await revealEverySection(page);
  await page.getByRole('button', { name: languageText.en.switchLabel }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'he');
  await expect(page.locator('.reveal-on-scroll:not(.is-revealed)')).toHaveCount(0);
});
