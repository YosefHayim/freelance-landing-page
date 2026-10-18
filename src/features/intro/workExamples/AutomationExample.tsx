import type { WorkExampleProps } from './workExample';
import { workExamplesText } from './workExamples.text';

const websiteCells = [0, 1, 2, 3, 4, 5, 6, 7, 8];

export const AutomationExample = ({ language }: WorkExampleProps) => {
  const text = workExamplesText[language].automation;
  return (
    <div className="data-flow">
      <div className="data-flow-card">
        <span className="data-flow-title">{text.website}</span>
        <span className="data-flow-cells">
          {websiteCells.map((cell) => (
            <i key={cell} />
          ))}
        </span>
      </div>
      <span className="data-flow-track">
        <b />
      </span>
      <div className="data-flow-card">
        <span className="data-flow-title">{text.telegram}</span>
        <span className="example-bar" style={{ width: '80%' }} />
        <span className="example-bar" style={{ width: '55%' }} />
        <span className="example-tag is-done">{text.sent}</span>
      </div>
    </div>
  );
};
