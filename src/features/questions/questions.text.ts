import type { Language } from '../language/language';

export const questionNames = [
  'freeCall',
  'price',
  'timeline',
  'takeOver',
  'tests',
  'privacy',
  'equity',
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
      freeCall: {
        question: "Is the call really free? What's the catch?",
        answer:
          "No catch. Ten minutes, no commitment. We work out together what you need, and you leave with a clear direction, even if we don't end up working together.",
      },
      price: {
        question: 'How much does it cost?',
        answer:
          "It changes from project to project. Like a renovation: swapping a tap isn't moving walls. Every part is priced on its own, and you choose what gets built now and what comes later.",
      },
      timeline: {
        question: 'How long does it take?',
        answer:
          'Depends on what gets built, and what goes into the first version. The date goes into the offer, in writing. And if something moves, you hear it from me first.',
      },
      takeOver: {
        question:
          'I already started with another developer, or with a tool like Lovable. Can we go on from there?',
        answer:
          "Yes. However it was built, in the end there's code. We go through it together, and I tell you honestly what's worth keeping and what to rebuild.",
      },
      tests: {
        question: 'What does it mean that code "passes tests"?',
        answer:
          "That there's extra code that checks the app does what it should. When the tests run on their own with every update, that's called CI/CD. Sounds like gibberish? That's completely fine. On the call I'll explain which of it you need.",
      },
      privacy: {
        question: 'Will my idea stay between us?',
        answer: "Yes. What you tell me stays between us, and so do other clients' projects.",
      },
      equity: {
        question: 'Do you take equity?',
        answer:
          'That depends on the project too. You can pay for the work, and the company stays fully yours. And if a partnership makes more sense, we talk about it openly.',
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
      freeCall: {
        question: 'השיחה באמת בחינם? מה המלכוד?',
        answer:
          'אין מלכוד. עשר דקות, בלי התחייבות. נבין ביחד מה אתם צריכים, ותצאו עם כיוון ברור, גם אם בסוף לא נעבוד ביחד.',
      },
      price: {
        question: 'כמה זה עולה?',
        answer:
          'משתנה מפרויקט לפרויקט. כמו בשיפוץ: להחליף ברז זה לא להזיז קירות. כל חלק מתומחר בנפרד, ואתם בוחרים מה בונים עכשיו ומה אחר כך.',
      },
      timeline: {
        question: 'כמה זמן זה לוקח?',
        answer:
          'תלוי מה בונים, ומה נכנס לגרסה הראשונה. התאריך נכנס להצעה, בכתב. ואם משהו זז, אתם שומעים את זה ממני ראשונים.',
      },
      takeOver: {
        question: 'כבר התחלתי עם מתכנת אחר, או בכלי כמו Lovable. אפשר להמשיך משם?',
        answer:
          'כן. לא משנה איך זה נבנה, בסוף יש קוד. עוברים עליו יחד, ואני אומר לכם בכנות מה שווה לשמור ומה לבנות מחדש.',
      },
      tests: {
        question: 'מה זה אומר שקוד "עובר בדיקות"?',
        answer:
          'שיש קוד נוסף שבודק שהאפליקציה עושה מה שהיא אמורה. כשהבדיקות רצות לבד בכל עדכון, קוראים לזה CI/CD. נשמע כמו ג׳יבריש? זה בסדר גמור. בשיחה אסביר מה מזה אתם צריכים.',
      },
      privacy: {
        question: 'הרעיון שלי יישאר ביננו?',
        answer: 'כן. מה שאתם מספרים לי נשאר ביני לביניכם, וכך גם הפרויקטים של לקוחות אחרים.',
      },
      equity: {
        question: 'אתה לוקח אחוזים?',
        answer:
          'גם זה תלוי בפרויקט. אפשר לשלם על העבודה, והחברה נשארת כולה שלכם. ואם שותפות הגיונית יותר, מדברים על זה בפתיחות.',
      },
      afterLaunch: {
        question: 'מה קורה אחרי ההשקה?',
        answer:
          'מה שמתאים לכם. אפשר לקחת את הקוד ולהמשיך לבד, לסגור תחזוקה חודשית, או להמשיך לבנות איתי את הגרסה הבאה.',
      },
    },
  },
};
