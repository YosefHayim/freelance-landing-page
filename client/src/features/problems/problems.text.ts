import type { Language } from '../language/savedLanguage';

type ProblemText = {
  title: string;
  subtitle: string;
  fix: string;
};

type ProblemsText = {
  heading: string;
  mutedHeading: string;
  tablistLabel: string;
  fixLabel: string;
  problems: ProblemText[];
};

export const problemsText: Record<Language, ProblemsText> = {
  en: {
    heading: 'Heard these lines before?',
    mutedHeading: "Here's how you stop hearing them",
    tablistLabel: 'Common problems',
    fixLabel: 'The fix:',
    problems: [
      {
        title: '"It works on my laptop, I swear."',
        subtitle: "Customers still can't buy it",
        fix: "Until a stranger can open it, sign up and pay, it's a demo, not a product. So the missing part gets closed: domain, sign-in, payments, backups, alerts, and the App Store for an app. Then it goes live.",
      },
      {
        title: '"Back to you tomorrow." That was May.',
        subtitle: 'Half-done code, zero docs',
        fix: "They're not calling back, and that's fine. The code gets picked up as it is, no judgment, and the work goes on from where it stalled. What you paid for doesn't go in the bin.",
      },
      {
        title: '"AI wrote it. I just hit enter."',
        subtitle: 'Now nobody wants to touch it',
        fix: "AI is a fast junior with no memory. It runs, but what about a hundred users at once? You get a plain list: what's fine, what's wide open, what breaks first. The risky parts get closed and tested. What works stays.",
      },
      {
        title: '"It\'s 90% done." Since March.',
        subtitle: 'The date moves, so does the budget',
        fix: 'Stuck at 90% because nobody pinned down what "done" means. So it gets pinned down in writing: what\'s in, what waits, and the date. Every week you open a link and watch it move. No more "just a few more days".',
      },
      {
        title: '"Why does nobody finish checkout?"',
        subtitle: 'The page takes 8 seconds to load',
        fix: "Nobody waits 8 seconds. Measure first, touch second: it's usually heavy images or slow database calls. What hurts most gets fixed first. The goal: under a second, and a customer who reaches checkout.",
      },
      {
        title: '"Wait, which spreadsheet is the real one?"',
        subtitle: 'Five tools, all copy-paste',
        fix: 'The tools you already pay for get connected, so the CRM, sheets, shop and invoices stop living in separate worlds. An order goes in once and shows up everywhere it should. You stop being the copy-paste in between.',
      },
      {
        title: '"I just need a tech co-founder."',
        subtitle: 'The post still has 0 replies',
        fix: 'Stop waiting for a reply to that post. You get an engineer who is in it with you: per project, for equity, or a mix that feels fair to both sides. You bring the idea and the customers. The code is no longer your problem.',
      },
      {
        title: '"Can someone please automate this?"',
        subtitle: 'Your team types it all by hand',
        fix: 'Reports, invoices, listings, status updates. Done the same way every day? A script finishes it before your first coffee. Something off? You get a message. Your team gets their afternoons back, and their sanity.',
      },
    ],
  },
  he: {
    heading: 'מכירים את המשפטים האלה?',
    mutedHeading: 'ככה מפסיקים לשמוע אותם',
    tablistLabel: 'בעיות נפוצות',
    fixLabel: 'הפתרון:',
    problems: [
      {
        title: '"אצלי במחשב זה עובד, נשבע."',
        subtitle: 'אבל לקוחות עדיין לא יכולים לקנות',
        fix: 'תכלס, עד שמישהו זר לא יכול להיכנס, להירשם ולשלם, יש לכם דמו ולא מוצר. אז סוגרים את מה שחסר: דומיין, התחברות, סליקה, גיבויים והתראות, ואם זו אפליקציה גם את ה-App Store. ויאללה, לאוויר.',
      },
      {
        title: '"אחזור אליכם מחר." זה היה במאי.',
        subtitle: 'קוד חצי גמור, אפס תיעוד',
        fix: 'הוא כבר לא יחזור, וזה בסדר. נכנסים לקוד כמו שהוא, בלי לשפוט, עושים סדר בבלגן וממשיכים מאיפה שזה נתקע. מה ששילמתם עליו לא הולך לפח.',
      },
      {
        title: '"ה-AI כתב, אני רק לחצתי אנטר."',
        subtitle: 'ועכשיו אף אחד לא מעז לגעת בזה',
        fix: "AI זה ג'וניור זריז בלי זיכרון. אחלה שזה רץ, השאלה מה קורה כשנכנסים מאה אנשים ביחד. מקבלים רשימה בעברית של בני אדם: מה סבבה, מה פרוץ, ומה יקרוס ראשון. קודם סוגרים את מה שמסוכן ומכסים בטסטים. מה שעובד, לא נוגעים.",
      },
      {
        title: '"זה 90% מוכן." מאז מרץ.',
        subtitle: 'התאריך זז, והתקציב איתו',
        fix: 'מוצר נתקע ב-10% האחרונים כי אף אחד לא סגר מה זה "מוכן". אז סוגרים, שחור על גבי לבן: מה נכנס עכשיו, מה מחכה לגרסה הבאה, ומתי עולים. כל שבוע פותחים לינק ורואים את זה זז. נגמר הסיפור של "עוד כמה ימים וזהו".',
      },
      {
        title: '"למה אף אחד לא מסיים לקנות?"',
        subtitle: 'הדף נטען 8 שניות',
        fix: 'אף אחד לא מחכה 8 שניות, גם אתם לא. קודם מודדים, אחר כך נוגעים: בדרך כלל זה תמונות כבדות או שאילתות איטיות. מתקנים קודם את מה שהכי כואב, ואז את הבא בתור. המטרה: פחות משנייה, ולקוח שמגיע עד הקופה.',
      },
      {
        title: '"רגע, איזה אקסל הוא הנכון?"',
        subtitle: 'חמישה כלים, והכול בהעתק-הדבק',
        fix: 'מחברים את הכלים שאתם כבר משלמים עליהם, וה-CRM, האקסלים, החנות והחשבוניות מפסיקים לחיות כל אחד בסרט שלו. הזמנה נכנסת פעם אחת ומופיעה בכל מקום שצריך. חלאס להיות ההעתק-הדבק באמצע.',
      },
      {
        title: '"רק צריך שותף טכני."',
        subtitle: 'והפוסט עדיין על 0 תגובות',
        fix: 'די לחכות שמישהו יגיב לפוסט. מקבלים מהנדס שנכנס לזה איתכם: לפי פרויקט, תמורת אקוויטי, או שילוב שמרגיש הוגן לשני הצדדים. אתם מביאים את הרעיון ואת הלקוחות. הקוד כבר לא הבעיה שלכם.',
      },
      {
        title: '"מישהו יכול כבר לעשות לזה אוטומציה?"',
        subtitle: 'הצוות מקליד הכול ידנית',
        fix: 'דוחות, חשבוניות, העלאת מוצרים, עדכוני סטטוס. כל מה שעושים אותו דבר כל יום, סקריפט גומר עוד לפני הקפה הראשון. משהו נראה מוזר? מקבלים הודעה. והצוות מקבל בחזרה את אחר הצהריים, ואת השפיות.',
      },
    ],
  },
};
