import { listenForFirstInteraction } from './listenForFirstInteraction';
import { runAfterPageSettles } from './runAfterPageSettles';

const waitForFirstInteraction = () =>
  new Promise<void>((interacted) => {
    listenForFirstInteraction(interacted);
  });

const waitForPageToSettle = () => new Promise<void>((settled) => runAfterPageSettles(settled));

export const runAfterFirstInteraction = (start: () => void) => {
  const firstInteraction = waitForFirstInteraction();
  const pageSettled = waitForPageToSettle();
  Promise.all([firstInteraction, pageSettled]).then(start);
};
