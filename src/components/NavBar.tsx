import { useEffect, useMemo, useState } from 'react';

type NavLink = {
  label: string;
  href: string;
};

type NavBarProps = {
  links: NavLink[];
};

const NavBar = ({ links }: NavBarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');

  const trackedSections = useMemo(() => ['#home', ...links.map((link) => link.href)], [links]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActiveSection(`#${visible[0].target.id}`);
        }
      },
      { threshold: [0.35, 0.5, 0.65], rootMargin: '-20% 0px -30% 0px' }
    );

    trackedSections.forEach((selector) => {
      const el = document.querySelector(selector);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [trackedSections]);

  return (
    <header className="navbar">
      <div className="container nav-content">
        <a className="brand" href="#home" aria-label="Back to top">
          <span className="brand-text">Ishaan Batra</span>
        </a>
        <nav className={`nav-links ${isOpen ? 'open' : ''}`} aria-label="Primary">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`nav-link ${activeSection === link.href ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <button
          className="menu-toggle"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="menu-line" aria-hidden="true" />
          <span className="menu-line" aria-hidden="true" />
          <span className="menu-line" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
};

export default NavBar;
