import type { Project } from '../data/projects';

const ProjectCard = ({ project }: { project: Project }) => {
  const { title, description, descriptionLink } = project;

  const renderDescription = () => {
    if (!descriptionLink) {
      return description;
    }

    const { label, href } = descriptionLink;
    const matchIndex = description.indexOf(label);
    if (matchIndex === -1) {
      return description;
    }

    const before = description.slice(0, matchIndex);
    const after = description.slice(matchIndex + label.length);

    return (
      <>
        {before}
        <a className="project-inline-link" href={href} target="_blank" rel="noreferrer">
          {label}
        </a>
        {after}
      </>
    );
  };

  return (
    <article className="project-card">
      <div className="project-body">
        <h3>{title}</h3>
        <p className="muted">{renderDescription()}</p>
      </div>
    </article>
  );
};

export default ProjectCard;
