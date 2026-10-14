export type Read = {
  title: string;
  href: string;
  author?: string;
  note?: string;
};

// Order is the order on the page.
export const reads: Read[] = [
  {
    title: 'The Men Who Want Women to Be Quiet',
    author: 'Helen Lewis, The Atlantic',
    href: 'https://www.theatlantic.com/magazine/2026/06/conservative-masculinism-misogyny/686939/'
  },
  {
    title: 'Even Claude Is in the Dark About Dario Amodei’s Wife—and Her Influence at Anthropic',
    author: 'Keach Hagey and Luke Jerod Kummer, The Wall Street Journal',
    href: 'https://www.wsj.com/tech/ai/claude-dario-amodei-wife-anthropic-e1eeda7d'
  },
  {
    title: 'The Semplica-Girl Diaries',
    author: 'George Saunders, The New Yorker',
    href: 'https://www.newyorker.com/magazine/2012/10/15/the-semplica-girl-diaries-fiction-george-saunders'
  },
  {
    title: 'Majority of Public Disapproves of Supreme Court’s Decision To Overturn Roe v. Wade',
    author: 'Pew Research Center',
    href: 'https://www.pewresearch.org/politics/2022/07/06/majority-of-public-disapproves-of-supreme-courts-decision-to-overturn-roe-v-wade/'
  },
  {
    title: 'Lists!!!',
    author: 'This American Life, Episode 831',
    href: 'https://www.thisamericanlife.org/831/lists'
  },
  {
    title: 'Harrison Bergeron',
    author: 'Kurt Vonnegut, via Biblioklept',
    href: 'https://biblioklept.org/tag/harrison-bergeron/'
  }
];
