'use client';

import { useEffect, useRef, useState } from 'react';

// Sticky nav that highlights the section currently on screen.
// `links` is a list of { hash, label } matching section ids on the page.
function SectionNav({ links, base = '' }) {
  const [active, setActive] = useState(links[0]?.hash);
  const navRef = useRef(null);

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.hash))
      .filter(Boolean);

    if (sections.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [links]);

  // On phones the nav scrolls sideways: keep the active link in view.
  useEffect(() => {
    const nav = navRef.current;
    const link = nav?.querySelector('.Nav_active');
    if (!nav || !link || nav.scrollWidth <= nav.clientWidth) return;
    nav.scrollTo({ left: link.offsetLeft - (nav.clientWidth - link.offsetWidth) / 2, behavior: 'smooth' });
  }, [active]);

  return (
    <div className='Nav' ref={navRef}>
      {links.map((link) => (
        <a
          key={link.hash}
          href={`${base}#${link.hash}`}
          className={active === link.hash ? 'Nav_active' : undefined}
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}

export default SectionNav;
