export const pageSettleDuration = 1300;
export const lastPaintDuration = 200;

const isRunningTransition = (animation: Animation) =>
  animation instanceof CSSTransition && animation.playState === 'running';

export const runAfterPageSettles = (start: () => void) => {
  const startAfterLastPaint = () => window.setTimeout(start, lastPaintDuration);
  const startAfterTransitions = () => {
    const animations = document.getAnimations();
    const transitions = animations.filter(isRunningTransition);
    if (transitions.length === 0) {
      startAfterLastPaint();
      return;
    }
    const transitionEnds = transitions.map((transition) => transition.finished);
    Promise.allSettled(transitionEnds).then(startAfterTransitions);
  };
  const startLater = () => window.setTimeout(startAfterTransitions, pageSettleDuration);
  if (document.readyState === 'complete') {
    startLater();
    return;
  }
  window.addEventListener('load', startLater, { once: true });
};
