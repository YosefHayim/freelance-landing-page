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

const scheduleChatWidget = () => window.setTimeout(mountOnFirstInteraction, 1500);

export const loadChatWidget = () => {
  if (document.readyState === 'complete') {
    scheduleChatWidget();
    return;
  }
  window.addEventListener('load', scheduleChatWidget, { once: true });
};
