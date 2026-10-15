const firstInteractionEvents = ['pointerdown', 'pointermove', 'keydown', 'scroll'] as const;

export const listenForFirstInteraction = (interacted: () => void) => {
  const listeners = new AbortController();
  const stopListening = () => listeners.abort();
  const canReadActivation = 'userActivation' in navigator;
  const hasBeenActive = canReadActivation && navigator.userActivation.hasBeenActive;
  const hasInteracted = window.scrollY > 0 || hasBeenActive;
  if (hasInteracted) {
    interacted();
    return stopListening;
  }
  const handleFirstInteraction = () => {
    stopListening();
    interacted();
  };
  for (const eventName of firstInteractionEvents) {
    window.addEventListener(eventName, handleFirstInteraction, {
      passive: true,
      signal: listeners.signal,
    });
  }
  return stopListening;
};
