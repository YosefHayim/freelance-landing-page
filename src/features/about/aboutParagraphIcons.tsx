import type { ReactNode } from 'react';
import type { AboutParagraphName } from './about.text';

export const aboutParagraphIcons: Record<AboutParagraphName, ReactNode> = {
  whoFor: (
    <path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.7.5 1.1 1.3 1.1 2.1v.1h5v-.1c0-.8.4-1.6 1.1-2.1A6 6 0 0 0 12 3Z" />
  ),
  aiReview: (
    <>
      <path d="M12 3 5 6v5c0 4.4 3 8.3 7 10 4-1.7 7-5.6 7-10V6Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  yourCode: <path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14" />,
  oneContact: <path d="M4 5h16v11H9l-5 4Z" />,
  startSmall: (
    <path d="M12 21v-9M12 12c0-4 3-6.5 7-6.5 0 4-3 6.5-7 6.5ZM12 14.5c0-3-2.4-5-6-5 0 3 2.4 5 6 5Z" />
  ),
};
