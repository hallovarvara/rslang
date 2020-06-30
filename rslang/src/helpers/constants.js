import standartAvatar from '../assets/images/avatar.jpg';

const defaultPaginationCount = 10;
const apiLinks = {
  file: 'https://raw.githubusercontent.com/hallovarvara/rslang-data/master/',
};
const unloggedHeaderLinkTitles = ['About us', 'Learn words', 'Play games', 'Statistics', 'Vocabulary', 'Sign In'];
const loggedHeaderLinkTitles = ['Learn words', 'Play games', 'About us', 'Statistics', 'Vocabulary', 'Settings'];
const gamesData = [
  {
    title: 'SpeakIt',
    description: 'Description with advantages and answer the question why this game will be useful.',
    link: 'speakit',
  },
  {
    title: 'English puzzle',
    description: 'Description with advantages and answer the question why this game will be useful.',
    link: 'english-puzzle',
  },
  {
    title: 'Саванна',
    description: 'Description with advantages and answer the question why this game will be useful.',
    link: 'savannah',
  },
  {
    title: 'Аудиовызов',
    description: 'Description with advantages and answer the question why this game will be useful.',
    link: 'audiocall',
  },
  {
    title: 'Спринт',
    description: 'Description with advantages and answer the question why this game will be useful.',
    link: 'sprint',
  },
  {
    title: 'Своя игра',
    description: 'Description with advantages and answer the question why this game will be useful.',
    link: 'own-game',
  },
];
const teamMembers = [
  {
    name: 'Dmitry',
    surname: 'Lebetsky',
    role: 'Role and quite long VKLAD’s text, that includes short marcs from team’s worklog.',
    image: standartAvatar,
    linkedInLink: 'https://www.linkedin.com/in/lebetsky-dmitry-20a80519a/',
  },
  {
    name: 'Varvara',
    surname: 'Deviaterikova',
    role: 'Role and quite long VKLAD’s text, that includes short marcs from team’s worklog.',
    image: standartAvatar,
    linkedInLink: 'https://www.linkedin.com/in/lebetsky-dmitry-20a80519a/',
  },
  {
    name: 'Artsiom',
    surname: 'Rymarchuk',
    role: 'Role and quite long VKLAD’s text, that includes short marcs from team’s worklog.',
    image: standartAvatar,
    linkedInLink: 'https://www.linkedin.com/in/lebetsky-dmitry-20a80519a/',
  },
  {
    name: 'Kseniya',
    surname: 'Yatskevich',
    role: 'Role and quite long VKLAD’s text, that includes short marcs from team’s worklog.',
    image: standartAvatar,
    linkedInLink: 'https://www.linkedin.com/in/lebetsky-dmitry-20a80519a/',
  },
  {
    name: 'Maksym',
    surname: 'Kaspriv',
    role: 'Role and quite long VKLAD’s text, that includes short marcs from team’s worklog.',
    image: standartAvatar,
    linkedInLink: 'https://www.linkedin.com/in/lebetsky-dmitry-20a80519a/',
  },
  {
    name: 'Aleksei',
    surname: 'Osipov',
    role: 'Role and quite long VKLAD’s text, that includes short marcs from team’s worklog.',
    image: standartAvatar,
    linkedInLink: 'https://www.linkedin.com/in/lebetsky-dmitry-20a80519a/',
  },
];

export {
  defaultPaginationCount,
  apiLinks,
  unloggedHeaderLinkTitles,
  loggedHeaderLinkTitles,
  gamesData,
  teamMembers,
};
