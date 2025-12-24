const educationTimeline = [
  {
    range: '2023–Present',
    org: 'Purdue University',
    role: 'B.S. Aerospace Engineering (Autonomy & Controls) + B.A. Political Science (International Affairs)',
    note: 'GPA: 3.63'
  },
  {
    range: 'Spring 2026',
    org: 'UC3M, Madrid',
    role: 'Study Abroad',
    note: 'Exchange program'
  }
];

const experienceTimeline = [
  {
    range: '2025–Present',
    org: 'Hoot',
    role: 'Co-founder',
    note: 'Course-specific AI TA, Secured $24k Funding, Implented at Purdue'
  },
  {
    range: '2025–2026',
    org: 'Bling Cloud',
    role: 'AI/ML Intern',
    note: 'Developed an end-to-end Voice Resume Bot'
  },
];

const contactLinks = [
  { label: 'GitHub', href: 'https://github.com/ishaanbatra' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/ishaanbatra1' },
  { label: 'Spotify', href: 'https://open.spotify.com/user/ishaan2023223?si=a89b4771d88943de'}
];

const AboutSection = () => {
  return (
    <section id="about" className="section">
      <div className="container">
        <h2 className="about-title">About</h2>
        <div className="about-layout">
          <div className="about-right">
            <div className="about-plate-row">
              <article className="about-plate about-plate-compact">
                <h3 className="about-plate-title">Contact</h3>
                <div className="about-contact-stack">
                  <p className="about-contact">
                    <span className="about-contact-label">Email</span>
                    <span>ishaanbatra@gmail.com</span>
                  </p>
                  <p className="about-contact">
                    <span className="about-contact-label">Location</span>
                    <span>Palo Alto, CA</span>
                  </p>
                  <ul className="about-links">
                    {contactLinks.map((link) => (
                      <li key={link.label}>
                        <a href={link.href} target="_blank" rel="noreferrer">
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>

              <article className="about-plate about-plate-wide">
                <h3 className="about-plate-title">The Apogee</h3>
                <p className="about-plate-body">
                  In the future, I hope to develop and legislatively implement completely autonomous aircrafts for efficient and safe flight!
                </p>
                <p className="about-plate-body2"> 
                  Currently, I'm developing expertise in advanced controls systems and policy making.
                </p>
              </article>
            </div>

            <article className="about-plate about-plate-bottom">
              <h3 className="about-plate-title">My Near Future!</h3>
              <p className="about-plate-body">
                Next summer, I'll be developing and studying the efficacy of Hoot at Toronto Metropolitan
                University with my dear friend{' '}
                <a href="https://www.linkedin.com/in/alfonso-macarrein" target="_blank" rel="noreferrer">Alfonso Macarrein</a>,{' '}
                <a href="https://business.purdue.edu/directory/bio.php?username=ying58" target="_blank" rel="noreferrer">Dr. Cecilia Ying</a>, and{' '}
                <a href="https://www.torontomu.ca/information-technology-management/faculty-research/nancy-yang/" target="_blank" rel="noreferrer">Dr. Nancy Yang</a>. In the fall, we hope to
                implement it at a large scale at Purdue. That same fall, I will be joining{' '}
                <a href="https://www.eaps.purdue.edu/people/profile/djcziczo.html" target="_blank" rel="noreferrer">Dr. Daniel Cziczo's</a> Lab to study the
                environmental impact of spacecraft reentry. Also,{' '}
                <a href="https://www.linkedin.com/in/adam-darwish-209537294" target="_blank" rel="noreferrer">Adam Darwish</a> and I are beginning our
                nonlinear Triple Furuta Pendulum project!
              </p>
            </article>

          </div>

          <div className="about-timeline">
            <div className="timeline-group">
              <ul className="timeline-list">
                {educationTimeline.map((item) => (
                  <li className="timeline-item" key={`${item.range}-${item.org}`}>
                    <span className="timeline-range">{item.range}</span>
                    <div className="timeline-details">
                      <span className="timeline-title">{item.org}</span>
                      <span className="timeline-role">{item.role}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <hr className="about-divider" />

            <div className="timeline-group">
              <ul className="timeline-list">
                {experienceTimeline.map((item) => (
                  <li className="timeline-item" key={`${item.range}-${item.org}`}>
                    <span className="timeline-range">{item.range}</span>
                    <div className="timeline-details">
                      <span className="timeline-title">{item.org}</span>
                      <span className="timeline-role">{item.role}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
