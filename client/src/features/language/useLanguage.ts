import { useEffect, useLayoutEffect, useState } from 'react';
import { type Language, loadLanguage, saveLanguage, textDirection } from './savedLanguage';

export const useLanguage = (initialLanguage: Language) => {
  const [language, setLanguage] = useState(initialLanguage);

  useEffect(() => setLanguage(loadLanguage(initialLanguage)), [initialLanguage]);

  useLayoutEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = textDirection(language);
  }, [language]);

  const toggleLanguage = () => {
    const nextLanguage = language === 'he' ? 'en' : 'he';
    setLanguage(nextLanguage);
    saveLanguage(nextLanguage);
  };

  return { language, toggleLanguage };
};
