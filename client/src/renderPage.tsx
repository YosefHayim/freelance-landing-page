import { StrictMode } from 'react';
import { prerender } from 'react-dom/static';
import { App } from './App';
import { pageTitleText } from './features/language/pageTitle.text';
import { type Language, languageDirection } from './features/language/savedLanguage';

export const renderPage = async (template: string, language: Language) => {
  const { prelude } = await prerender(
    <StrictMode>
      <App initialLanguage={language} />
    </StrictMode>,
  );
  const appHtml = await new Response(prelude).text();
  const htmlTag = `<html lang="${language}" dir="${languageDirection[language]}">`;
  const titleTag = `<title>${pageTitleText[language].title}</title>`;
  return template
    .replace('<html lang="en" dir="ltr">', () => htmlTag)
    .replace(/<title>.*<\/title>/, () => titleTag)
    .replace('<div id="root"></div>', () => `<div id="root">${appHtml}</div>`);
};
