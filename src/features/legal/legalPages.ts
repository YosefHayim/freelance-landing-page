import type { Language } from '../language/language';
import type { LegalDocumentText } from './legalDocumentText';
import { privacyPolicyText } from './privacyPolicy.text';
import { termsOfUseText } from './termsOfUse.text';

export type LegalPageName = 'privacy' | 'terms';

export const legalPageNames: LegalPageName[] = ['privacy', 'terms'];

export const legalDocuments: Record<LegalPageName, Record<Language, LegalDocumentText>> = {
  privacy: privacyPolicyText,
  terms: termsOfUseText,
};

export const legalPagePath = (legalPageName: LegalPageName) => `/${legalPageName}`;

export const legalPageAt = (pagePath: string) =>
  legalPageNames.find((legalPageName) => legalPagePath(legalPageName) === pagePath);
