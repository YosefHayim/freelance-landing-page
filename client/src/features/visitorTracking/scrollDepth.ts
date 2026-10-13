export const scrollDepths = [25, 50, 75, 100];

export const scrollDepthPercent = (
  scrollTop: number,
  viewportHeight: number,
  pageHeight: number,
) => {
  const scrollableHeight = pageHeight - viewportHeight;
  if (scrollableHeight <= 0) return 0;
  const percent = Math.round((scrollTop / scrollableHeight) * 100);
  const percentUpToFull = Math.min(percent, 100);
  return Math.max(percentUpToFull, 0);
};
