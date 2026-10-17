import type { Language } from '../language/language';
import type { LegalDocumentText } from './legalDocumentText';

export const privacyPolicyText: Record<Language, LegalDocumentText> = {
  en: {
    title: 'Privacy Policy | Joseph Tech Solutions',
    description:
      'What Joseph Tech Solutions collects on its site and project form, why, and who else gets it.',
    heading: 'Privacy Policy',
    intro:
      'Joseph Tech Solutions is the software business of Yosef Hayim Sabag in Israel. This policy covers this site and our project form. It explains what we collect, why, and who else gets it.',
    topics: [
      {
        heading: 'What you give us',
        content: [
          { paragraph: 'When you fill in the project form, we get:' },
          {
            points: [
              'Your email and phone number.',
              'Your answers: the options you pick, any text you type or dictate, links to sites you like, and the price estimate the form shows you.',
              'How you used the form: time on each question, answers you changed, options you hovered, tips you saw, language switches, whether you used voice input, your device and connection type, your time zone and how many times you visited.',
              'If you leave before sending, your answers so far, without your email or phone, are saved and emailed to us.',
            ],
          },
          {
            paragraph:
              'When you message us on WhatsApp, call, email us or write in the chat window on this site, we get what you send.',
          },
          {
            paragraph:
              'Like any website, our servers see your IP address. The form uses it to block repeated sends and does not store it.',
          },
        ],
      },
      {
        heading: 'Analytics and ads',
        content: [
          {
            paragraph:
              'Both sites use the Meta Pixel and Google Tag Manager with Google Analytics. They record page views, clicks, hovers and time on the page. On this site they also record how far you scroll, the sections you view, and when you select or copy text, but not the text itself. A tap on a WhatsApp button counts as a Contact. On the project form they also record when you start, the options you pick (not the text you type), when you leave, and a Lead when you send, with the type of product and a price estimate.',
          },
          {
            paragraph:
              'These events never include your email or phone. Meta and Google do get your IP address and browser details, and may set cookies such as _fbp and _ga. Some events also reach Meta through its Conversions API Gateway, a server that passes them on. Meta and Google may link this to your accounts with them and use it under their own policies.',
          },
          {
            paragraph:
              'We use this to see which pages and ads work, and to show our ads to people who may need our help.',
          },
        ],
      },
      {
        heading: 'Cookies and browser storage',
        content: [
          {
            points: [
              'jts-language remembers your language for one year.',
              'The project form keeps your unsent answers and a visit id in your browser storage, so a reload loses nothing. Both are removed after you send.',
              'Meta and Google cookies, as described above.',
            ],
          },
          {
            paragraph:
              'You can block or delete cookies in your browser settings. The sites still work without them.',
          },
        ],
      },
      {
        heading: 'Why we use it',
        content: [
          {
            points: [
              'To send you a copy of your answers, reply to you and prepare a proposal.',
              'To improve the sites and the form.',
              'To measure our ads and choose who sees them.',
              'To stop spam and abuse.',
            ],
          },
          { paragraph: 'We do not sell your information.' },
        ],
      },
      {
        heading: 'Who else gets it',
        content: [
          {
            paragraph:
              'We use these services to run the sites. Each one handles your information under its own terms:',
          },
          {
            points: [
              'Cloudflare hosts both sites, stores the form answers, sends our emails, and checks the form for bots with Turnstile, which sees your IP address.',
              'Google: our inbox is Gmail, so emails with your answers and messages arrive there. Google also runs Google Tag Manager and Google Analytics.',
              'Meta runs the Meta Pixel and WhatsApp.',
              'Replybase runs the chat window on this site. It keeps the chat and uses OpenAI to write the answers, so what you type in the chat reaches OpenAI too.',
              'Voice input on the form uses the speech service built into your browser. The company behind your browser, such as Google or Apple, may process the audio. We get only the text.',
            ],
          },
          {
            paragraph:
              'Some of these services process information outside Israel, for example in the United States.',
          },
        ],
      },
      {
        heading: 'How long we keep it',
        content: [
          {
            paragraph:
              'We keep form answers, proposals and messages while we need them to work with you, or as long as the law requires. Ask us and we will delete your information, unless the law requires us to keep it.',
          },
        ],
      },
      {
        heading: 'Your rights',
        content: [
          {
            paragraph:
              'You can ask to see the information we hold about you, and to correct or delete it. Write to us using the details below. You can also block cookies in your browser and change your ad settings in your Meta and Google accounts.',
          },
          {
            paragraph:
              "Israel's laws apply to this policy, including the Protection of Privacy Law, 1981.",
          },
        ],
      },
      {
        heading: 'Changes',
        content: [
          {
            paragraph:
              'If we change this policy, we will update this page and the date at the top.',
          },
        ],
      },
    ],
  },
  he: {
    title: 'מדיניות פרטיות | Joseph Tech Solutions',
    description: 'מה Joseph Tech Solutions אוספת באתר ובטופס הפרויקט, למה, ומי עוד מקבל את המידע.',
    heading: 'מדיניות פרטיות',
    intro:
      'Joseph Tech Solutions הוא העסק של יוסף חיים סבג לפיתוח תוכנה, בישראל. המדיניות הזאת חלה על האתר הזה ועל טופס הפרויקט שלנו. כאן תמצאו מה אנחנו אוספים, למה, ומי עוד מקבל את המידע.',
    topics: [
      {
        heading: 'מה אתם שולחים לנו',
        content: [
          { paragraph: 'כשאתם ממלאים את טופס הפרויקט, אנחנו מקבלים:' },
          {
            points: [
              'את האימייל ומספר הטלפון שלכם.',
              'את התשובות שלכם: האפשרויות שבחרתם, טקסט שכתבתם או הקלטתם, קישורים לאתרים שאהבתם והערכת המחיר שהטופס הראה לכם.',
              'איך השתמשתם בטופס: כמה זמן הייתם בכל שאלה, תשובות ששיניתם, אפשרויות שעברתם עליהן עם העכבר, טיפים שראיתם, החלפות שפה, אם השתמשתם בהקלטה קולית, סוג המכשיר והחיבור, אזור הזמן וכמה פעמים נכנסתם.',
              'אם יצאתם לפני השליחה, התשובות עד אותו רגע, בלי האימייל והטלפון, נשמרות ונשלחות אלינו במייל.',
            ],
          },
          {
            paragraph:
              'כשאתם שולחים לנו הודעה בוואטסאפ, מתקשרים, שולחים מייל או כותבים בצ׳אט באתר הזה, אנחנו מקבלים את מה שאתם שולחים.',
          },
          {
            paragraph:
              'כמו בכל אתר, השרתים שלנו רואים את כתובת ה-IP שלכם. הטופס משתמש בה כדי לחסום שליחות חוזרות, ולא שומר אותה.',
          },
        ],
      },
      {
        heading: 'מדידה ופרסום',
        content: [
          {
            paragraph:
              'בשני האתרים פועלים Meta Pixel ו-Google Tag Manager עם Google Analytics. הם רושמים צפיות בעמוד, לחיצות, מעבר עם העכבר וכמה זמן הייתם בעמוד. באתר הזה הם רושמים גם עד כמה גללתם, אילו חלקים ראיתם, ומתי סימנתם או העתקתם טקסט, אבל לא את הטקסט עצמו. לחיצה על כפתור וואטסאפ נספרת כפנייה (Contact). בטופס הפרויקט הם רושמים גם מתי התחלתם, אילו אפשרויות בחרתם (בלי הטקסט שכתבתם), מתי יצאתם, ופנייה (Lead) כשאתם שולחים, עם סוג המוצר והערכת מחיר.',
          },
          {
            paragraph:
              'האירועים האלה אף פעם לא כוללים את האימייל או הטלפון שלכם. Meta ו-Google כן מקבלות את כתובת ה-IP ופרטי הדפדפן, ויכולות לשמור עוגיות כמו _fbp ו-_ga. חלק מהאירועים מגיעים ל-Meta גם דרך Conversions API Gateway, שרת שמעביר אותם הלאה. Meta ו-Google יכולות לקשר את המידע לחשבונות שלכם אצלן ולהשתמש בו לפי המדיניות שלהן.',
          },
          {
            paragraph:
              'אנחנו משתמשים בזה כדי לראות אילו עמודים ומודעות עובדים, וכדי להראות את המודעות שלנו לאנשים שאולי צריכים את העזרה שלנו.',
          },
        ],
      },
      {
        heading: 'עוגיות ואחסון בדפדפן',
        content: [
          {
            points: [
              'jts-language זוכרת את השפה שבחרתם, למשך שנה.',
              'טופס הפרויקט שומר בדפדפן את התשובות שעוד לא שלחתם ומזהה ביקור, כדי שרענון לא ימחק כלום. שניהם נמחקים אחרי השליחה.',
              'העוגיות של Meta ו-Google, כמו שהסברנו למעלה.',
            ],
          },
          {
            paragraph: 'אפשר לחסום או למחוק עוגיות בהגדרות הדפדפן. האתרים ימשיכו לעבוד גם בלעדיהן.',
          },
        ],
      },
      {
        heading: 'למה אנחנו משתמשים במידע',
        content: [
          {
            points: [
              'כדי לשלוח לכם עותק של התשובות, לחזור אליכם ולהכין הצעת מחיר.',
              'כדי לשפר את האתרים ואת הטופס.',
              'כדי למדוד את המודעות שלנו ולבחור למי להראות אותן.',
              'כדי לעצור ספאם ושימוש לרעה.',
            ],
          },
          { paragraph: 'אנחנו לא מוכרים את המידע שלכם.' },
        ],
      },
      {
        heading: 'מי עוד מקבל את המידע',
        content: [
          {
            paragraph:
              'אנחנו משתמשים בשירותים האלה כדי להפעיל את האתרים. כל אחד מהם מטפל במידע לפי התנאים שלו:',
          },
          {
            points: [
              'Cloudflare מארחת את שני האתרים, שומרת את התשובות מהטופס, שולחת את המיילים שלנו ובודקת עם Turnstile שהטופס לא נשלח מבוט. Turnstile רואה את כתובת ה-IP שלכם.',
              'Google: תיבת המייל שלנו נמצאת ב-Gmail, אז מיילים עם התשובות וההודעות שלכם מגיעים לשם. Google מפעילה גם את Google Tag Manager ואת Google Analytics.',
              'Meta מפעילה את Meta Pixel ואת וואטסאפ.',
              'Replybase מפעילה את הצ׳אט באתר הזה. היא שומרת את השיחה ומשתמשת ב-OpenAI כדי לכתוב את התשובות, אז מה שאתם כותבים בצ׳אט מגיע גם ל-OpenAI.',
              'הקלטה קולית בטופס עובדת דרך שירות הדיבור של הדפדפן. החברה שמאחורי הדפדפן, למשל Google או Apple, יכולה לעבד את ההקלטה. אנחנו מקבלים רק את הטקסט.',
            ],
          },
          {
            paragraph: 'חלק מהשירותים האלה מעבדים מידע מחוץ לישראל, למשל בארצות הברית.',
          },
        ],
      },
      {
        heading: 'כמה זמן אנחנו שומרים את המידע',
        content: [
          {
            paragraph:
              'אנחנו שומרים תשובות מהטופס, הצעות מחיר והודעות כל עוד אנחנו צריכים אותן כדי לעבוד איתכם, או כמה זמן שהחוק מחייב. בקשו מאיתנו ונמחק את המידע שלכם, אלא אם החוק מחייב אותנו לשמור אותו.',
          },
        ],
      },
      {
        heading: 'הזכויות שלכם',
        content: [
          {
            paragraph:
              'אתם יכולים לבקש לראות את המידע שיש לנו עליכם, לתקן אותו או למחוק אותו. פנו אלינו בפרטים שלמטה. אפשר גם לחסום עוגיות בדפדפן ולשנות את הגדרות הפרסום בחשבונות Meta ו-Google שלכם.',
          },
          {
            paragraph:
              'על המדיניות הזאת חלים חוקי מדינת ישראל, כולל חוק הגנת הפרטיות, התשמ״א-1981.',
          },
        ],
      },
      {
        heading: 'שינויים',
        content: [{ paragraph: 'אם נשנה את המדיניות, נעדכן את העמוד הזה ואת התאריך שלמעלה.' }],
      },
    ],
  },
};
