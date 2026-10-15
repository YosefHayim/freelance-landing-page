import { sendCustomEvent } from './metaPixel';
import { trackedPlace, unnamedTarget } from './trackedPlace';

const hoverDuration = 1000;

export const trackHovers = () => {
  const reportedTargets = new Set<string>();
  const hover = { target: unnamedTarget, timer: 0 };

  const endHover = () => {
    clearTimeout(hover.timer);
    hover.target = unnamedTarget;
  };

  const startHover = (event: PointerEvent) => {
    if (event.pointerType !== 'mouse' || !(event.target instanceof Element)) return;
    const place = trackedPlace(event.target);
    if (place.target === hover.target) return;
    endHover();
    if (place.target === unnamedTarget || reportedTargets.has(place.target)) return;
    hover.target = place.target;
    hover.timer = window.setTimeout(() => {
      reportedTargets.add(place.target);
      sendCustomEvent('Hover', place);
    }, hoverDuration);
  };

  const endHoverOutsidePage = (event: PointerEvent) => {
    if (!event.relatedTarget) endHover();
  };

  document.addEventListener('pointerover', startHover);
  document.addEventListener('pointerout', endHoverOutsidePage);
  return () => {
    document.removeEventListener('pointerover', startHover);
    document.removeEventListener('pointerout', endHoverOutsidePage);
    endHover();
  };
};
