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

export const applicationThings = {
  LEARN_WORDS: 'learnWords',
  SAVANNAH: 'savannah',
  SPRINT: 'sprint',
  AUDIOCALL: 'audiocall',
  SPEAK_IT: 'speakIt',
  PUZZLE: 'puzzle',
  UNMESS: 'unmess',
};

export const userSettingsTemplate = {
  IS_SHOWN_COMPLICATED_BUTTON: 'isShownComplicatedButton',
  IS_SHOWN_ANSWER_BUTTON: 'isShownAnswerButton',
  IS_SHOWN_IMAGE_ASSOCIATION: 'isShownImageAssociation',
  IS_SHOWN_TRANSLATION: 'isShownTranslation',
  IS_SHOWN_TRANSCRIPTION: 'isShownTranscription',
  IS_SHOWN_EXAMPLE_SENTENCE: 'isShownExampleSentence',
  IS_SHOWN_MEANING: 'isShownMeaning',
};

export const levelsOfDifficulty = {
  HARD: 'hard',
  NORMAL: 'normal',
  EASY: 'easy',
};

export const dateFormatTemplate = 'DD.MM.YYYY';
