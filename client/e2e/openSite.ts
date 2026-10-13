import { expect, type Page } from '@playwright/test';
import type { Language } from '../src/features/language/savedLanguage';

export const languages: Language[] = ['en', 'he'];

export const pixelCallLogPrefix = 'meta-pixel ';

const metaPixelStandIn = `
  const pixel = window.fbq;
  pixel.callMethod = (...pixelArguments) =>
    console.debug('${pixelCallLogPrefix}' + JSON.stringify(pixelArguments));
  for (const queuedCall of pixel.queue) pixel.callMethod(...queuedCall);
  pixel.queue = [];
`;

export const standInForOutsideScripts = async (page: Page) => {
  await page.route('https://cdn.replybase.dev/widget.js', (route) =>
    route.fulfill({ contentType: 'application/javascript', body: '' }),
  );
  await page.route('https://www.googletagmanager.com/**', (route) =>
    route.fulfill({ contentType: 'application/javascript', body: '' }),
  );
  await page.route('https://connect.facebook.net/**', (route) =>
    route.fulfill({ contentType: 'application/javascript', body: metaPixelStandIn }),
  );
};

export const openSite = async (page: Page, language: Language) => {
  await standInForOutsideScripts(page);
  await page.addInitScript((saved) => localStorage.setItem('jts-language', saved), language);
  return page.goto('/');
};

export const revealEverySection = async (page: Page) => {
  for (const revealed of await page.locator('.reveal-on-scroll').all()) {
    await revealed.scrollIntoViewIfNeeded();
  }
  await expect(page.locator('.reveal-on-scroll:not(.is-revealed)')).toHaveCount(0);
  await page.waitForFunction(() =>
    Array.from(document.querySelectorAll('.reveal-on-scroll')).every(
      (element) => getComputedStyle(element).opacity === '1',
    ),
  );
};
