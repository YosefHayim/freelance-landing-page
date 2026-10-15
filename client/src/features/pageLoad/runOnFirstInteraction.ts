const firstInteractionEvents = ['pointerdown', 'pointermove', 'keydown', 'scroll'] as const;

export const runOnFirstInteraction = (start: () => void, fallbackDelay?: number) => {
  const interaction = new AbortController();
  const startOnce = () => {
    interaction.abort();
    start();
  };
  firstInteractionEvents.forEach((eventName) => {
    window.addEventListener(eventName, startOnce, { passive: true, signal: interaction.signal });
  });
  if (fallbackDelay === undefined) return;
  const fallbackTimer = window.setTimeout(startOnce, fallbackDelay);
  interaction.signal.addEventListener('abort', () => window.clearTimeout(fallbackTimer));
};
