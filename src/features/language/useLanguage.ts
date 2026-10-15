import { useLayoutEffect, useState } from 'react';
import { pageHeadText } from './pageHead.text';
import { type Language, languageDirection, saveLanguage } from './savedLanguage';

export const useLanguage = (initialLanguage: Language) => {
  const [language, setLanguage] = useState(initialLanguage);

  useLayoutEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = languageDirection[language];
    document.title = pageHeadText[language].title;
    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute('content', pageHeadText[language].description);
  }, [language]);

  const toggleLanguage = () => {
    const nextLanguage = language === 'he' ? 'en' : 'he';
    setLanguage(nextLanguage);
    saveLanguage(nextLanguage);
  };

  return { language, toggleLanguage };
};
