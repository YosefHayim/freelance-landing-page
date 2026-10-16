import { StrictMode } from 'react';
import { prerender } from 'react-dom/static';
import { App } from './App';
import { type Language, languageDirection } from './features/language/language';
import { pageHeadText } from './features/language/pageHead.text';

export const renderPage = async (template: string, language: Language) => {
  const { prelude } = await prerender(
    <StrictMode>
      <App initialLanguage={language} />
    </StrictMode>,
  );
  const appHtml = await new Response(prelude).text();
  const htmlTag = `<html lang="${language}" dir="${languageDirection[language]}">`;
  const titleTag = `<title>${pageHeadText[language].title}</title>`;
  const descriptionStart = `<meta name="description" content="${pageHeadText[language].description}"`;
  return template
    .replace('<html lang="en" dir="ltr">', () => htmlTag)
    .replace(/<title>.*<\/title>/, () => titleTag)
    .replace(/<meta name="description" content="[^"]*"/, () => descriptionStart)
    .replace('<div id="root"></div>', () => `<div id="root">${appHtml}</div>`);
};
