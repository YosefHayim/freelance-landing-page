import { expect, type Page, test } from '@playwright/test';
import {
  lastPaintDuration,
  pageSettleDuration,
} from '../src/features/pageLoad/runAfterPageSettles';
import { openSite } from './openSite';

const clockStart = new Date('2026-01-01T09:00:00');
const visitStart = new Date('2026-01-01T10:00:00');

const startSlowTransition = (page: Page) =>
  page.evaluate(() => {
    const slowBox = document.createElement('div');
    slowBox.style.transition = 'opacity 600s';
    document.body.append(slowBox);
    slowBox.getBoundingClientRect();
    slowBox.style.opacity = '0';
  });

const finishEveryTransition = (page: Page) =>
  page.evaluate(() => {
    const animations = document.getAnimations();
    const transitions = animations.filter((animation) => animation instanceof CSSTransition);
    for (const transition of transitions) transition.finish();
  });

test('outside scripts wait for a running transition and its last paint', async ({ page }) => {
  await page.clock.install({ time: clockStart });
  await page.clock.pauseAt(visitStart);
  await openSite(page, 'en');
  const tagManagerScript = page.locator('script[src^="https://www.googletagmanager.com/gtm.js"]');
  await startSlowTransition(page);
  await page.clock.runFor(pageSettleDuration);
  await page.clock.runFor(lastPaintDuration);
  await expect(tagManagerScript).toHaveCount(0);

  await finishEveryTransition(page);
  await expect(tagManagerScript).toHaveCount(0);
  await page.clock.runFor(lastPaintDuration);
  await expect(tagManagerScript).toHaveCount(1);
});
