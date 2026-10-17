import type { LegalTopicText } from './legalDocumentText';

interface LegalTopicProps {
  topic: LegalTopicText;
}

export const LegalTopic = ({ topic }: LegalTopicProps) => (
  <section className="legal-topic">
    <h2>{topic.heading}</h2>
    {topic.content.map((block) => {
      if ('points' in block) {
        return (
          <ul key={block.points.join()}>
            {block.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        );
      }
      return <p key={block.paragraph}>{block.paragraph}</p>;
    })}
  </section>
);
