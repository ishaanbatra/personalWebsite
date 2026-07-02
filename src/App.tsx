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
  const [bypassed, setBypassed] = useState(false);

  const isUnlocked = useMemo(
    () => bypassed || passwordInput.trim().toLowerCase() === 'undeniably',
    [bypassed, passwordInput]
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
          <p className="lockscreen-note">
            Currently trying to make the answer a little more obvious. If you're coming from my YC
            Startup School application,{' '}
            <button
              type="button"
              className="lockscreen-bypass"
              onClick={() => setBypassed(true)}
            >
              click here
            </button>{' '}
            to go on to my website.
          </p>
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
