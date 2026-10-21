import { expect, test } from '@playwright/test';
import { collectPixelCalls } from './collectPixelCalls';
import { letAppStart } from './letAppStart';
import { letPageSettle } from './letPageSettle';
import { metaPixelLogPrefix, visitSite } from './openSite';

const clockStart = new Date('2026-01-01T09:00:00');
const visitStart = new Date('2026-01-01T10:00:00');

// Trace snapshots count as a user gesture, which a real first visit never has.
test.use({ trace: 'off' });

test('the Meta Pixel sends the page view once the page settles, with no interaction', async ({
  page,
}) => {
  const pixelCalls = collectPixelCalls(page, metaPixelLogPrefix);
  await page.clock.install({ time: clockStart });
  await page.clock.pauseAt(visitStart);
  await visitSite(page, 'en');
  await page.waitForLoadState('networkidle');
  await letAppStart(page);
  await letPageSettle(page);
  await expect.poll(() => pixelCalls).toContainEqual(['track', 'PageView']);
});
