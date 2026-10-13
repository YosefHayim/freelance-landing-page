import { sendCustomEvent } from './metaPixel';
import { scrollDepthPercent, scrollDepths } from './scrollDepth';

export const trackScrollDepth = () => {
  const reportedDepths = new Set<number>();
  const scroll = { frame: 0 };

  const reportDepths = () => {
    scroll.frame = 0;
    const pageHeight = document.documentElement.scrollHeight;
    const percent = scrollDepthPercent(window.scrollY, window.innerHeight, pageHeight);
    const newDepths = scrollDepths.filter(
      (depth) => percent >= depth && !reportedDepths.has(depth),
    );
    for (const depth of newDepths) {
      reportedDepths.add(depth);
      sendCustomEvent('ScrollDepth', { percent: depth });
    }
  };

  const reportOnNextFrame = () => {
    if (scroll.frame) return;
    scroll.frame = requestAnimationFrame(reportDepths);
  };

  window.addEventListener('scroll', reportOnNextFrame, { passive: true });
  return () => {
    window.removeEventListener('scroll', reportOnNextFrame);
    cancelAnimationFrame(scroll.frame);
  };
};
