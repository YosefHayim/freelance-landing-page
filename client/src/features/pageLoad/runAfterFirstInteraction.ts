import { runAfterPageSettles } from './runAfterPageSettles';

const firstInteractionEvents = ['pointerdown', 'pointermove', 'keydown', 'scroll'] as const;

const waitForFirstInteraction = () =>
  new Promise<void>((interacted) => {
    const hasInteracted = window.scrollY > 0 || navigator.userActivation.hasBeenActive;
    if (hasInteracted) {
      interacted();
      return;
    }
    const listeners = new AbortController();
    const stopListening = () => {
      listeners.abort();
      interacted();
    };
    for (const eventName of firstInteractionEvents) {
      window.addEventListener(eventName, stopListening, {
        passive: true,
        signal: listeners.signal,
      });
    }
  });

const waitForPageToSettle = () => new Promise<void>((settled) => runAfterPageSettles(settled));

export const runAfterFirstInteraction = (start: () => void) => {
  const firstInteraction = waitForFirstInteraction();
  const pageSettled = waitForPageToSettle();
  Promise.all([firstInteraction, pageSettled]).then(start);
};
