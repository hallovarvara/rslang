export const initialState = {
  wordCards: 0,
  wordCount: 0,
  totalWords: 0,
  isAutoPlay: true,
  words: [],
  filtered: [],
  isLogged: false,
  isFetching: false,
  category: 'all',
  isFirstPassDone: false,
  isSecondPastDone: false,
  isStartLearning: false,
  isShownShortStats: false,
  guessedCount: 0,
  statsNewWordsCount: 0,
  statsMistakesCount: 0,
  statsRightAnswerSeries: 0,
  isWordsRandomly: false,
  userPage: 0,
  userLevel: 0,
};

export const buttonsNames = {
  COMPLICATED: 'Сложное',
  REMOVE: 'Удалить',
  AUTO_VOICE: 'Автоозвучка',
  SHOW_ANSWER: 'Показать ответ',
  PREV: 'пред.',
  NEXT: 'след.',
  CONTINUE: 'Продолжить',
  NEW_LESSON: 'Начать заново',
  CHECK_ANSWER: 'Проверить ответ',
  PLAY: 'Прослушать',
};

export const labels = {
  startLabel: 'Вы хотите продолжить с места, на котором остановились или начать новый сеанс изучения слов?',
  statsTitle: 'Сеанс изучения завершен',
  statsCompletedCards: 'Карточек завершено',
  statsNewCards: 'Из них новых слов',
  statsRightAnswers: 'Правильные ответы',
  statsMistakesCount: 'Общее количество ошибок при угадывании',
  statsLongestSeries: 'Самая длинная серия правильных ответов',
};

export const RSLANG = 'rslang';
export const RSLANG_SESSION_PROGRESS = 'rslangSessionLearningWords';

export const difficultLabels = {
  HARD_LABEL: {
    word: 'Трудно',
    repeats: '+ 2 повтора',
  },
  NORMAL_LABEL: {
    word: 'Хорошо',
    repeats: '+ 1 повтор',
  },
  EASY_LABEL: {
    word: 'Легко',
    repeats: 'без повторов',
  },
};

export const wordBaseTemplate = {
  id: '',
  group: 0,
  page: 0,
  word: '',
  image: '',
  audio: '',
  audioMeaning: '',
  audioExample: '',
  textMeaning: '',
  textExample: '',
  transcription: '',
  textExampleTranslate: '',
  textMeaningTranslate: '',
  wordTranslate: '',
  wordsPerExampleSentence: 0,
};

export const congratLearn = 'Поздравляем, Вы выучили лимит слов на день. Теперь можно повторить особо сложные слова';
export const congratAll = 'Позравляем, Вы все повторили на сегодня';
