import { runAfterFirstInteraction } from '../pageLoad/runAfterFirstInteraction';
import { addScript } from './addScript';

const pixelId = 'DBAFOH3C77UBBA28G6QG';
const pixelName = 'ttq';
const pixelScriptAddress = `https://analytics.tiktok.com/i18n/pixel/events.js?sdkid=${pixelId}&lib=${pixelName}`;

type PixelCall = (...pixelArguments: unknown[]) => void;

type PixelQueue = unknown[][];

type Pixel = PixelQueue & {
  page: PixelCall;
  track: PixelCall;
  _i: Record<string, PixelQueue>;
  _t: Record<string, number>;
  _o: Record<string, object>;
};

type EventDetails = Record<string, string | number>;

declare global {
  interface Window {
    TiktokAnalyticsObject?: string;
    ttq?: Pixel;
  }
}

const queueMethod =
  (queue: PixelQueue, methodName: string) =>
  (...pixelArguments: unknown[]) => {
    queue.push([methodName, ...pixelArguments]);
  };

const createPixel = () => {
  const queue: PixelQueue = [];
  return Object.assign(queue, {
    page: queueMethod(queue, 'page'),
    track: queueMethod(queue, 'track'),
    _i: { [pixelId]: [] },
    _t: { [pixelId]: Date.now() },
    _o: { [pixelId]: {} },
  });
};

export const loadTikTokPixel = () => {
  if (window.ttq || !import.meta.env.PROD) return;
  const pixel = createPixel();
  window.TiktokAnalyticsObject = pixelName;
  window.ttq = pixel;
  pixel.page();
  runAfterFirstInteraction(() => addScript(pixelScriptAddress));
};

export const sendTikTokEvent = (eventName: string, details: EventDetails) => {
  if (!window.ttq) return;
  window.ttq.track(eventName, { ...details, language: document.documentElement.lang });
};
