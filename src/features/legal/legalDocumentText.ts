export type LegalBlockText = { paragraph: string } | { points: string[] };

export type LegalTopicText = {
  heading: string;
  content: LegalBlockText[];
};

export type LegalDocumentText = {
  title: string;
  description: string;
  heading: string;
  intro: string;
  topics: LegalTopicText[];
};
