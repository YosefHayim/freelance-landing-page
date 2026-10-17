import type { Language } from '../language/language';
import { whatsappText } from './whatsapp.text';

const whatsappAddress = 'https://wa.me/';
export const whatsappNumber = '972546187549';

export const whatsappLinkSelector = `a[href^="${whatsappAddress}"]`;

export const whatsappLink = (language: Language) => {
  const message = encodeURIComponent(whatsappText[language].message);
  return `${whatsappAddress}${whatsappNumber}?text=${message}`;
};
