import type { Language } from '../language/language';

export const experienceRoleNames = ['startup', 'internship', 'freelance'] as const;

export const experienceProofNames = ['dataMove', 'ebayMcp', 'excellence'] as const;

type ExperienceRoleName = (typeof experienceRoleNames)[number];

type ExperienceProofName = (typeof experienceProofNames)[number];

type ExperienceProofText = {
  figure: string;
  detail: string;
};

type ExperienceText = {
  heading: string;
  mutedHeading: string;
  rolesLabel: string;
  roles: Record<ExperienceRoleName, string>;
  lead: string;
  proofs: Record<ExperienceProofName, ExperienceProofText>;
  ebayMcpLinkLabel: string;
};

export const experienceText: Record<Language, ExperienceText> = {
  en: {
    heading: 'AI can write code',
    mutedHeading: 'I know what it misses',
    rolesLabel: 'My experience',
    roles: {
      startup: '1 year at a startup',
      internship: '3-month internship',
      freelance: 'Almost a year freelance',
    },
    lead: 'Not from a tutorial. From real work:',
    proofs: {
      dataMove: {
        figure: '10 years',
        detail: 'of real data I moved to Cloudflare, without losing a single item.',
      },
      ebayMcp: {
        figure: '180+',
        detail: 'GitHub stars on an open-source tool I built that connects eBay to AI.',
      },
      excellence: {
        figure: 'Excellence',
        detail: "in Israel's Atidim tech program, and before that in the IDF commanders course.",
      },
    },
    ebayMcpLinkLabel: 'See it on GitHub →',
  },
  he: {
    heading: 'AI יודע לכתוב קוד',
    mutedHeading: 'אני יודע מה הוא מפספס',
    rolesLabel: 'הניסיון שלי',
    roles: {
      startup: 'שנה בסטארטאפ',
      internship: '3 חודשי התמחות',
      freelance: 'כמעט שנה כעצמאי',
    },
    lead: 'לא מתוך מדריך. מתוך עבודה אמיתית:',
    proofs: {
      dataMove: {
        figure: '10 שנים',
        detail: 'של מידע אמיתי העברתי ל-Cloudflare, בלי לאבד אף פריט.',
      },
      ebayMcp: {
        figure: '180+',
        detail: 'כוכבים ב-GitHub לכלי קוד פתוח שבניתי, שמחבר את eBay ל-AI.',
      },
      excellence: {
        figure: 'הצטיינות',
        detail: 'בתוכנית עתידים של משרד הביטחון, ולפני זה בקורס מפקדים בצה"ל.',
      },
    },
    ebayMcpLinkLabel: 'לפרויקט ב-GitHub ←',
  },
};
