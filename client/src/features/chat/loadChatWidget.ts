const mountChatWidget = () => {
  const widgetTemplate = document.getElementById('replybase-widget');
  if (!(widgetTemplate instanceof HTMLTemplateElement)) return;
  const widget = document.importNode(widgetTemplate.content, true);
  widgetTemplate.replaceWith(widget);
};

const scheduleChatWidget = () => window.setTimeout(mountChatWidget, 1500);

export const loadChatWidget = () => {
  if (document.readyState === 'complete') {
    scheduleChatWidget();
    return;
  }
  window.addEventListener('load', scheduleChatWidget, { once: true });
};
