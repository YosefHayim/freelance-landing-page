import type { Language } from '../language/language';

export const questionNames = [
  'price',
  'timeline',
  'equity',
  'takeOver',
  'pastProjects',
  'afterLaunch',
] as const;

type QuestionName = (typeof questionNames)[number];

type QuestionText = {
  question: string;
  answer: string;
};

type QuestionsText = {
  heading: string;
  questions: Record<QuestionName, QuestionText>;
};

export const questionsText: Record<Language, QuestionsText> = {
  en: {
    heading: 'What people always ask me',
    questions: {
      price: {
        question: 'How much does it cost?',
        answer:
          "It changes from project to project. Like a renovation: swapping a tap isn't moving walls. After a short chat you get a written offer, with every part priced on its own.",
      },
      timeline: {
        question: 'How long does it take?',
        answer:
          'Depends on what gets built, and what goes into the first version. The date goes into the offer, in writing. And if something moves, you hear it from me first.',
      },
      equity: {
        question: 'Do you take equity?',
        answer:
          'That depends on the project too. You can pay for the work, and the company stays fully yours. And if a partnership makes more sense, we talk about it openly.',
      },
      takeOver: {
        question: 'I already started with another developer, or with AI. Can we go on from there?',
        answer:
          "Depends on what's there. We go through it together, and I tell you honestly what's worth keeping and what isn't.",
      },
      pastProjects: {
        question: 'Can I see past projects?',
        answer:
          "Client projects stay between me and them, and your idea will stay that way too. On a call I'll show you things I've built, and you'll quickly see how I work.",
      },
      afterLaunch: {
        question: 'What happens after launch?',
        answer:
          'Whatever suits you. Take the code and carry on yourselves, sign up for monthly maintenance, or keep building the next version with me.',
      },
    },
  },
  he: {
    heading: 'מה שתמיד שואלים אותי',
    questions: {
      price: {
        question: 'כמה זה עולה?',
        answer:
          'משתנה מפרויקט לפרויקט. כמו בשיפוץ: להחליף ברז זה לא להזיז קירות. אחרי שיחה קצרה מקבלים הצעה בכתב, וכל חלק מתומחר בנפרד.',
      },
      timeline: {
        question: 'כמה זמן זה לוקח?',
        answer:
          'תלוי מה בונים, ומה נכנס לגרסה הראשונה. התאריך נכנס להצעה, בכתב. ואם משהו זז, אתם שומעים את זה ממני ראשונים.',
      },
      equity: {
        question: 'אתה לוקח אחוזים?',
        answer:
          'גם זה תלוי בפרויקט. אפשר לשלם על העבודה, והחברה נשארת כולה שלכם. ואם שותפות הגיונית יותר, מדברים על זה בפתיחות.',
      },
      takeOver: {
        question: 'כבר התחלתי עם מתכנת אחר, או עם AI. אפשר להמשיך משם?',
        answer: 'תלוי מה יש. עוברים על זה יחד, ואני אומר לכם בכנות מה שווה לשמור ומה לא.',
      },
      pastProjects: {
        question: 'אפשר לראות פרויקטים קודמים?',
        answer:
          'פרויקטים של לקוחות נשארים ביני לבינם, וגם הרעיון שלכם יישאר ככה. בשיחה אראה לכם דברים שבניתי, ותבינו מהר איך אני עובד.',
      },
      afterLaunch: {
        question: 'מה קורה אחרי ההשקה?',
        answer:
          'מה שמתאים לכם. אפשר לקחת את הקוד ולהמשיך לבד, לסגור תחזוקה חודשית, או להמשיך לבנות איתי את הגרסה הבאה.',
      },
    },
  },
};
