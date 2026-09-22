import './Margin.css';
import { useEffect, useState } from 'react';

const links = [
  { hash: 'about', label: 'À propos' },
  { hash: 'project', label: 'Projets' },
  { hash: 'formation', label: 'Formation' },
  { hash: 'experience', label: 'Experience' },
  { hash: 'cv', label: 'CV' },
  { hash: 'contact', label: 'Contact' },
];

function Nav() {
  const [active, setActive] = useState(links[0].hash);

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.hash))
      .filter(Boolean);

    if (sections.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div className='Nav'>
      {links.map((link) => (
        <a
          key={link.hash}
          href={`/#${link.hash}`}
          className={active === link.hash ? 'Nav_active' : undefined}
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}

export default Nav;