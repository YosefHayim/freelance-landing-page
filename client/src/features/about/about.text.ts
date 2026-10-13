import type { Language } from '../language/savedLanguage';
import type { IcebergLayerName } from './icebergLayers';

type AboutText = {
  heading: string;
  mutedHeadingLines: string[];
  paragraphs: string[];
  icebergLabel: string;
  icebergCaption: string;
  icebergCaptionBold: string;
  demoLabel: string;
  visibleShare: string;
  hiddenShare: string;
  layers: Record<IcebergLayerName, string>;
};

export const aboutText: Record<Language, AboutText> = {
  en: {
    heading: "You don't need another developer",
    mutedHeadingLines: ['You need someone', 'who finishes'],
    paragraphs: [
      'Notice what the lines above have in common? "It\'s 90% done." "Which spreadsheet is the real one?" "AI wrote it, I just hit enter." In every one of them somebody started, and nobody finished.',
      "And finishing isn't one more feature. It's a stranger who opens it, signs up and pays. It's a report waiting in the morning that nobody typed. It's an AI that keeps working when nobody is watching. It's a date in writing, not \"just a few more days\". It's a link you open every week and an update every Friday, even when the week was a mess. It's a WhatsApp answered by the person writing the code. And it's a handover document at the end, so all of it is really yours.",
      "I've been exactly where you are: a customer waiting on a developer. Today I'm on the other side of the table, and here nobody waits. Now it's your turn. Only one question is left: what's stuck on your side?",
    ],
    icebergLabel: 'Iceberg: everyone sees the demo, I build the part under the water',
    icebergCaption: 'Everyone sees the demo.',
    icebergCaptionBold: 'I build the part underneath.',
    demoLabel: 'The demo',
    visibleShare: '10% people see',
    hiddenShare: '90% that keeps it running',
    layers: {
      safeSignIn: 'Sign-in that holds',
      payments: 'Payments that go through',
      organizedData: 'Data that makes sense',
      testedUpdates: 'Tested on every change',
      attackProtection: 'Locked against attacks',
      earlyAlerts: 'Alerts before complaints',
      automaticBackups: 'Backups that restore',
      readyToGrow: 'Room to grow',
    },
  },
  he: {
    heading: 'אתם לא צריכים עוד מתכנת',
    mutedHeadingLines: ['אתם צריכים מישהו', 'שסוגר עד הסוף'],
    paragraphs: [
      'שמתם לב מה משותף לכל המשפטים למעלה? "זה 90% מוכן". "איזה אקסל הוא הנכון?" "ה-AI כתב, אני רק לחצתי אנטר". בכולם מישהו התחיל, ואף אחד לא סגר.',
      'ולסגור זה לא עוד פיצ\'ר. זה לקוח זר שנכנס, נרשם ומשלם. זה דוח שמחכה בבוקר בלי שאף אחד הקליד אותו. זה AI שממשיך לעבוד גם כשאף אחד לא מסתכל. זה תאריך שסגור בכתב, לא "עוד כמה ימים וזהו". זה לינק שנפתח כל שבוע ועדכון כל שישי, גם כשהשבוע היה על הפנים. זה וואטסאפ שעונה בו מי שכותב את הקוד, בלי טלפון שבור. וזה מסמך חפיפה בסוף, שהכול יהיה שלכם באמת.',
      'פעם הייתי בדיוק במקום שלכם: לקוח שמחכה למתכנת. היום אני בצד השני של השולחן, ואצלי לא מחכים. עכשיו התור שלכם. נשארה רק שאלה אחת: מה תקוע אצלכם?',
    ],
    icebergLabel: 'קרחון: כולם רואים את הדמו, אני בונה את מה שמתחת למים',
    icebergCaption: 'כולם רואים את הדמו.',
    icebergCaptionBold: 'אני בונה את מה שמתחת.',
    demoLabel: 'הדמו',
    visibleShare: '10% שרואים',
    hiddenShare: '90% שמחזיקים את זה באוויר',
    layers: {
      safeSignIn: 'התחברות שמחזיקה',
      payments: 'תשלומים שעוברים',
      organizedData: 'נתונים שמסתדרים',
      testedUpdates: 'טסטים על כל שינוי',
      attackProtection: 'נעול מפני תקיפות',
      earlyAlerts: 'התראה לפני תלונה',
      automaticBackups: 'גיבויים שבאמת משחזרים',
      readyToGrow: 'מקום לגדול',
    },
  },
};
