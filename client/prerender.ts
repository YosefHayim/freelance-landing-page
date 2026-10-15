import { mkdir, readFile, writeFile } from 'node:fs/promises';
import type { Language } from './src/features/language/savedLanguage';

type RenderPage = (template: string, language: Language) => Promise<string>;

const serverEntryPath = './dist-ssr/renderPage.js';
const pageFiles: Record<Language, string> = { en: 'dist/index.html', he: 'dist/he/index.html' };

const serverEntry: { renderPage: RenderPage } = await import(serverEntryPath);
const template = await readFile(pageFiles.en, 'utf8');

const writePage = async (language: Language) => {
  const page = await serverEntry.renderPage(template, language);
  await writeFile(pageFiles[language], page);
};

await mkdir('dist/he', { recursive: true });
await Promise.all([writePage('en'), writePage('he')]);
