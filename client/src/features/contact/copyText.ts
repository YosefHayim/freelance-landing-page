export const copyText = async (text: string, onCopied: () => void) => {
  try {
    await navigator.clipboard.writeText(text);
    onCopied();
  } catch (error) {
    console.warn('clipboard_unavailable', error);
  }
};
