import monoFontAddress from '@fontsource/dm-mono/files/dm-mono-latin-400-normal.woff2';

export const loadMonoFont = async () => {
  const monoFont = new FontFace('DM Mono', `url(${monoFontAddress}) format('woff2')`, {
    display: 'swap',
  });
  document.fonts.add(monoFont);
  await monoFont.load().catch((error: unknown) => console.error('DM Mono did not load', error));
};
