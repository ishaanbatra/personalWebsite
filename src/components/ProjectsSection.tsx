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
      title="Selected Works"    >
      <div className="project-grid">
        {items.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </SectionWrapper>
  );
};

export default ProjectsSection;
