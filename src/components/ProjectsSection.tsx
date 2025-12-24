import SectionWrapper from './SectionWrapper';
import ProjectCard from './ProjectCard';
import type { Project } from '../data/projects';

type ProjectsSectionProps = {
  items: Project[];
};

const ProjectsSection = ({ items }: ProjectsSectionProps) => {
  return (
    <SectionWrapper
      id="projects"
      title="Projects"
      intro="Selected work that combines engineering rigor with clean, usable interfaces."
    >
      <div className="project-grid">
        {items.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </SectionWrapper>
  );
};

export default ProjectsSection;
