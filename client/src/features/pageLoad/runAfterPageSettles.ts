export const pageSettleDuration = 1300;
export const lastPaintDuration = 200;

const isTransition = (animation: Animation) => animation instanceof CSSTransition;

export const runAfterPageSettles = (start: () => void) => {
  const startAfterLastPaint = () => window.setTimeout(start, lastPaintDuration);
  const startAfterTransitions = () => {
    const animations = document.getAnimations();
    const transitions = animations.filter(isTransition);
    const transitionEnds = transitions.map((transition) => transition.finished);
    Promise.allSettled(transitionEnds).then(startAfterLastPaint);
  };
  const startLater = () => window.setTimeout(startAfterTransitions, pageSettleDuration);
  if (document.readyState === 'complete') {
    startLater();
    return;
  }
  window.addEventListener('load', startLater, { once: true });
};
