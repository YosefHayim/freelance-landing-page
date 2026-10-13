import { runAfterPageSettles } from '../pageLoad/runAfterPageSettles';

const mountChatWidget = () => {
  const widgetTemplate = document.getElementById('replybase-widget');
  if (!(widgetTemplate instanceof HTMLTemplateElement)) return;
  const widget = document.importNode(widgetTemplate.content, true);
  widgetTemplate.replaceWith(widget);
};

export const loadChatWidget = () => runAfterPageSettles(mountChatWidget);
