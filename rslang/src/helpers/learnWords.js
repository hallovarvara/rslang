import moment from 'moment';
import {
  applicationThings,
  userSettingsTemplate,
} from './constants';

export const dateFormatTemplate = 'DD.MM.YYYY';

export const userWordTemplte = {
  difficulty: 'easy',
  optional: {
    rate: 0,
    nextTime: '',
    removed: false,
  },
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

export const convertDate = (days) => (
  days === 0
    ? moment().format(dateFormatTemplate)
    : moment().add(days, 'days').format(dateFormatTemplate)
);

export const createLocalUserWord = (wordObject) => {
  const newWord = { ...userWordTemplte };
  // newWord.nextTime = moment().add(1, 'days').format(dateFormatTemplate);
  return { wordId: wordObject.id, word: newWord };
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

export const generateSettingsTemplate = () => {
  const settings = {};
  Object.values(userSettingsTemplate).forEach((setting) => {
    settings[setting] = true;
  });
  return settings;
};

export const encreaseRate = (wordObject) => {
  const { rate } = wordObject;
  const updated = { ...wordObject };
  switch (rate) {
    case 0:
      updated.rate = 1;
      updated.next = convertDate(1);
      break;
    case 1:
      updated.rate = 2;
      updated.next = convertDate(2);
      break;
    case 2:
      updated.rate = 4;
      updated.next = convertDate(4);
      break;
    case 4:
      updated.rate = 7;
      updated.next = convertDate(7);
      break;
    case 7:
      updated.rate = 30;
      updated.next = convertDate(30);
      break;
    default:
      updated.rate = '';
      updated.next = '';
      break;
  }
  return updated;
};

export const decreaseRate = (wordObject) => {
  const { rate } = wordObject;
  const updated = { ...wordObject };
  switch (rate) {
    case 0:
      updated.rate = 0;
      updated.next = convertDate(0);
      break;
    case 1:
      updated.rate = 0;
      updated.next = convertDate(0);
      break;
    case 2:
      updated.rate = 1;
      updated.next = convertDate(1);
      break;
    case 4:
      updated.rate = 2;
      updated.next = convertDate(2);
      break;
    case 7:
      updated.rate = 4;
      updated.next = convertDate(4);
      break;
    case 30:
      updated.rate = 7;
      updated.next = convertDate(7);
      break;
    default:
      updated.rate = '';
      updated.next = '';
      break;
  }
  return updated;
};

export const toggleLocalUserWordRemoved = (word) => {
  const updated = word;
  const { removed } = updated.optional;
  updated.optional.removed = !removed;
  return { ...updated };
};

export const changeLocalUserWordDifficulty = (word, level) => {
  const updated = word;
  updated.difficulty = level;
  return { ...updated };
};

export const aggregateLocalUserWord = (wordObject) => {
  let userWord = {};
  if (!wordObject?.userWord) {
    userWord = createLocalUserWord(wordObject);
  }
  return { ...wordObject, userWord };
};

export const saveLocalUserWord = (wordObject) => {
  if (!localStorage.getItem('rslangUserWords')) {
    localStorage.setItem('rslangUserWords', JSON.stringify([wordObject]));
  } else {
    const words = JSON.parse(localStorage.getItem('rslangUserWords'));
    let updatedWords = [];
    if (words.findIndex() !== -1) {
      updatedWords = words.map((word) => (word.id === wordObject.id
        ? { ...word, ...wordObject }
        : word));
    } else {
      updatedWords = [...words, wordObject];
    }
    localStorage.setItem('rslangUserWords', JSON.stringify([...updatedWords]));
  }
};

export const changeStats = (appThing, newData, oldData) => {
  const today = moment().format('DD.MM.YYYY');
  let updated = {};
  switch (appThing) {
    case applicationThings.LEARN_WORDS:
      updated = {
        ...oldData,
        ...newData,
      };
      break;
    case applicationThings.PUZZLE:
      updated = {
        games: oldData.games + 1,
        wrong: newData.wrong,
      };
      break;
    default:
      updated = oldData[today]
        ? oldData[today]
        : { [today]: statsGameTemplate() };
      updated[today] = {
        games: updated.games + 1,
        wrong: updated.wrong + newData.wrong,
        right: updated.right + newData.right,
      };
  }
  return updated;
};

export const saveLocalStatistics = (appThing, data) => {
  let stats = {};
  if (!localStorage.getItem('rslangUserStatistics')) {
    stats = generateStatsTemplate();
  } else {
    stats = JSON.parse(localStorage.getItem('rslangUserStatistics'));
  }
  const { optional } = stats;
  const updated = changeStats(appThing, data, optional[appThing]);
  const newOtional = { ...optional, ...updated };
  const newStats = { ...stats, optional: { ...newOtional } };
  localStorage.setItem('rslangUserStatistics', JSON.stringify({ ...newStats }));
};

export const saveLocalSettings = ({ option, value }) => {
  let settings = {};
  if (!localStorage.getItem('rslangUserSettings')) {
    settings = generateSettingsTemplate();
    settings[option] = value;
  } else {
    settings = localStorage.getItem('rslangUserSettings');
    settings[option] = value;
  }
  localStorage.setItem('rslangUserSettings', JSON.stringify({ ...settings }));
};

export const saveSpacingRepeating = (wordObject) => {
  if (!localStorage.getItem('rslangRepeating')) {
    localStorage.setItem('rslangRepeating', [wordObject]);
  } else {
    const repeating = localStorage.getItem('rslangRepeating');
    localStorage.setItem('rslangRepeating', [...repeating, wordObject]);
  }
};
