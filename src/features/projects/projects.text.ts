import type { Language } from '../language/language';
import type { ProjectGroupName, ProjectLinkKind, ProjectName } from './projects';

type ProjectText = {
  name: string;
  detail: string;
};

type ProjectsText = {
  heading: string;
  mutedHeading: string;
  groupTitles: Record<ProjectGroupName, string>;
  linkLabels: Record<ProjectLinkKind, string>;
  projects: Record<ProjectName, ProjectText>;
};

export const projectsText: Record<Language, ProjectsText> = {
  en: {
    heading: 'Already live',
    mutedHeading: 'Tap and see for yourself',
    groupTitles: {
      client: 'For clients',
      own: 'My own products',
    },
    linkLabels: {
      site: 'Visit the site →',
      appStore: 'On the App Store →',
    },
    projects: {
      oly: {
        name: 'Oly',
        detail: 'A yoga app with AI that follows your pose and corrects it in real time.',
      },
      myPr: {
        name: 'MyPR',
        detail:
          'A site and app with AI that connect people with a story to the right journalist, without revealing contact details.',
      },
      omriAssociation: {
        name: 'Omri Association',
        detail:
          'An internal system that runs all the income and expenses of a nonprofit for women.',
      },
      calFriend: {
        name: 'Cal Friend',
        detail: 'Snap your meal and get calories, protein and progress tracking.',
      },
      replybase: {
        name: 'Replybase',
        detail:
          'An AI chat for your site that answers customers only from content you approved, and sends you the leads.',
      },
      smallBites: {
        name: 'Small Bites',
        detail: 'An app for parents starting solids, with 400+ first foods and 300+ recipes.',
      },
      wiseNoteTaker: {
        name: 'WiseNoteTaker',
        detail: 'Record a meeting and get a transcript, a summary and action items, with AI.',
      },
    },
  },
  he: {
    heading: 'כבר באוויר',
    mutedHeading: 'לחצו ותראו בעצמכם',
    groupTitles: {
      client: 'ללקוחות',
      own: 'המוצרים שלי',
    },
    linkLabels: {
      site: 'לאתר ←',
      appStore: 'ב-App Store ←',
    },
    projects: {
      oly: {
        name: 'Oly',
        detail: 'אפליקציית יוגה עם AI, שעוקבת אחרי התנוחה שלכם ומתקנת אותה בזמן אמת.',
      },
      myPr: {
        name: 'MyPR',
        detail: 'אתר ואפליקציה עם AI, שמחברים אנשים עם סיפור לעיתונאי הנכון, בלי לחשוף פרטי קשר.',
      },
      omriAssociation: {
        name: 'עמותת עומרי',
        detail: 'מערכת פנימית שמנהלת את כל ההכנסות וההוצאות של עמותה לנשים.',
      },
      calFriend: {
        name: 'Cal Friend',
        detail: 'מצלמים את הארוחה, ומקבלים קלוריות, חלבון ומעקב התקדמות.',
      },
      replybase: {
        name: 'Replybase',
        detail: "צ'אט AI לאתר שעונה ללקוחות רק מהתוכן שאישרתם, ומעביר לכם את הלידים.",
      },
      smallBites: {
        name: 'Small Bites',
        detail: 'אפליקציה להורים בהתחלת מזון מוצק, עם יותר מ-400 מזונות ראשונים ו-300 מתכונים.',
      },
      wiseNoteTaker: {
        name: 'WiseNoteTaker',
        detail: 'מקליטים פגישה, ומקבלים תמלול, סיכום ומשימות, עם AI.',
      },
    },
  },
};
