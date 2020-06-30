const defaultPaginationCount = 10;
const apiLinks = {
  file: 'https://raw.githubusercontent.com/hallovarvara/rslang-data/master/',
};
const unloggedHeaderLinkTitles = ['About us', 'Learn words', 'Play games', 'Statistics', 'Vocabulary', 'Sign In'];
const loggedHeaderLinkTitles = ['Learn words', 'Play games', 'About us', 'Statistics', 'Vocabulary', 'Settings'];

const selectorOptions = [
  ['new', 'new & repeating'],
  ['complicated', 'complicated'],
  ['removed', 'removed']
]

export {
  selectorOptions,
  defaultPaginationCount,
  apiLinks,
  unloggedHeaderLinkTitles,
  loggedHeaderLinkTitles,
};
