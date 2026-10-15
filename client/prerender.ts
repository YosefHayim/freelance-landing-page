import { readFile, rm, writeFile } from 'node:fs/promises';
import type { Language } from './src/features/language/savedLanguage';

type RenderPage = (template: string, language: Language) => Promise<string>;

const clientDirectory = new URL('./dist/client/', import.meta.url);
const builtPageFile = new URL('index.html', clientDirectory);
const serverEntry = new URL('./dist/server/renderPage.js', import.meta.url);
const pageFiles: Record<Language, string> = { en: 'index.html', he: 'index.he.html' };
const stylesheetLink = /<link rel="stylesheet"[^>]*href="\/(assets\/[^"]+\.css)"[^>]*>/;
const entryScriptTag = '<script type="module" crossorigin';

const inlineStylesheet = async (builtPage: string) => {
  const stylesheet = builtPage.match(stylesheetLink);
  if (!stylesheet) throw new Error('The built page links no stylesheet');
  const stylesheetFile = new URL(stylesheet[1], clientDirectory);
  const styles = await readFile(stylesheetFile, 'utf8');
  await rm(stylesheetFile);
  return builtPage.replace(stylesheet[0], () => `<style>${styles}</style>`);
};

const startAfterPaint = (builtPage: string) => {
  if (!builtPage.includes(entryScriptTag)) throw new Error('The built page has no entry script');
  return builtPage.replace(entryScriptTag, '<script type="module" fetchpriority="low" crossorigin');
};

const builtPage = await readFile(builtPageFile, 'utf8');
const pageWithStyles = await inlineStylesheet(builtPage);
const template = startAfterPaint(pageWithStyles);
const { renderPage }: { renderPage: RenderPage } = await import(serverEntry.href);

const writePage = async (language: Language) => {
  const page = await renderPage(template, language);
  const pageFile = new URL(pageFiles[language], clientDirectory);
  await writeFile(pageFile, page);
};

await Promise.all([writePage('en'), writePage('he')]);
