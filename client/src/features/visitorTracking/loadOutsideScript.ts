import { runOnFirstInteraction } from '../pageLoad/runOnFirstInteraction';

export const outsideScriptDelay = 5000;

const addScript = (address: string) => {
  const script = document.createElement('script');
  script.async = true;
  script.src = address;
  document.head.append(script);
};

export const loadOutsideScript = (address: string) =>
  runOnFirstInteraction(() => addScript(address), outsideScriptDelay);
