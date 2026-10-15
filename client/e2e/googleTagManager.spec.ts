import { expect, type Page, test } from '@playwright/test';
import { letAppStart } from './letAppStart';
import { letPageSettle } from './letPageSettle';
import { chooseLanguage, standInForOutsideScripts, visitSite } from './openSite';
import { removeUserActivation } from './removeUserActivation';

const googleTagManagerHost = 'https://www.googletagmanager.com/';
const containerScriptAddress = `${googleTagManagerHost}gtm.js?id=GTM-5KKTTCRT`;
const noScriptFrameAddress = `${googleTagManagerHost}ns.html?id=GTM-5KKTTCRT`;

const clockStart = new Date('2026-01-01T09:00:00');
const visitStart = new Date('2026-01-01T10:00:00');

const collectGoogleTagManagerResponses = (page: Page) => {
  const responseAddresses: string[] = [];
  page.on('response', (response) => {
    const address = response.url();
    if (address.startsWith(googleTagManagerHost)) responseAddresses.push(address);
  });
  return responseAddresses;
};

test('the container queues its start and loads on the first interaction after the page settles', async ({
  page,
}) => {
  const responseAddresses = collectGoogleTagManagerResponses(page);
  await page.clock.install({ time: clockStart });
  await page.clock.pauseAt(visitStart);
  await visitSite(page, 'en');
  const queuedEvents = await page.evaluate('window.dataLayer');
  expect(queuedEvents).toEqual([{ 'gtm.start': visitStart.getTime(), event: 'gtm.js' }]);
  await letAppStart(page);
  await letPageSettle(page);
  await page.clock.runFor(60000);
  expect(responseAddresses).toEqual([]);

  await page.keyboard.press('Shift');
  await expect.poll(() => responseAddresses).toEqual([containerScriptAddress]);
});

test('a scroll made before the page code runs still loads the container', async ({ page }) => {
  const responseAddresses = collectGoogleTagManagerResponses(page);
  await standInForOutsideScripts(page);
  await chooseLanguage(page, 'en');
  await page.route('**/assets/index-*.js', async (route) => {
    await page.waitForFunction(() => window.scrollY > 0);
    await route.continue();
  });
  await page.goto('/', { waitUntil: 'commit' });
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.locator('#contact').scrollIntoViewIfNeeded();
  await expect.poll(() => responseAddresses).toEqual([containerScriptAddress]);
});

test('the container still loads where the browser cannot report user activation', async ({
  page,
}) => {
  const responseAddresses = collectGoogleTagManagerResponses(page);
  await page.addInitScript(removeUserActivation);
  await page.clock.install();
  await visitSite(page, 'en');
  await letAppStart(page);
  await letPageSettle(page);
  await page.keyboard.press('Shift');
  await expect.poll(() => responseAddresses).toEqual([containerScriptAddress]);
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('the no-script frame opens right after the body starts', async ({ page }) => {
    const responseAddresses = collectGoogleTagManagerResponses(page);
    await visitSite(page, 'en');
    const noScriptFrame = page.locator('body > noscript:first-child > iframe');
    await expect(noScriptFrame).toHaveAttribute('src', noScriptFrameAddress);
    expect(responseAddresses).toEqual([noScriptFrameAddress]);
  });
});
