import type { Page } from '@playwright/test';
import {
  lastPaintDuration,
  pageSettleDuration,
} from '../src/features/pageLoad/runAfterPageSettles';

const noTransitionRuns = () => {
  const animations = document.getAnimations();
  return animations.every((animation) => !(animation instanceof CSSTransition));
};

export const letPageSettle = async (page: Page) => {
  await page.clock.runFor(pageSettleDuration);
  await page.waitForFunction(noTransitionRuns);
  await page.clock.runFor(lastPaintDuration);
};
