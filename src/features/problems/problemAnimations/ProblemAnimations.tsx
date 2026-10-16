import type { ComponentType } from 'react';
import type { Language } from '../../language/language';
import { DeveloperGoneAnimation } from './DeveloperGoneAnimation';
import { DisconnectedToolsAnimation } from './DisconnectedToolsAnimation';
import { ManualDataEntryAnimation } from './ManualDataEntryAnimation';
import { MissedDeadlineAnimation } from './MissedDeadlineAnimation';
import { NoTechPartnerAnimation } from './NoTechPartnerAnimation';
import type { ProblemAnimationProps } from './problemAnimation';
import { SlowSiteAnimation } from './SlowSiteAnimation';
import { StuckOnLocalhostAnimation } from './StuckOnLocalhostAnimation';
import { UntrustedAiCodeAnimation } from './UntrustedAiCodeAnimation';

const problemAnimations: { name: string; Animation: ComponentType<ProblemAnimationProps> }[] = [
  { name: 'stuckOnLocalhost', Animation: StuckOnLocalhostAnimation },
  { name: 'developerGone', Animation: DeveloperGoneAnimation },
  { name: 'untrustedAiCode', Animation: UntrustedAiCodeAnimation },
  { name: 'missedDeadline', Animation: MissedDeadlineAnimation },
  { name: 'slowSite', Animation: SlowSiteAnimation },
  { name: 'disconnectedTools', Animation: DisconnectedToolsAnimation },
  { name: 'noTechPartner', Animation: NoTechPartnerAnimation },
  { name: 'manualDataEntry', Animation: ManualDataEntryAnimation },
];

interface ProblemAnimationsProps {
  language: Language;
  activeProblem: number;
}

export const ProblemAnimations = ({ language, activeProblem }: ProblemAnimationsProps) => (
  <>
    {problemAnimations.map(({ name, Animation }, problem) => (
      <Animation key={name} isActive={problem === activeProblem} language={language} />
    ))}
  </>
);
