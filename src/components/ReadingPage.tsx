import { useEffect } from 'react';
import { reads } from '../data/reads';

const ReadingPage = () => {
  useEffect(() => {
    const previous = document.title;
    document.title = 'Reading List | Ishaan Batra';
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <section id="reading" className="reading" aria-label="Reading list">
      <div className="container">
        <ol className="reading-list">
          {reads.map((read) => (
            <li className="reading-item" key={read.href}>
              <a className="reading-link" href={read.href} target="_blank" rel="noreferrer">
                {read.title}
              </a>
              {read.author && <span className="reading-author">{read.author}</span>}
              {read.note && <p className="reading-note">{read.note}</p>}
            </li>
          ))}
        </ol>
      </div>
      <a className="reading-archive" href="https://archive.is/" target="_blank" rel="noreferrer">
        let's not paywall information
      </a>
    </section>
  );
};

export default ReadingPage;
