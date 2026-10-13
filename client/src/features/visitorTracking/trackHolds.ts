import { sendCustomEvent } from './metaPixel';
import { trackedPlace } from './trackedPlace';

const holdDuration = 400;
const mainButton = 0;

export const trackHolds = () => {
  const reportedHolds = new Set<string>();
  const hold = { timer: 0 };

  const endHold = () => clearTimeout(hold.timer);

  const startHold = (event: PointerEvent) => {
    endHold();
    if (event.button !== mainButton || !(event.target instanceof Element)) return;
    const place = trackedPlace(event.target);
    const heldPlace = `${place.section} ${place.target}`;
    if (reportedHolds.has(heldPlace)) return;
    hold.timer = window.setTimeout(() => {
      reportedHolds.add(heldPlace);
      sendCustomEvent('Hold', place);
    }, holdDuration);
  };

  document.addEventListener('pointerdown', startHold);
  document.addEventListener('pointerup', endHold);
  document.addEventListener('pointercancel', endHold);
  return () => {
    document.removeEventListener('pointerdown', startHold);
    document.removeEventListener('pointerup', endHold);
    document.removeEventListener('pointercancel', endHold);
    endHold();
  };
};
