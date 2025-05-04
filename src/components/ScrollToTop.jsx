import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    // If the pathname or key changes, scroll to top
    window.scrollTo(0, 0);
  }, [pathname, key]);

  return null;
};

export default ScrollToTop;