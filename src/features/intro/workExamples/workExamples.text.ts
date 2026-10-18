import type { Language } from '../../language/language';

type WorkExamplesText = {
  website: {
    address: string;
    received: string;
    monthlyReport: string;
  };
  app: {
    onDeviceAi: string;
  };
  automation: {
    website: string;
    telegram: string;
    sent: string;
  };
  aiTool: {
    question: string;
    answer: string;
  };
  extension: {
    address: string;
    promptQueue: string;
    runningAlone: string;
  };
};

export const workExamplesText: Record<Language, WorkExamplesText> = {
  en: {
    website: {
      address: 'donations.example.org',
      received: 'Received',
      monthlyReport: 'Monthly report',
    },
    app: { onDeviceAi: 'On-device AI' },
    automation: { website: 'Website', telegram: 'Telegram', sent: 'Sent' },
    aiTool: {
      question: 'I have a story nobody has published yet. Who should hear it?',
      answer: 'I found three journalists who cover this topic.',
    },
    extension: {
      address: 'chatgpt.com',
      promptQueue: 'Queue: 12 prompts',
      runningAlone: 'Running on its own',
    },
  },
  he: {
    website: {
      address: 'donations.example.org',
      received: 'נקלט',
      monthlyReport: 'דוח חודשי',
    },
    app: { onDeviceAi: 'AI על המכשיר' },
    automation: { website: 'אתר', telegram: 'טלגרם', sent: 'נשלח' },
    aiTool: {
      question: 'יש לי סיפור שעוד לא פורסם. למי כדאי לספר?',
      answer: 'מצאתי שלושה עיתונאים שכותבים על הנושא.',
    },
    extension: {
      address: 'chatgpt.com',
      promptQueue: 'תור: 12 פרומפטים',
      runningAlone: 'רץ לבד',
    },
  },
};
