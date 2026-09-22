import './Margin.css';
import { useEffect, useState } from 'react';

function Nav( {page, preview=false} ) {
  const links = [
    { hash: 'about', label: 'Présentation' },
    { hash: 'functionality', label: 'Fonctionnalités' },
    { hash: 'directskill', label: 'Compétences' },
    ...(preview ? [{ hash: 'preview', label: 'Aperçu' }] : []),
    { hash: 'demo', label: 'Démo' },
    { hash: 'link', label: 'Liens' },
  ];

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
  }, [page, preview]);

  return (
    <div className='Nav'>
      {links.map((link) => (
        <a
          key={link.hash}
          href={`/${page}/#${link.hash}`}
          className={active === link.hash ? 'Nav_active' : undefined}
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}

export default Nav;