import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Client-side navigation keeps the previous scroll position, so a project
// opened from the middle of the home page would open in the middle too.
// Reset to the top on every page change (in-page #anchors are left alone).
function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;
