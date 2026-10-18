import './questions.css';
import type { Language } from '../language/language';
import { questionNames, questionsText } from './questions.text';

interface QuestionsSectionProps {
  language: Language;
}

export const QuestionsSection = ({ language }: QuestionsSectionProps) => {
  const text = questionsText[language];

  return (
    <section className="stacking-section" id="questions" aria-labelledby="questions-heading">
      <div className="section-content">
        <h2 id="questions-heading" className="display-heading questions-heading reveal-on-scroll">
          {text.heading}
        </h2>
        <dl className="question-list">
          {questionNames.map((questionName) => (
            <div key={questionName} className="question reveal-on-scroll">
              <dt className="question-title">{text.questions[questionName].question}</dt>
              <dd className="question-answer">{text.questions[questionName].answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};
