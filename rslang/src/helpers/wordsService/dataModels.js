import moment from 'moment';
import {
  applicationThings,
  userSettingsTemplate,
  dateFormatTemplate,
  levelsOfDifficulty,
} from '../constants';

export const userWordTemplate = {
  difficulty: false,
  optional: {
    rate: 0,
    next: '',
    stamp: 0,
    removed: false,
    repeated: 0,
  },
};

export const userWordThings = {
  DIFFICULTY: 'difficulty',
  OPTIONAL: 'optional',
  RATE: 'rate',
  NEXT: 'next',
  STAMP: 'stamp',
  REMOVED: 'removed',
  REPEATED: 'repeated',
};

export const statsGameTemplate = {
  games: 0,
  wrong: 0,
  right: 0,
};

export const statsLearnTemplate = {
  learned: 0,
  inProgress: 0,
  complicated: 0,
  removed: 0,
};

export const statsPuzzleTemplate = {
  games: 0,
  wrong: 0,
};

export const statsThingNames = {
  LEARNED: 'learned',
  IN_PROGRESS: 'inProgress',
  COMPLICATED: 'complicated',
  REMOVED: 'removed',
  GAMES: 'games',
  WRONG: 'wrong',
  RIGHT: 'right',
};

export const checkStatsThingTemplate = (thing) => {
  switch (thing) {
    case applicationThings.LEARN_WORDS:
      return { ...statsLearnTemplate };
    default:
      return {};
  }
};

export const statsMainTemplate = () => (
  {
    learnedWords: 0,
    optional: {},
  }
);

export const generateStatsTemplate = () => {
  const stats = statsMainTemplate();
  const properties = {};
  Object.values(applicationThings).forEach((thing) => {
    properties[thing] = checkStatsThingTemplate(thing);
  });
  stats.optional = { ...properties };
  return stats;
};

const sumObjectProps = (targetObject, newData) => {
  const result = {};
  Object.keys(targetObject).forEach((key) => {
    result[key] = key === 'games'
      ? targetObject[key] + 1
      : targetObject[key] + newData[key] || 0;
  });
  return result;
};

const changeGameStats = (statsOption, optionData, currentStats) => {
  const today = moment().format(dateFormatTemplate);
  const optional = currentStats?.optional || {};
  const current = optional[statsOption][today];
  let updated = {};

  const temlate = statsOption === applicationThings.PUZZLE
    ? statsPuzzleTemplate
    : statsGameTemplate;
  updated = current
    ? { ...sumObjectProps(current, optionData) }
    : { ...sumObjectProps(temlate, optionData) };
  optional[statsOption][today] = { ...updated };
  return optional[statsOption];
};

export const changeStats = (statsOption, optionData, currentStats) => {
  const newStats = { ...currentStats };
  const { optional } = currentStats;
  let updated = {};
  let current = {};
  switch (statsOption) {
    case applicationThings.LEARN_WORDS:
      current = optional[statsOption];
      updated = {
        ...sumObjectProps(current, optionData),
      };
      break;
    default:
      updated = changeGameStats(statsOption, optionData, currentStats);
  }
  optional[statsOption] = updated;
  return { ...newStats, optional };
};

export const changeSessionStatsObject = (statsObject, keyName, keyValue) => {
  const result = { ...statsObject };
  result[keyName] += keyValue;
  return result;
};

export const generateSettingsTemplate = () => {
  const settings = {};
  Object.values(userSettingsTemplate).forEach((setting) => {
    settings[setting] = true;
  });
  return settings;
};

export const changeSettings = (userOption, wordObject) => {
  const settings = { ...wordObject };
  const optionData = settings[userOption];
  settings[userOption] = !optionData;
  return { ...settings };
};

export const generateUserWordsTemplate = () => (
  []
);

export const createUserWord = (wordObject) => {
  const userWord = { wordId: wordObject.id, ...userWordTemplate };
  return { ...wordObject, userWord };
};

export const convertDate = (days) => (
  !days
    ? moment().format(dateFormatTemplate)
    : moment().add(days, 'days').format(dateFormatTemplate)
);

export const convertStamp = (days, oldDate) => (
  !days
    ? moment(oldDate.split('.').reverse().join('-')).valueOf()
    : moment().add(days, 'days').valueOf()
);

export const changeUserWord = (userOption, optionData, oldRepeated, stamp, wordObject) => {
  const newUserWord = wordObject?.userWord
    ? { ...wordObject.userWord }
    : { ...userWordTemplate };
  const { optional } = newUserWord;
  if (userOption === userWordThings.DIFFICULTY) {
    newUserWord[userWordThings.DIFFICULTY] = optionData;
  } else {
    switch (userOption) {
      case userWordThings.RATE:
        optional.rate = optionData;
        optional.next = convertDate(optionData);
        optional.stamp = stamp;
        optional.repeated = oldRepeated + 1;
        break;
      case userWordThings.NEXT:
        optional.next = optionData;
        optional.stamp = stamp;
        break;
      case userWordThings.REMOVED:
        optional.removed = optionData;
        break;
      case userWordThings.REPEATED:
        optional.repeated = optionData;
        break;
      default:
        break;
    }
  }
  const userWord = { ...newUserWord, optional };
  return { ...wordObject, userWord };
};

export const checkUserWordById = (userWords, wordId) => {
  const existendWord = userWords.find((word) => word.id === wordId);
  return existendWord;
};

export const generateSpacingRepeatingTemplate = () => (
  []
);

export const getWordsDiffAndComplicated = ({ difficulty, optional }) => (
  {
    isRemoved: optional.removed,
    isComplicated: difficulty === levelsOfDifficulty.HARD,
  }
);
