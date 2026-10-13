import type { Page } from '@playwright/test';
import {
  lastPaintDuration,
  pageSettleDuration,
} from '../src/features/pageLoad/runAfterPageSettles';

const noTransitionRuns = () => {
  const animations = document.getAnimations();
  const runningTransitions = animations.filter(
    (animation) => animation instanceof CSSTransition && animation.playState === 'running',
  );
  return runningTransitions.length === 0;
};

export const letPageSettle = async (page: Page) => {
  await page.clock.runFor(pageSettleDuration);
  await page.waitForFunction(noTransitionRuns);
  await page.clock.runFor(lastPaintDuration);
};
