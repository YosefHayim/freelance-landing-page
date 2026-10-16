import type { Language } from '../../language/language';

export interface ProblemAnimationProps {
  isActive: boolean;
  language: Language;
}

export const problemAnimationClassName = (name: string, isActive: boolean) =>
  isActive ? `problem-animation ${name} is-active` : `problem-animation ${name}`;
