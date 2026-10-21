import type { Page } from '@playwright/test';

export const collectPixelCalls = (page: Page, logPrefix: string) => {
  const pixelCalls: unknown[][] = [];
  page.on('console', (message) => {
    const text = message.text();
    if (!text.startsWith(logPrefix)) return;
    const pixelCall = text.slice(logPrefix.length);
    pixelCalls.push(JSON.parse(pixelCall));
  });
  return pixelCalls;
};
