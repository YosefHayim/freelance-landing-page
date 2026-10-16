import { expect, type Page } from '@playwright/test';

const frameDuration = 16;

const appHasStarted = () => {
  const lastSection = document.querySelector('#root > :last-child');
  if (!lastSection) return false;
  const sectionKeys = Object.keys(lastSection);
  return sectionKeys.some((key) => key.startsWith('__reactFiber'));
};

export const waitForAppStart = async (page: Page) => {
  await page.waitForFunction(appHasStarted);
};

export const letAppStart = async (page: Page) => {
  const hasStartedAfterFrame = async () => {
    await page.clock.runFor(frameDuration);
    return page.evaluate(appHasStarted);
  };
  await expect.poll(hasStartedAfterFrame).toBe(true);
};
