import SectionWrapper from './SectionWrapper';
import Tag from './Tag';
import type { SkillCategory } from '../data/skills';

type SkillsSectionProps = {
  categories: SkillCategory[];
};

const SkillsSection = ({ categories }: SkillsSectionProps) => {
  return (
    <SectionWrapper
      id="skills"
      title="Skills"
      intro="Tools and technologies I reach for to design, build, and ship."
    >
      <div className="skills-grid">
        {categories.map((category) => (
          <div className="skill-card" key={category.category}>
            <h3>{category.category}</h3>
            <div className="tag-row">
              {category.items.map((item) => (
                <Tag key={item}>{item}</Tag>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default SkillsSection;
