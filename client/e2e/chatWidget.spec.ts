import { expect, test } from '@playwright/test';
import { openSite } from './openSite';

test('the chat widget loads on the first interaction, never on a timer', async ({ page }) => {
  await page.clock.install();
  await openSite(page, 'en');
  const chatScript = page.locator('script[src="https://cdn.replybase.dev/widget.js"]');
  await page.clock.runFor(60000);
  await expect(chatScript).toHaveCount(0);

  await page.mouse.move(80, 80);
  await expect(chatScript).toHaveCount(1);
});
