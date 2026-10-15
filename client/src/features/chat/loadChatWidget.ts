import { runAfterFirstInteraction } from '../pageLoad/runAfterFirstInteraction';

export const chatWidgetTag = 'ai-chat-widget';

const mountChatWidget = () => {
  const widgetTemplate = document.getElementById('replybase-widget');
  if (!(widgetTemplate instanceof HTMLTemplateElement)) return;
  const widget = document.importNode(widgetTemplate.content, true);
  widgetTemplate.replaceWith(widget);
};

export const loadChatWidget = () => runAfterFirstInteraction(mountChatWidget);
