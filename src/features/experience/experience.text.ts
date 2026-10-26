import type { Language } from '../language/language';

export const experienceFactNames = ['years', 'aiAndWeb', 'nativeApps'] as const;

export const experienceProofNames = ['dataMove', 'ebayMcp', 'excellence'] as const;

type ExperienceFactName = (typeof experienceFactNames)[number];

type ExperienceProofName = (typeof experienceProofNames)[number];

type ExperienceProofText = {
  figure: string;
  detail: string;
};

type ExperienceText = {
  heading: string;
  mutedHeading: string;
  factsLabel: string;
  facts: Record<ExperienceFactName, string>;
  lead: string;
  proofs: Record<ExperienceProofName, ExperienceProofText>;
  ebayMcpLinkLabel: string;
};

export const experienceText: Record<Language, ExperienceText> = {
  en: {
    heading: 'AI can write code',
    mutedHeading: 'I know what it misses',
    factsLabel: 'My experience',
    facts: {
      years: 'Over two years of experience',
      aiAndWeb: 'AI systems, web design and architecture',
      nativeApps: 'Native iPhone and Android apps',
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
    factsLabel: 'הניסיון שלי',
    facts: {
      years: 'יותר משנתיים של ניסיון',
      aiAndWeb: 'מערכות AI, עיצוב אתרים וארכיטקטורה',
      nativeApps: 'אפליקציות נייטיב לאייפון ולאנדרואיד',
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
