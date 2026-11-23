'use client';

import { useEffect, useState } from 'react';

function Top() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;
  return (
    <a href='#top' className="floating-button" aria-label="Revenir en haut">↑</a>
  );
}

export default Top;
