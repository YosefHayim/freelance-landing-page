import './projects.css';
import type { Language } from '../language/language';
import { projectImages } from './projectImages';
import { projectGroupNames, projectGroups, projects } from './projects';
import { projectsText } from './projects.text';

interface ProjectsSectionProps {
  language: Language;
}

export const ProjectsSection = ({ language }: ProjectsSectionProps) => {
  const text = projectsText[language];

  return (
    <section className="stacking-section" id="projects" aria-labelledby="projects-heading">
      <div className="section-content">
        <h2 id="projects-heading" className="display-heading projects-heading reveal-on-scroll">
          <span>{text.heading}</span>
          <span className="muted-line">{text.mutedHeading}</span>
        </h2>
        {projectGroupNames.map((groupName) => (
          <div key={groupName} className="project-group">
            <h3 className="project-group-title reveal-on-scroll">{text.groupTitles[groupName]}</h3>
            <ul className="project-list">
              {projectGroups[groupName].map((projectName) => {
                const project = projects[projectName];
                return (
                  <li key={projectName} className="reveal-on-scroll">
                    <a
                      className="project-link"
                      data-track={project.trackedName}
                      href={project.href}
                      target="_blank"
                      rel="noopener"
                    >
                      <img
                        className="project-image"
                        src={projectImages[projectName]}
                        alt=""
                        width="600"
                        height="450"
                        loading="lazy"
                        decoding="async"
                      />
                      <span className="project-name">{text.projects[projectName].name}</span>
                      <span className="project-detail">{text.projects[projectName].detail}</span>
                      <span className="project-link-label">
                        {text.linkLabels[project.linkKind]}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};
