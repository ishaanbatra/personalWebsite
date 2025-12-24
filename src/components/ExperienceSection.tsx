import SectionWrapper from './SectionWrapper';
import ExperienceItem from './ExperienceItem';
import type { Experience } from '../data/experience';

type ExperienceSectionProps = {
  items: Experience[];
};

const ExperienceSection = ({ items }: ExperienceSectionProps) => {
  return (
    <SectionWrapper
      id="experience"
      title="Experience"
      intro="Roles where I shipped, learned, and led — with an emphasis on impact and clarity."
    >
      <div className="experience-stack">
        {items.map((experience) => (
          <ExperienceItem key={`${experience.organization}-${experience.role}`} experience={experience} />
        ))}
      </div>
    </SectionWrapper>
  );
};

export default ExperienceSection;
