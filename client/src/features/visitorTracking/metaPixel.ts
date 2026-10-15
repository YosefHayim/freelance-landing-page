import { loadOutsideScript } from './loadOutsideScript';

const pixelId = '4662982497316102';
const pixelScriptAddress = 'https://connect.facebook.net/en_US/fbevents.js';

type PixelCall = (...pixelArguments: unknown[]) => void;

type Pixel = PixelCall & {
  callMethod?: PixelCall;
  push?: PixelCall;
  queue: unknown[][];
  loaded: boolean;
  version: string;
};

type EventDetails = Record<string, string | number>;

declare global {
  interface Window {
    fbq?: Pixel;
    _fbq?: Pixel;
  }
}

const createPixel = () => {
  const pixel: Pixel = Object.assign(
    (...pixelArguments: unknown[]) => {
      if (!pixel.callMethod) {
        pixel.queue.push(pixelArguments);
        return;
      }
      pixel.callMethod(...pixelArguments);
    },
    { queue: [], loaded: true, version: '2.0' },
  );
  pixel.push = pixel;
  return pixel;
};

export const loadMetaPixel = () => {
  if (window.fbq || !import.meta.env.PROD) return;
  const pixel = createPixel();
  window.fbq = pixel;
  window._fbq = pixel;
  pixel('init', pixelId);
  pixel('track', 'PageView');
  loadOutsideScript(pixelScriptAddress);
};

const sendEvent = (method: 'track' | 'trackCustom', eventName: string, details: EventDetails) => {
  if (!window.fbq) return;
  window.fbq(method, eventName, { ...details, language: document.documentElement.lang });
};

export const sendStandardEvent = (eventName: string, details: EventDetails) =>
  sendEvent('track', eventName, details);

export const sendCustomEvent = (eventName: string, details: EventDetails) =>
  sendEvent('trackCustom', eventName, details);
