import { sendCustomEvent } from './metaPixel';
import { trackedPlace } from './trackedPlace';

const settleDuration = 600;

const selectedPlace = () => {
  const selected = document.getSelection();
  if (!selected?.anchorNode || !selected.toString().trim()) return null;
  const anchor = selected.anchorNode;
  const anchorElement = anchor instanceof Element ? anchor : anchor.parentElement;
  if (!anchorElement) return null;
  return trackedPlace(anchorElement);
};

export const trackTextSelection = () => {
  const reportedSelections = new Set<string>();
  const reportedCopies = new Set<string>();
  const selection = { timer: 0 };

  const reportOnce = (eventName: string, reportedSections: Set<string>) => {
    const place = selectedPlace();
    if (!place || reportedSections.has(place.section)) return;
    reportedSections.add(place.section);
    sendCustomEvent(eventName, place);
  };

  const reportSelection = () => reportOnce('TextSelect', reportedSelections);
  const reportCopy = () => reportOnce('TextCopy', reportedCopies);

  const reportSettledSelection = () => {
    clearTimeout(selection.timer);
    selection.timer = window.setTimeout(reportSelection, settleDuration);
  };

  document.addEventListener('selectionchange', reportSettledSelection);
  document.addEventListener('copy', reportCopy);
  return () => {
    document.removeEventListener('selectionchange', reportSettledSelection);
    document.removeEventListener('copy', reportCopy);
    clearTimeout(selection.timer);
  };
};
