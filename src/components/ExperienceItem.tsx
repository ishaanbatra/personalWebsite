import type { Experience } from '../data/experience';

const ExperienceItem = ({ experience }: { experience: Experience }) => {
  const { role, organization, timeframe, location, points } = experience;

  return (
    <article className="experience-card">
      <div className="experience-header">
        <div>
          <h3>{role}</h3>
          <p className="muted">{organization}</p>
        </div>
        <div className="experience-meta">
          <span className="muted">{timeframe}</span>
          {location && <span className="muted">{location}</span>}
        </div>
      </div>
      <ul className="experience-list">
        {points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </article>
  );
};

export default ExperienceItem;
