'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  ['/admin', 'Tableau de bord'],
  ['/admin/projects', 'Projets'],
  ['/admin/experiences', 'Expériences'],
  ['/admin/formations', 'Formations'],
  ['/admin/profile', 'Profil'],
  ['/admin/people', 'Contributeurs'],
  ['/admin/groups', 'Groupes'],
];

// Admin toolbar links; the current page is highlighted.
function AdminNav() {
  const pathname = usePathname();
  const isActive = (href) => (href === '/admin' ? pathname === href : pathname.startsWith(href));
  const navRef = useRef(null);

  // On narrow screens the bar scrolls: bring the current page's link into view.
  useEffect(() => {
    navRef.current?.querySelector('[aria-current=page]')?.scrollIntoView({ block: 'nearest', inline: 'center' });
  }, [pathname]);

  return (
    <nav ref={navRef} className='admin-toolbar-links' aria-label='Administration'>
      {LINKS.map(([href, label]) => (
        <Link key={href} href={href} aria-current={isActive(href) ? 'page' : undefined}>{label}</Link>
      ))}
      <Link href='/' target='_blank'>Voir le site ↗</Link>
    </nav>
  );
}

export default AdminNav;
