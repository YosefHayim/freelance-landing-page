const firstPaintTimeout = 3000;

const pageLoad = () =>
  new Promise<void>((resolve) => {
    if (document.readyState === 'complete') {
      resolve();
      return;
    }
    window.addEventListener('load', () => resolve(), { once: true });
  });

const firstPaint = () =>
  new Promise<void>((resolve) => {
    const observer = new PerformanceObserver(() => {
      observer.disconnect();
      resolve();
    });
    observer.observe({ type: 'paint', buffered: true });
    window.setTimeout(resolve, firstPaintTimeout);
  });

export const runAfterFirstPaint = async (start: () => void) => {
  await Promise.all([pageLoad(), firstPaint()]);
  start();
};
