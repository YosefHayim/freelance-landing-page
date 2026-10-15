import { sendCustomEvent } from './metaPixel';

const viewDuration = 1000;
const middleOfScreen = '-50% 0px -50% 0px';

export const trackSectionViews = (sections: HTMLElement[]) => {
  const reportedSections = new Set<string>();
  const sectionsAtMiddle = new Set<Element>();
  const view = { section: '', timer: 0 };

  const reportSectionOnTop = (entries: IntersectionObserverEntry[]) => {
    for (const entry of entries) {
      if (entry.isIntersecting) sectionsAtMiddle.add(entry.target);
      if (!entry.isIntersecting) sectionsAtMiddle.delete(entry.target);
    }
    const sectionOnTop = sections.findLast((section) => sectionsAtMiddle.has(section));
    const section = sectionOnTop ? sectionOnTop.id : '';
    if (section === view.section) return;
    clearTimeout(view.timer);
    view.section = section;
    if (!section || reportedSections.has(section)) return;
    view.timer = window.setTimeout(() => {
      reportedSections.add(section);
      sendCustomEvent('SectionView', { section });
    }, viewDuration);
  };

  const observer = new IntersectionObserver(reportSectionOnTop, { rootMargin: middleOfScreen });
  for (const section of sections) observer.observe(section);
  return () => {
    observer.disconnect();
    clearTimeout(view.timer);
  };
};
