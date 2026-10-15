import { expect, type Page, test } from '@playwright/test';
import { outsideScriptDelay } from '../src/features/visitorTracking/loadOutsideScript';
import { openSite, standInForOutsideScripts } from './openSite';

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

const openPausedSite = async (page: Page) => {
  const responseAddresses = collectGoogleTagManagerResponses(page);
  await page.clock.install({ time: clockStart });
  await page.clock.pauseAt(visitStart);
  await openSite(page, 'en');
  return responseAddresses;
};

test('the container queues its start and loads on the first interaction', async ({ page }) => {
  const responseAddresses = await openPausedSite(page);
  const queuedEvents = await page.evaluate('window.dataLayer');
  expect(queuedEvents).toEqual([{ 'gtm.start': visitStart.getTime(), event: 'gtm.js' }]);
  expect(responseAddresses).toEqual([]);
  await page.mouse.move(80, 80);
  await expect.poll(() => responseAddresses).toEqual([containerScriptAddress]);
});

test('without an interaction the container loads after the fallback delay', async ({ page }) => {
  const responseAddresses = await openPausedSite(page);
  await page.clock.runFor(outsideScriptDelay - 100);
  expect(responseAddresses).toEqual([]);
  await page.clock.runFor(100);
  await expect.poll(() => responseAddresses).toEqual([containerScriptAddress]);
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('the no-script frame opens right after the body starts', async ({ page }) => {
    const responseAddresses = collectGoogleTagManagerResponses(page);
    await standInForOutsideScripts(page);
    await page.goto('/');
    const noScriptFrame = page.locator('body > noscript:first-child > iframe');
    await expect(noScriptFrame).toHaveAttribute('src', noScriptFrameAddress);
    expect(responseAddresses).toEqual([noScriptFrameAddress]);
  });
});
