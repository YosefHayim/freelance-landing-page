export const projectGroupNames = ['client', 'own'] as const;

export type ProjectGroupName = (typeof projectGroupNames)[number];

export type ProjectName =
  | 'oly'
  | 'myPr'
  | 'omriAssociation'
  | 'calFriend'
  | 'replybase'
  | 'smallBites'
  | 'wiseNoteTaker';

export type ProjectLinkKind = 'site' | 'appStore';

type Project = {
  href: string;
  linkKind: ProjectLinkKind;
  trackedName: string;
};

export const projectGroups: Record<ProjectGroupName, ProjectName[]> = {
  client: ['oly', 'myPr', 'omriAssociation'],
  own: ['calFriend', 'replybase', 'smallBites', 'wiseNoteTaker'],
};

export const projects: Record<ProjectName, Project> = {
  oly: {
    href: 'https://www.olyapp.com/',
    linkKind: 'site',
    trackedName: 'project_oly',
  },
  myPr: {
    href: 'https://mypr.co.il/',
    linkKind: 'site',
    trackedName: 'project_mypr',
  },
  omriAssociation: {
    href: 'https://www.omri-association.com/',
    linkKind: 'site',
    trackedName: 'project_omri_association',
  },
  calFriend: {
    href: 'https://calfriend.ai/',
    linkKind: 'site',
    trackedName: 'project_cal_friend',
  },
  replybase: {
    href: 'https://replybase.dev/',
    linkKind: 'site',
    trackedName: 'project_replybase',
  },
  smallBites: {
    href: 'https://apps.apple.com/app/id6759283694',
    linkKind: 'appStore',
    trackedName: 'project_small_bites',
  },
  wiseNoteTaker: {
    href: 'https://apps.apple.com/app/id6759506382',
    linkKind: 'appStore',
    trackedName: 'project_wise_note_taker',
  },
};
