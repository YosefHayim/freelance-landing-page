import { describe, expect, it } from 'vitest';
import { scrollDepthPercent } from './scrollDepth';

describe('scroll depth', () => {
  it('measures how far the visitor is through the scrollable part of the page', () => {
    expect(scrollDepthPercent(0, 800, 4000)).toBe(0);
    expect(scrollDepthPercent(800, 800, 4000)).toBe(25);
    expect(scrollDepthPercent(1600, 800, 4000)).toBe(50);
    expect(scrollDepthPercent(3200, 800, 4000)).toBe(100);
  });

  it('rounds a bottom that lands on a part of a pixel up to the full page', () => {
    expect(scrollDepthPercent(3199.5, 800, 4000)).toBe(100);
  });

  it('stays inside 0 to 100 when the browser overscrolls', () => {
    expect(scrollDepthPercent(3300, 800, 4000)).toBe(100);
    expect(scrollDepthPercent(-40, 800, 4000)).toBeLessThan(25);
  });

  it('is 0 when the page does not scroll', () => {
    expect(scrollDepthPercent(0, 800, 800)).toBe(0);
    expect(scrollDepthPercent(0, 800, 600)).toBe(0);
  });
});
