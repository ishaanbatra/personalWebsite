import NavBar from './components/NavBar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import { projects } from './data/projects';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Selected Works', href: '#projects' },
  { label: 'Contact', href: '#contact' }
];

function App() {
  return (
    <div className="app">
      <NavBar links={navLinks} />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection items={projects} />
        <ContactSection />
      </main>
    </div>
  );
}

export default App;
