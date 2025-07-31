import './Margin.css';
import { useEffect, useState } from 'react';

function Top() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 50);
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  if (!isVisible) return null;
  return (
    <a href='#root'><button className="floating-button">↑</button></a>
  );
}

export default Top;