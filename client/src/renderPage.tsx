import { prerender } from 'react-dom/static';
import { App } from './App';
import { type Language, textDirection } from './features/language/savedLanguage';
import { pageTitleText } from './pageTitle.text';

const fontPreload = /<link rel="preload" href="([^"]+)" as="font"[^>]*>/g;
const pageFonts: Record<Language, string[]> = {
  en: ['inter-latin'],
  he: ['heebo-hebrew', 'heebo-latin'],
};

const isPageFont = (language: Language, fontAddress: string) =>
  pageFonts[language].some((fontName) => fontAddress.includes(`/${fontName}-`));

const renderApp = async (language: Language) => {
  const { prelude } = await prerender(<App initialLanguage={language} />);
  const renderedApp = new Response(prelude);
  return renderedApp.text();
};

export const renderPage = async (template: string, language: Language) => {
  const appHtml = await renderApp(language);
  const pageTitle = pageTitleText[language].title;
  return template
    .replace('<html lang="en" dir="ltr">', () => {
      const direction = textDirection(language);
      return `<html lang="${language}" dir="${direction}">`;
    })
    .replace(/<title>.*<\/title>/, () => `<title>${pageTitle}</title>`)
    .replace(fontPreload, (preload, fontAddress: string) =>
      isPageFont(language, fontAddress) ? preload : '',
    )
    .replace('<div id="root"></div>', () => `<div id="root">${appHtml}</div>`);
};
