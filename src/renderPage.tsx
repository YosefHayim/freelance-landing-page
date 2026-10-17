import { StrictMode } from 'react';
import { prerender } from 'react-dom/static';
import { type Language, languageDirection } from './features/language/language';
import { pageHeadText } from './features/language/pageHead.text';
import { legalDocuments, legalPageAt } from './features/legal/legalPages';
import { SitePage } from './SitePage';

const siteAddress = 'https://joseph-tech-solutions.dev';
const htmlEscapes: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
};

const escapeHtml = (text: string) => text.replace(/[&<>"]/g, (character) => htmlEscapes[character]);

const headTextAt = (pagePath: string, language: Language) => {
  const legalPageName = legalPageAt(pagePath);
  if (!legalPageName) return pageHeadText[language];
  return legalDocuments[legalPageName][language];
};

export const renderPage = async (template: string, language: Language, pagePath: string) => {
  const { prelude } = await prerender(
    <StrictMode>
      <SitePage pagePath={pagePath} initialLanguage={language} />
    </StrictMode>,
  );
  const appHtml = await new Response(prelude).text();
  const headText = headTextAt(pagePath, language);
  const htmlTag = `<html lang="${language}" dir="${languageDirection[language]}">`;
  const title = escapeHtml(headText.title);
  const description = escapeHtml(headText.description);
  const titleTag = `<title>${title}</title>`;
  const descriptionStart = `<meta name="description" content="${description}"`;
  const canonicalStart = `<link rel="canonical" href="${siteAddress}${pagePath}"`;
  return template
    .replace('<html lang="en" dir="ltr">', () => htmlTag)
    .replace(/<title>.*<\/title>/, () => titleTag)
    .replace(/<meta name="description" content="[^"]*"/, () => descriptionStart)
    .replace(/<link rel="canonical" href="[^"]*"/, () => canonicalStart)
    .replace('<div id="root"></div>', () => `<div id="root">${appHtml}</div>`);
};
