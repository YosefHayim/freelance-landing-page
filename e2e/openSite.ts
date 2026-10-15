import { expect, type Page, test } from '@playwright/test';
import { type Language, languageCookieName } from '../src/features/language/savedLanguage';
import { waitForAppStart } from './letAppStart';

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

export const chooseLanguage = async (page: Page, language: Language) => {
  const siteAddress = test.info().project.use.baseURL;
  if (!siteAddress) throw new Error('Missing baseURL');
  const languageCookie = { name: languageCookieName, value: language, url: siteAddress };
  await page.context().addCookies([languageCookie]);
};

export const visitSite = async (page: Page, language: Language) => {
  await standInForOutsideScripts(page);
  await chooseLanguage(page, language);
  return page.goto('/');
};

export const openSite = async (page: Page, language: Language) => {
  const response = await visitSite(page, language);
  await waitForAppStart(page);
  return response;
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
