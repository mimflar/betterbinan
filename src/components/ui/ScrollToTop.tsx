import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
export default function ScrollToTop() {
  const { pathname } = useLocation();
  const previousPath = useRef(pathname);
  useEffect(() => {
    window.scrollTo(0, 0);
    if (previousPath.current !== pathname) {
      document.getElementById('main-content')?.focus({ preventScroll: true });
      previousPath.current = pathname;
    }
  }, [pathname]);
  return null;
}
