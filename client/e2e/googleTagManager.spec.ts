import { expect, type Page, test } from '@playwright/test';
import { pageSettleDuration } from '../src/features/pageLoad/runAfterPageSettles';
import { openSite } from './openSite';

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

test('the container queues its start and loads once the page has settled', async ({ page }) => {
  const responseAddresses = collectGoogleTagManagerResponses(page);
  await page.clock.install({ time: clockStart });
  await page.clock.pauseAt(visitStart);
  await openSite(page, 'en');
  const queuedEvents = await page.evaluate('window.dataLayer');
  expect(queuedEvents).toEqual([{ 'gtm.start': visitStart.getTime(), event: 'gtm.js' }]);
  expect(responseAddresses).toEqual([]);
  await page.clock.runFor(pageSettleDuration);
  await expect.poll(() => responseAddresses).toEqual([containerScriptAddress]);
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('the no-script frame opens right after the body starts', async ({ page }) => {
    const responseAddresses = collectGoogleTagManagerResponses(page);
    await openSite(page, 'en');
    const noScriptFrame = page.locator('body > noscript:first-child > iframe');
    await expect(noScriptFrame).toHaveAttribute('src', noScriptFrameAddress);
    expect(responseAddresses).toEqual([noScriptFrameAddress]);
  });
});
