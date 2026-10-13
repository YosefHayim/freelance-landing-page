import { runAfterPageSettles } from '../pageLoad/runAfterPageSettles';

export const chatWidgetTag = 'ai-chat-widget';

const firstInteractionEvents = ['pointerdown', 'pointermove', 'keydown', 'scroll'] as const;

const mountChatWidget = () => {
  const widgetTemplate = document.getElementById('replybase-widget');
  if (!(widgetTemplate instanceof HTMLTemplateElement)) return;
  const widget = document.importNode(widgetTemplate.content, true);
  widgetTemplate.replaceWith(widget);
};

const mountOnFirstInteraction = () => {
  firstInteractionEvents.forEach((eventName) => {
    window.addEventListener(eventName, mountChatWidget, { once: true, passive: true });
  });
};

export const loadChatWidget = () => runAfterPageSettles(mountOnFirstInteraction);
