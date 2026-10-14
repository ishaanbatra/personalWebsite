import { useEffect, useState } from 'react';

export type Route = 'home' | 'reading';

export const READING_PATH = '#/reading';

const resolve = (hash: string): Route => (hash === READING_PATH ? 'reading' : 'home');

/**
 * Minimal hash router so the site stays a single HTML file on GitHub Pages.
 * Section anchors (`#about`) keep their native scroll behaviour; only hashes
 * that start with `#/` are treated as pages.
 */
export const useHashRoute = (): Route => {
  const [route, setRoute] = useState<Route>(() => resolve(window.location.hash));

  useEffect(() => {
    const onHashChange = () => setRoute(resolve(window.location.hash));
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    if (route === 'reading') {
      window.scrollTo({ top: 0 });
      return;
    }
    // Landing on the home route with a section hash (e.g. coming back from
    // the reading page via a nav tab): the section does not exist until this
    // render, so the browser's native anchor jump never fires. Do it here.
    const hash = window.location.hash;
    if (hash && !hash.startsWith('#/')) {
      document.querySelector(hash)?.scrollIntoView();
    }
  }, [route]);

  return route;
};
