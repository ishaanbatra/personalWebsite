import type { ReactNode } from 'react';

type SectionWrapperProps = {
  id: string;
  title: ReactNode;
  intro?: string;
  children: ReactNode;
};

const SectionWrapper = ({ id, title, intro, children }: SectionWrapperProps) => {
  return (
    <section id={id} className="section">
      <div className="container">
        <div className="section-header">
          <h2>{title}</h2>
          {intro && <p className="section-intro">{intro}</p>}
        </div>
        {children}
      </div>
    </section>
  );
};

export default SectionWrapper;
