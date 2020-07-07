import moment from 'moment';
import {
  applicationThings,
  userSettingsTemplate,
  dateFormatTemplate,
} from '../constants';

export const userWordTemplate = {
  difficulty: '',
  optional: {
    rate: 0,
    next: '',
    removed: false,
    repeated: 0,
  },
};

export const userWordThings = {
  DIFFICULTY: 'difficulty',
  OPTIONAL: 'optional',
  RATE: 'rate',
  NEXT: 'next',
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
  remoded: 0,
};

export const statsPuzzleTemplate = {
  games: 0,
  wrong: 0,
};

export const checkStatsThingTemplate = (thing) => {
  switch (thing) {
    case applicationThings.LEARN_WORDS:
      return statsLearnTemplate;
    default:
      return {};
  }
};

export const generateStatsTemplate = () => {
  const stats = {};
  Object.values(applicationThings).forEach((thing) => {
    stats[thing] = checkStatsThingTemplate(thing);
  });
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

  updated = current
    ? { ...sumObjectProps(current, optionData) }
    : { ...sumObjectProps(statsGameTemplate, optionData) };
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
      current = optional[statsOption] || {
        ...statsLearnTemplate,
      };
      updated = {
        ...sumObjectProps(current, optionData),
      };
      break;
    case applicationThings.PUZZLE:
      current = optional[statsOption] || { ...statsPuzzleTemplate };
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
// .....................................................................

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
// .....................................................................

export const generateUserWordsTemplate = () => (
  []
);

export const createUserWord = (wordObject) => {
  const userWord = { wordId: wordObject.id, ...userWordTemplate };
  return { ...wordObject, userWord };
};

export const convertDate = (days) => (
  days === 0
    ? moment().format(dateFormatTemplate)
    : moment().add(days, 'days').format(dateFormatTemplate)
);

export const changeUserWord = (userOption, optionData, wordObject) => {
  const newUserWord = { ...wordObject.userWord };
  const { optional } = newUserWord;
  if (userOption === userWordThings.DIFFICULTY) {
    newUserWord[userWordThings.DIFFICULTY] = optionData;
  } else {
    switch (userOption) {
      case userWordThings.RATE:
        optional.rate = optionData;
        optional.next = convertDate(optionData);
        optional.repeated += 1;
        break;
      case userWordThings.REMOVED:
        optional.removed = optionData;
        break;
      default:
        break;
    }
  }
  const userWord = { ...newUserWord, optional };
  return { ...wordObject, userWord };
};

export const checkUserWordById = (userWords, wordId) => (
  userWords.find((word) => word.id === wordId)
);

export const checkForCurrentUserWord = (userWords, wordId) => (
  userWords.length > 0
    ? checkUserWordById(userWords, wordId) || createUserWord()
    : createUserWord()
);

export const generateSpacingRepeatingTemplate = () => (
  []
);
