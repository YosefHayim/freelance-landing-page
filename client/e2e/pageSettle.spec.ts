import { expect, type Page, test } from '@playwright/test';
import {
  lastPaintDuration,
  pageSettleDuration,
} from '../src/features/pageLoad/runAfterPageSettles';
import { letAppStart } from './letAppStart';
import { visitSite } from './openSite';

const clockStart = new Date('2026-01-01T09:00:00');
const visitStart = new Date('2026-01-01T10:00:00');
const laterBoxId = 'later-box';

const startSlowTransition = (page: Page, boxId: string) =>
  page.evaluate((id) => {
    const slowBox = document.createElement('div');
    slowBox.id = id;
    slowBox.style.transition = 'opacity 600s';
    document.body.append(slowBox);
    slowBox.getBoundingClientRect();
    slowBox.style.opacity = '0';
  }, boxId);

const finishTransitionsOutside = (page: Page, boxId: string) =>
  page.evaluate((id) => {
    const keptBox = document.getElementById(id);
    const keptTransitions = keptBox ? keptBox.getAnimations() : [];
    const animations = document.getAnimations();
    const transitions = animations.filter((animation) => animation instanceof CSSTransition);
    const endingTransitions = transitions.filter(
      (transition) => !keptTransitions.includes(transition),
    );
    for (const transition of endingTransitions) transition.finish();
  }, boxId);

test('outside scripts wait for every running transition and its last paint', async ({ page }) => {
  await page.clock.install({ time: clockStart });
  await page.clock.pauseAt(visitStart);
  await visitSite(page, 'en');
  await letAppStart(page);
  await page.keyboard.press('Shift');
  const tagManagerScript = page.locator('script[src^="https://www.googletagmanager.com/gtm.js"]');
  await startSlowTransition(page, 'first-box');
  await page.clock.runFor(pageSettleDuration);
  await page.clock.runFor(lastPaintDuration);
  await expect(tagManagerScript).toHaveCount(0);

  await startSlowTransition(page, laterBoxId);
  await finishTransitionsOutside(page, laterBoxId);
  await page.clock.runFor(lastPaintDuration);
  await expect(tagManagerScript).toHaveCount(0);

  await page.locator(`#${laterBoxId}`).evaluate((laterBox) => laterBox.remove());
  await expect(tagManagerScript).toHaveCount(0);
  await page.clock.runFor(lastPaintDuration);
  await expect(tagManagerScript).toHaveCount(1);
});
