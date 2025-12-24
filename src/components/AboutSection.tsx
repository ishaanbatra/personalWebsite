import SectionWrapper from './SectionWrapper';

const AboutSection = () => {
  return (
    <SectionWrapper
      id="about"
      title="About"
      intro="Curious builder who mixes rigorous engineering with clear communication."
    >
      <div className="about-grid">
        <p>
          I enjoy turning complex ideas into tangible prototypes — from aerospace systems to AI-powered tools.
          Whether I am iterating on flight software or refining a product experiment, I value clarity, reliability,
          and thoughtful collaboration.
        </p>
        <ul className="about-list">
          <li>Focus areas: autonomy, data visualization, AI tooling</li>
          <li>Strong in rapid prototyping and shipping clean, maintainable code</li>
          <li>Community-oriented: I mentor peers and document processes so teams move faster together</li>
        </ul>
      </div>
    </SectionWrapper>
  );
};

export default AboutSection;
