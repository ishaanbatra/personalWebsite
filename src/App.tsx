import NavBar from './components/NavBar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import FriendsSection from './components/FriendsSection';
import ShareIdeaSection from './components/ShareIdeaSection';
import { projects } from './data/projects';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Selected Works', href: '#projects' },
  { label: 'My Friends!', href: '#friends' },
  { label: 'Share Your Idea!', href: '#share-idea' }
];

function App() {
  return (
    <div className="app">
      <NavBar links={navLinks} />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection items={projects} />
        <FriendsSection />
        <ShareIdeaSection />
      </main>
    </div>
  );
}

export default App;
