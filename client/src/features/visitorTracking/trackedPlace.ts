export const unnamedTarget = 'none';

export const trackedPlace = (element: Element) => {
  const namedElement = element.closest<HTMLElement>('[data-track]');
  const section = element.closest('section[id]');
  return {
    target: namedElement?.dataset.track || unnamedTarget,
    section: section?.id || 'page',
  };
};
