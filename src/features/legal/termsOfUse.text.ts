import type { Language } from '../language/language';
import type { LegalDocumentText } from './legalDocumentText';

export const termsOfUseText: Record<Language, LegalDocumentText> = {
  en: {
    title: 'Terms of Use | Joseph Tech Solutions',
    description: 'The rules for using the Joseph Tech Solutions site and project form.',
    heading: 'Terms of Use',
    intro:
      'These terms cover this site and our project form. Both are run by Joseph Tech Solutions, the software business of Yosef Hayim Sabag in Israel. By using them, you agree to these terms.',
    topics: [
      {
        heading: 'What the sites are for',
        content: [
          {
            paragraph:
              'The sites show our work and let you describe your project. Prices the form shows are rough estimates, not offers.',
          },
        ],
      },
      {
        heading: 'Proposals and work',
        content: [
          {
            paragraph:
              'A proposal we send is for that project only. Work starts only after both sides agree in writing on the scope, price and timeline, and that agreement then governs the work.',
          },
        ],
      },
      {
        heading: 'Using the sites',
        content: [
          {
            paragraph:
              'Use the sites only for real requests. Do not send spam, use bots or scripts, try to break into or overload the sites, or send someone else’s details without their permission.',
          },
        ],
      },
      {
        heading: 'What you send us',
        content: [
          {
            paragraph:
              'Send only what you have the right to share. Do not send passwords, card numbers or other secrets through the form or the chat. Your ideas and files stay yours. We use them to reply to you, prepare a proposal and improve our service, as the Privacy Policy explains.',
          },
        ],
      },
      {
        heading: 'The chat assistant',
        content: [
          {
            paragraph:
              'The chat window on this site is an AI assistant. Its answers can be wrong, and they are not a promise or an offer. Check anything important with us directly.',
          },
        ],
      },
      {
        heading: 'Our content',
        content: [
          {
            paragraph:
              'The text, design and code of the sites belong to us. Do not copy them without our permission.',
          },
        ],
      },
      {
        heading: 'Links to other services',
        content: [
          {
            paragraph:
              'The sites link to WhatsApp, LinkedIn, GitHub and other services. They have their own terms, and we are not responsible for them.',
          },
        ],
      },
      {
        heading: 'No guarantees',
        content: [
          {
            paragraph:
              'We work to keep the sites accurate and online, but we provide them as they are, without guarantees. As far as the law allows, we are not liable for damage caused by using them.',
          },
        ],
      },
      {
        heading: 'Law and courts',
        content: [
          {
            paragraph:
              'The laws of Israel apply to these terms. Any dispute goes to the competent courts in Israel.',
          },
        ],
      },
      {
        heading: 'Changes',
        content: [
          {
            paragraph:
              'We may update these terms. The date at the top shows when they last changed.',
          },
        ],
      },
    ],
  },
  he: {
    title: 'תנאי שימוש | Joseph Tech Solutions',
    description: 'הכללים לשימוש באתר ובטופס הפרויקט של Joseph Tech Solutions.',
    heading: 'תנאי שימוש',
    intro:
      'התנאים האלה חלים על האתר הזה ועל טופס הפרויקט שלנו. את שניהם מפעיל Joseph Tech Solutions, העסק של יוסף חיים סבג לפיתוח תוכנה, בישראל. כשאתם משתמשים בהם, אתם מסכימים לתנאים האלה.',
    topics: [
      {
        heading: 'בשביל מה האתרים',
        content: [
          {
            paragraph:
              'האתרים מראים את העבודה שלנו ומאפשרים לכם לתאר את הפרויקט שלכם. המחירים שהטופס מראה הם הערכה כללית, לא הצעה.',
          },
        ],
      },
      {
        heading: 'הצעות מחיר ועבודה',
        content: [
          {
            paragraph:
              'הצעת מחיר שאנחנו שולחים מתייחסת רק לאותו פרויקט. העבודה מתחילה רק אחרי ששני הצדדים מסכימים בכתב על ההיקף, המחיר ולוח הזמנים, ומאותו רגע ההסכם הזה קובע.',
          },
        ],
      },
      {
        heading: 'שימוש באתרים',
        content: [
          {
            paragraph:
              'השתמשו באתרים רק לפניות אמיתיות. אל תשלחו ספאם, אל תשתמשו בבוטים או בסקריפטים, אל תנסו לפרוץ או להעמיס על האתרים, ואל תשלחו פרטים של מישהו אחר בלי הרשות שלו.',
          },
        ],
      },
      {
        heading: 'מה שאתם שולחים לנו',
        content: [
          {
            paragraph:
              'שלחו רק מה שמותר לכם לשתף. אל תשלחו סיסמאות, מספרי כרטיס אשראי או מידע סודי אחר דרך הטופס או הצ׳אט. הרעיונות והקבצים שלכם נשארים שלכם. אנחנו משתמשים בהם כדי לחזור אליכם, להכין הצעת מחיר ולשפר את השירות, כמו שמוסבר במדיניות הפרטיות.',
          },
        ],
      },
      {
        heading: 'עוזר הצ׳אט',
        content: [
          {
            paragraph:
              'הצ׳אט באתר הזה הוא עוזר AI. התשובות שלו יכולות להיות שגויות, והן לא הבטחה או הצעה. כל דבר חשוב, בדקו איתנו ישירות.',
          },
        ],
      },
      {
        heading: 'התוכן שלנו',
        content: [
          {
            paragraph: 'הטקסטים, העיצוב והקוד של האתרים שייכים לנו. אל תעתיקו אותם בלי רשות.',
          },
        ],
      },
      {
        heading: 'קישורים לשירותים אחרים',
        content: [
          {
            paragraph:
              'באתרים יש קישורים לוואטסאפ, ללינקדאין, לגיטהאב ולשירותים אחרים. יש להם תנאים משלהם, ואנחנו לא אחראים להם.',
          },
        ],
      },
      {
        heading: 'בלי התחייבות',
        content: [
          {
            paragraph:
              'אנחנו משתדלים שהאתרים יהיו מדויקים וזמינים, אבל הם ניתנים כמו שהם, בלי התחייבות. ככל שהחוק מאפשר, אנחנו לא אחראים לנזק שנגרם מהשימוש בהם.',
          },
        ],
      },
      {
        heading: 'חוק ובתי משפט',
        content: [
          {
            paragraph:
              'על התנאים האלה חלים חוקי מדינת ישראל. כל מחלוקת תתברר בבתי המשפט המוסמכים בישראל.',
          },
        ],
      },
      {
        heading: 'שינויים',
        content: [
          {
            paragraph: 'אנחנו יכולים לעדכן את התנאים. התאריך שלמעלה מראה מתי הם השתנו לאחרונה.',
          },
        ],
      },
    ],
  },
};
