import noAvatar from '../assets/images/avatar.jpg';


const unloggedHeaderLinkTitles = ['About us', 'Learn words', 'Play games', 'Statistics', 'Vocabulary', 'Sign In'];
const loggedHeaderLinkTitles = ['Learn words', 'Play games', 'About us', 'Statistics', 'Vocabulary', 'Settings'];

const ALL_PAGE = 29;
const ALL_CARDS_IN_QUERY = 19;
const TOTAL_GROUP = 6;

export {
  unloggedHeaderLinkTitles,
  loggedHeaderLinkTitles,
  TOTAL_GROUP,
  ALL_PAGE,
  ALL_CARDS_IN_QUERY,
};


const defaultPaginationCount = 10;

const apiLinks = {
  file: 'https://raw.githubusercontent.com/hallovarvara/rslang-data/master/',
  base: 'https://kagafon-learn-words.herokuapp.com/',
};

const linkedinLink = 'https://www.linkedin.com/in/';

const pagesData = {
  aboutUs: {
    title: 'О нас',
    path: 'about-us',
    guest: { isVisible: true, index: 0 },
    user: { isVisible: true, index: 2 },
  },
  learnWords: {
    title: 'Учить слова',
    path: '',
    guest: { isVisible: true, index: 1 },
    user: { isVisible: true, index: 0 },
  },
  play: {
    title: 'Играть',
    path: 'play',
    guest: { isVisible: true, index: 2 },
    user: { isVisible: true, index: 1 },
  },
  promo: {
    title: 'Промо',
    path: 'promo',
    guest: { isVisible: false },
    user: { isVisible: false },
  },
  settings: {
    title: 'Настройки',
    path: 'settings',
    guest: { isVisible: false },
    user: { isVisible: true, index: 5 },
  },
  signIn: {
    title: 'Войти',
    path: 'sign-in',
    guest: { isVisible: true, index: 5 },
    user: { isVisible: false },
  },
  register: {
    title: 'Зарегистрироваться',
    path: 'register',
    guest: { isVisible: false },
    user: { isVisible: false },
  },
  statistics: {
    title: 'Статистика',
    path: 'statistics',
    guest: { isVisible: true, index: 3 },
    user: { isVisible: true, index: 3 },
  },
  vocabulary: {
    title: 'Словарь',
    path: 'vocabulary',
    guest: { isVisible: true, index: 4 },
    user: { isVisible: true, index: 4 },
  },
};

const gamesData = {
  speakit: {
    title: 'SpeakIt',
    description: 'Вырабатывайте правильное произношение слов вместе с нашей космической игрой',
    path: 'speakit',
  },
  englishPuzzle: {
    title: 'English Puzzle',
    description: 'Учитесь правильно строить предложения, а заодно знакомьтесь с величайшими мировыми произведениями искусства',
    path: 'english-puzzle',
  },
  savannah: {
    title: 'Саванна',
    description: 'Угадывайте, как переводятся слова, и расширяйте лексикон',
    path: 'savannah',
  },
  audiocall: {
    title: 'Аудиовызов',
    description: 'Прокачивайте восприятие языка на слух, а также увеличивайте свой словарный запас',
    path: 'audiocall',
  },
  sprint: {
    title: 'Спринт',
    description: 'Играйте на время, чтобы точно знать, как много слов вы можете перевести за минуту',
    path: 'sprint',
  },
  unmess: {
    title: 'Своя игра „Unmess”',
    description: 'Соединяйте слова и их значения, расширяя как словарный запас, так и знание синонимов и умение понимать смысл предложений',
    path: 'unmess',
  },
};

const teamMembers = [
  {
    name: 'Дмитрий',
    surname: 'Лебецкий',
    role: 'Работал как волк, делал все подряд',
    image: noAvatar,
    linkedinUsername: 'lebetsky-dmitry-20a80519a',
  },
  {
    name: 'Варвара',
    surname: 'Девятерикова',
    role: 'Работала как волчица, делала все подряд',
    image: noAvatar,
    linkedinUsername: 'hallovarvara',
  },
  {
    name: 'Артем',
    surname: 'Римарчук',
    role: 'Работал как волк, делал все подряд',
    image: noAvatar,
    linkedinUsername: 'artemrimarchyk',
  },
  {
    name: 'Ксения',
    surname: 'Яцкевич',
    role: 'Работала как волчица, делала все подряд',
    image: noAvatar,
    linkedinUsername: 'ksenia-yatskevich-6543881b2'
  },
  {
    name: 'Максим',
    surname: 'Касприв',
    role: 'Работал как волк, делал все подряд',
    image: noAvatar,
    linkedinUsername: 'maksym-kaspriv'
  },
  {
    name: 'Алексей',
    surname: 'Осипов',
    role: 'Работал как волк, делал все подряд',
    image: noAvatar,
    linkedinUsername: ''
  },
];

const selectorOptions = [
  ['new', 'new & repeating'],
  ['complicated', 'complicated'],
  ['removed', 'removed']
];

/* Games */

const audio = {
  error: './audio/error.mp3',
  success: './audio/success.mp3',
};

const wordsGroups = 6;
const audiocallMaxLevels = 12;

const buttonTextContent = {
  next: 'Далее',
  dontKnow: 'Не знаю',
  startGame: 'Играть',
  newGame: 'Начать новую игру',
};

const textContent = {
  correct: 'Правильно',
  error: 'Неправильно',
};

const formLabel = {
  level: 'Уровень',
  chooseLevel: 'Выберите уровень',
  questions: 'Сколько слов хотите отгадать? (5—12)',
  answers: 'Сколько показывать вариантов ответов? (2—5)',
};

export {
  pagesData,
  selectorOptions,
  defaultPaginationCount,
  apiLinks,
  linkedinLink,
  gamesData,
  teamMembers,
  audio,
  wordsGroups,
  audiocallMaxLevels,
  buttonTextContent,
  textContent,
  formLabel,
};
