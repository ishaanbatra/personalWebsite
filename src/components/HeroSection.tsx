import Button from './Button';
import heroScreenshot from '../assets/hero-screenshot.png';

const focusAreas = ['— Rust', '— Differential Flatness Theory', '— The ISS\' governing framework', '— The LSAT', '— The effects of spacecraft reentry on cloud formations', '— Liebestraum No. 3 (Love Dream, Liszt)'];

const HeroSection = () => {
  return (
    <section id="home" className="hero">
      <div className="container hero-grid">
        <div className="hero-text">
          <h1>Hi! My Name is Ishaan Batra.</h1>
          <p className="lead">
            I'm a current aerospace engineering + political cience undergrad at Purdue University. 
            Math, coding, international affairs, and more math.
            I really like doing hard things. And hoops, {' '}
            <a
              className="hero-inline-link"
              href="https://www.instagram.com/pourlamoi/"
              target="_blank"
              rel="noreferrer"
            >
              piano
            </a>
            , and climbing. And also when people listen to my{' '}
            <a
              className="hero-inline-link"
              href="https://docs.google.com/document/d/1K51orVRA_dCG4_2G57PfnzshogHRZV4-XaXMdb2efQc/edit?usp=sharing"
              target="_blank"
              rel="noreferrer"
            >
              opinions
            </a>. But I love learning even more. 
            You can find all my ideas in here somewhere. And please share yours!
          </p>
          <div className="hero-actions">
            <Button href="#projects" variant="primary">
              Browse Works
            </Button>
            <Button href="/ishaan-batra-resume.pdf" variant="secondary" target="_blank" rel="noreferrer">
              Download Résumé
            </Button>
            <Button href="#share-idea" variant="secondary">
              Share Your Idea!
            </Button>
          </div>
        </div>
        <div className="hero-media">
          <img src={heroScreenshot} alt="Selected project overview" loading="lazy" />
        </div>
        <div className="focus-rotator hero-focus">
          <span className="focus-label">Currently relentlessly pursuing competence in:</span>
          <ul className="focus-list">
            {focusAreas.map((focusArea) => (
              <li className="focus-list-item" key={focusArea}>
                {focusArea}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
