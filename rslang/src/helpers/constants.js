const defaultPaginationCount = 10;
const apiLinks = {
  file: 'https://raw.githubusercontent.com/hallovarvara/rslang-data/master/',
};
const unloggedHeaderLinkTitles = ['About us', 'Learn words', 'Play games', 'Statistics', 'Vocabulary', 'Sign In'];
const loggedHeaderLinkTitles = ['Learn words', 'Play games', 'About us', 'Statistics', 'Vocabulary', 'Settings'];

export {
  defaultPaginationCount,
  apiLinks,
  unloggedHeaderLinkTitles,
  loggedHeaderLinkTitles,
};

// TODO constants for AudioCall game, some constants can use in another games

export const audioSrc = 'https://raw.githubusercontent.com/hallovarvara/rslang-data/master/{audio}';

export const audio = {
  error: './audio/error.mp3',
  success: './audio/success.mp3',
};

export const maxLevel = 6;

export const imageSrc = 'https://raw.githubusercontent.com/hallovarvara/rslang-data/master/{image}';

export const buttonTextContent = {
  next: 'Далее',
  dontKnow: 'Я не знаю',
  startGame: 'Начать игру',
  newGame: 'Новая игра',
};

export const textContent = {
  correct: 'Знаю',
  error: 'Не знаю',
};

export const formLabel = {
  level: 'Уровень',
  chooseLevel: 'Выберите уровень',
  questions: 'Количество вопросов от 5 до 12',
  answers: 'Количество ответов от 2 до 5',
};
