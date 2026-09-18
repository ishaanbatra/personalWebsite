import { useMemo, useState } from 'react';
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
  const [passwordInput, setPasswordInput] = useState('');

  const isUnlocked = useMemo(
    () => passwordInput.trim().toLowerCase() === 'undeniably',
    [passwordInput]
  );

  if (!isUnlocked) {
    return (
      <div className="lockscreen">
        <form className="lockscreen-form" onSubmit={(event) => event.preventDefault()}>
          <p className="lockscreen-prompt">
            I am myself. You must be, too. You choose the same, laugh the same, learn the same.
            {' '}
            _________ so.
          </p>
          <input
            className="lockscreen-input"
            type="text"
            value={passwordInput}
            onChange={(event) => setPasswordInput(event.target.value)}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            autoFocus
            aria-label="Enter password word"
          />
        </form>
      </div>
    );
  }

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
