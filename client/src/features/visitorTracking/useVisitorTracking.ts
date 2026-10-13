import { type RefObject, useEffect } from 'react';
import { trackClicks } from './trackClicks';
import { trackHolds } from './trackHolds';
import { trackHovers } from './trackHovers';
import { trackScrollDepth } from './trackScrollDepth';
import { trackSectionViews } from './trackSectionViews';
import { trackTextSelection } from './trackTextSelection';
import { trackTimeOnPage } from './trackTimeOnPage';

export const useVisitorTracking = (stackRef: RefObject<HTMLElement | null>) => {
  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;
    const sections = Array.from(stack.querySelectorAll<HTMLElement>(':scope > section'));
    const stopTrackers = [
      trackClicks(),
      trackHovers(),
      trackHolds(),
      trackSectionViews(sections),
      trackScrollDepth(),
      trackTimeOnPage(),
      trackTextSelection(),
    ];
    return () => {
      for (const stopTracker of stopTrackers) stopTracker();
    };
  }, [stackRef]);
};
