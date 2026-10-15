import { describe, expect, it } from 'vitest';
import { languageFromLocale } from './savedLanguage';

describe('language from locale', () => {
  it.each(['he', 'he-IL', 'HE-il'])('detects Hebrew locale %s', (locale) =>
    expect(languageFromLocale(locale)).toBe('he'),
  );

  it.each(['en-US', 'ar', 'fr', 'hello', ''])('defaults %s to English', (locale) =>
    expect(languageFromLocale(locale)).toBe('en'),
  );
});
