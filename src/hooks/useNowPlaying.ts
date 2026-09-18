import { useEffect, useState } from 'react';

export type NowPlaying = {
  isPlaying: true;
  title: string;
  artist: string;
  album: string;
  albumArt: string;
  url: string;
};

const isNowPlaying = (value: unknown): value is NowPlaying => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return candidate.isPlaying === true
    && typeof candidate.title === 'string'
    && typeof candidate.artist === 'string'
    && typeof candidate.album === 'string'
    && typeof candidate.albumArt === 'string'
    && typeof candidate.url === 'string';
};

const isSameTrack = (current: NowPlaying | null, next: NowPlaying) => current !== null
  && current.title === next.title
  && current.artist === next.artist
  && current.album === next.album
  && current.albumArt === next.albumArt
  && current.url === next.url;

const useNowPlaying = (): NowPlaying | null => {
  const [nowPlaying, setNowPlaying] = useState<NowPlaying | null>(null);
  const endpoint = import.meta.env.VITE_NOW_PLAYING_URL?.trim();

  useEffect(() => {
    if (!endpoint) {
      return undefined;
    }

    const controller = new AbortController();
    let intervalId: ReturnType<typeof window.setInterval> | undefined;

    const fetchNowPlaying = async () => {
      try {
        const response = await fetch(endpoint, { signal: controller.signal });

        if (!response.ok) {
          throw new Error('Now-playing request failed.');
        }

        const data: unknown = await response.json();

        if (isNowPlaying(data)) {
          setNowPlaying((current) => (isSameTrack(current, data) ? current : data));
        } else {
          setNowPlaying(null);
        }
      } catch {
        if (!controller.signal.aborted) {
          setNowPlaying(null);
        }
      }
    };

    const stopPolling = () => {
      if (intervalId !== undefined) {
        window.clearInterval(intervalId);
        intervalId = undefined;
      }
    };

    const startPolling = () => {
      stopPolling();
      void fetchNowPlaying();
      intervalId = window.setInterval(() => {
        void fetchNowPlaying();
      }, 30_000);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        stopPolling();
      } else {
        startPolling();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    if (document.visibilityState !== 'hidden') {
      startPolling();
    }

    return () => {
      stopPolling();
      controller.abort();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [endpoint]);

  return nowPlaying;
};

export default useNowPlaying;
