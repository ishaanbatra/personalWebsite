import useNowPlaying from '../hooks/useNowPlaying';

const NowPlaying = () => {
  const nowPlaying = useNowPlaying();

  if (!nowPlaying) {
    return null;
  }

  return (
    <div className="now-playing-band" aria-live="polite">
      <span className="focus-label now-playing-label">Currently listening to:</span>
      <span className="now-playing-details">
        <a
          className="hero-inline-link now-playing-link"
          href={nowPlaying.url}
          target="_blank"
          rel="noreferrer"
        >
          {nowPlaying.title}
        </a>
        <span className="now-playing-artist"> — {nowPlaying.artist}</span>
      </span>
      <img
        className="now-playing-album-art"
        src={nowPlaying.albumArt}
        alt=""
        loading="lazy"
      />
    </div>
  );
};

export default NowPlaying;
