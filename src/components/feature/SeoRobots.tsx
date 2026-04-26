import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const NOINDEX_PATHS = ['/project-request', '/admin'];

export default function SeoRobots() {
  const location = useLocation();

  useEffect(() => {
    const shouldNoindex = NOINDEX_PATHS.some((path) => location.pathname === path || location.pathname.startsWith(`${path}/`));
    const existing = document.querySelector<HTMLMetaElement>('meta[name="robots"][data-route-robots="true"]');

    if (shouldNoindex) {
      const tag = existing || document.createElement('meta');
      tag.name = 'robots';
      tag.content = 'noindex, nofollow';
      tag.dataset.routeRobots = 'true';
      if (!existing) document.head.appendChild(tag);
      return;
    }

    existing?.remove();
  }, [location.pathname]);

  return null;
}
