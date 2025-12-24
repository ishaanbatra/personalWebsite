import type { Project } from '../data/projects';
import Tag from './Tag';

const ProjectCard = ({ project }: { project: Project }) => {
  const { title, description, tech, links } = project;

  return (
    <article className="project-card">
      <div className="project-body">
        <h3>{title}</h3>
        <p className="muted">{description}</p>
        <div className="tag-row">
          {tech.map((item) => (
            <Tag key={item}>{item}</Tag>
          ))}
        </div>
      </div>
      <div className="project-links">
        {links?.demo && (
          <a className="text-link" href={links.demo} target="_blank" rel="noreferrer">
            Live Demo
          </a>
        )}
        {links?.github && (
          <a className="text-link" href={links.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        )}
      </div>
    </article>
  );
};

export default ProjectCard;
