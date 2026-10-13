import { chatWidgetTag } from '../chat/loadChatWidget';
import { whatsappLinkSelector } from '../whatsapp/whatsappLink';
import { sendCustomEvent, sendStandardEvent } from './metaPixel';
import { trackedPlace } from './trackedPlace';

const middleButton = 1;

export const trackClicks = () => {
  const chat = { isOpened: false };

  const reportChatClick = () => {
    const eventName = chat.isOpened ? 'ChatClick' : 'ChatOpen';
    chat.isOpened = true;
    sendCustomEvent(eventName, {});
  };

  const reportClick = (event: MouseEvent) => {
    const clicked = event.target;
    if (!(clicked instanceof Element)) return;
    if (clicked.matches(chatWidgetTag)) {
      reportChatClick();
      return;
    }
    const place = trackedPlace(clicked);
    if (clicked.closest(whatsappLinkSelector)) {
      sendStandardEvent('Contact', place);
      return;
    }
    sendCustomEvent('Click', place);
  };

  const reportMiddleClick = (event: MouseEvent) => {
    if (event.button === middleButton) reportClick(event);
  };

  document.addEventListener('click', reportClick);
  document.addEventListener('auxclick', reportMiddleClick);
  return () => {
    document.removeEventListener('click', reportClick);
    document.removeEventListener('auxclick', reportMiddleClick);
  };
};
