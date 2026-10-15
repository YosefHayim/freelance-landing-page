const firstContentfulPaint = 'first-contentful-paint';

const waitForFirstContentfulPaint = () =>
  new Promise<void>((painted) => {
    const canObservePaint = PerformanceObserver.supportedEntryTypes.includes('paint');
    if (!canObservePaint) {
      painted();
      return;
    }
    const observer = new PerformanceObserver((entries) => {
      const hasPainted = entries.getEntriesByName(firstContentfulPaint).length > 0;
      if (!hasPainted) return;
      observer.disconnect();
      painted();
    });
    observer.observe({ type: 'paint', buffered: true });
  });

const waitForNextFrame = () =>
  new Promise<void>((framed) => requestAnimationFrame(() => window.setTimeout(framed)));

export const runAfterFirstPaint = (start: () => void) => {
  waitForFirstContentfulPaint().then(waitForNextFrame).then(start);
};
