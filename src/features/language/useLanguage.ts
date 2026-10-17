import { useLayoutEffect, useState } from 'react';
import { type Language, languageDirection, saveLanguage } from './language';
import type { PageHeadText } from './pageHead.text';

export const useLanguage = (
  initialLanguage: Language,
  headText: Record<Language, PageHeadText>,
) => {
  const [language, setLanguage] = useState(initialLanguage);

  useLayoutEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = languageDirection[language];
    document.title = headText[language].title;
    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute('content', headText[language].description);
  }, [language, headText]);

  const toggleLanguage = () => {
    const nextLanguage = language === 'he' ? 'en' : 'he';
    setLanguage(nextLanguage);
    saveLanguage(nextLanguage);
  };

  return { language, toggleLanguage };
};
