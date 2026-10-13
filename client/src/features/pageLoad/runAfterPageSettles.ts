export const pageSettleDuration = 1500;

export const runAfterPageSettles = (start: () => void) => {
  const startLater = () => window.setTimeout(start, pageSettleDuration);
  if (document.readyState === 'complete') {
    startLater();
    return;
  }
  window.addEventListener('load', startLater, { once: true });
};
