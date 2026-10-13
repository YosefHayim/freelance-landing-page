import { sendCustomEvent } from './metaPixel';

const timeMilestones = [10, 30, 60, 120];
const lastMilestone = Math.max(...timeMilestones);

export const trackTimeOnPage = () => {
  const visit = { visibleSeconds: 0 };

  const countVisibleSecond = () => {
    if (document.visibilityState !== 'visible') return;
    visit.visibleSeconds += 1;
    if (timeMilestones.includes(visit.visibleSeconds)) {
      sendCustomEvent('TimeOnPage', { seconds: visit.visibleSeconds });
    }
    if (visit.visibleSeconds >= lastMilestone) clearInterval(timer);
  };

  const timer = window.setInterval(countVisibleSecond, 1000);
  return () => clearInterval(timer);
};
