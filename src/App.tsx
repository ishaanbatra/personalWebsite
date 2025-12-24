import NavBar from './components/NavBar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import ContactSection from './components/ContactSection';
import { experiences } from './data/experience';
import { projects } from './data/projects';
import { skillCategories } from './data/skills';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' }
];

function App() {
  return (
    <div className="app">
      <NavBar links={navLinks} />
      <main>
        <HeroSection />
        <AboutSection />
        <ExperienceSection items={experiences} />
        <ProjectsSection items={projects} />
        <SkillsSection categories={skillCategories} />
        <ContactSection />
      </main>
    </div>
  );
}

export default App;
