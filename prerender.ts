import { readFile, rm, writeFile } from 'node:fs/promises';
import type { Language } from './src/features/language/language';

type RenderPage = (template: string, language: Language, pagePath: string) => Promise<string>;

type PageFile = { pagePath: string; language: Language; fileName: string };

const clientDirectory = new URL('./dist/client/', import.meta.url);
const builtPageFile = new URL('index.html', clientDirectory);
const serverEntry = new URL('./dist/server/renderPage.js', import.meta.url);
const pageFiles: PageFile[] = [
  { pagePath: '/', language: 'en', fileName: 'index.html' },
  { pagePath: '/', language: 'he', fileName: 'index.he.html' },
  { pagePath: '/privacy', language: 'en', fileName: 'privacy.html' },
  { pagePath: '/privacy', language: 'he', fileName: 'privacy.he.html' },
  { pagePath: '/terms', language: 'en', fileName: 'terms.html' },
  { pagePath: '/terms', language: 'he', fileName: 'terms.he.html' },
];
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

const writePage = async ({ pagePath, language, fileName }: PageFile) => {
  const page = await renderPage(template, language, pagePath);
  const pageFile = new URL(fileName, clientDirectory);
  await writeFile(pageFile, page);
};

const pageWrites = pageFiles.map(writePage);
await Promise.all(pageWrites);
