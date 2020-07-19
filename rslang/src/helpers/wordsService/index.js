import { applicationThings } from '../constants';
import {
  checkForStatistics,
  saveLocalStatistics,
  checkForUserWords,
  saveLocalUserWord,
  checkForSettings,
  saveLocalSettings,
  checkForSessionThing,
  saveSessionThing,
  getSessionData,
  clearSessionData,
  clearLocalUserData,
  localThings,
  saveNewUserWordId,
  getNewWordsIds,
  sessionThings,
  storageThingNames,
} from './storageModel';
import {
  createUserWord,
  changeUserWord,
  userWordThings,
  changeSettings,
  convertStamp,
  convertDate,
  removedTemplate,
} from './dataModels';
import {
  filterByThing,
} from './wordsFilters';
import { calculateLearnRate, calculateGameNext } from './spacingRepeating';
import {
  changeSessionStatsObject,
  changeStats,
  statsThingNames,
} from './statsModel';

export const prepareWordObject = (wordObject) => {
  let newWordObject;
  if (!wordObject?.userWord) {
    saveNewUserWordId(wordObject);
    newWordObject = createUserWord(wordObject);
  } else {
    newWordObject = { ...wordObject };
  }
  return newWordObject;
};

const getOldData = ({ userWord }) => (
  {
    oldRate: userWord?.optional?.rate || 0,
    oldRepeated: userWord?.optional?.repeated || 0,
    oldNext: userWord?.optional?.next || '',
  }
);

export const updateGameRate = (wordObject) => {
  const current = prepareWordObject(wordObject);
  const next = calculateGameNext();
  const stamp = convertStamp(0, next);
  const newWord = changeUserWord(current, { stamp, next });
  saveLocalUserWord(newWord);
};

export const updateLearnWordsRate = (wordObject, level) => {
  const current = prepareWordObject(wordObject);
  const { oldRate } = getOldData(wordObject);
  const rate = calculateLearnRate(oldRate, level);
  const stamp = convertStamp(rate);
  const next = convertDate(rate);
  const repeated = 1;
  return changeUserWord(current, {
    stamp, rate, next, repeated,
  });
};

export const updateUserWordDifficulty = (wordObject) => {
  const current = prepareWordObject(wordObject);
  const { difficulty } = current.userWord;
  current.userWord.difficulty = !difficulty;
  return { ...current };
};

export const updateUserWordRemoved = (wordObject) => {
  const current = prepareWordObject(wordObject);
  const { removed } = current.userWord.optional;
  current.userWord.optional.removed = !removed;
  return { ...current };
};

export const updateUserWordRepeated = (wordObject) => {
  const current = prepareWordObject(wordObject);
  const { repeated } = current.userWord.optional;
  current.userWord.optional.repeated = repeated + 1;
  return { ...current };
};

export const updateStats = (statsOption, optionData) => {
  const stats = checkForStatistics();
  const newStats = changeStats(statsOption, optionData, stats);
  console.log(stats, newStats);
  saveLocalStatistics(newStats);
};

// for web API
export const updateStatsObject = (statsOption, optionData, currentStats) => (
  changeStats(statsOption, optionData, currentStats)
);

export const updateSettings = (settingOption) => {
  const settings = checkForSettings();
  const newSettings = changeSettings(settingOption, settings);
  saveLocalSettings(newSettings);
};

// ----------------------------------------------------------------------

export const prepareUserWordsToServer = (arrayOfWords) => {
  const idTemplate = '_id';
  return arrayOfWords.map((el) => ({ wordId: el.id || el[idTemplate], word: { ...el.userWord } }));
};

export const getSettings = () => checkForSettings();

export const getStatistics = () => checkForStatistics();

export const getWords = () => checkForUserWords(localThings);

export const saveLocalUserInfoToServer = () => ({
  settings: getSettings() || {},
  statistics: getStatistics() || {},
  words: prepareUserWordsToServer(getWords()) || [],
});

// ----------------------------------------------------------------------

export const getDayLocalUserWords = (dayLimit) => {
  const userWords = getWords();
  return filterByThing(userWords, userWordThings.NEXT, dayLimit)
    || filterByThing(userWords, userWordThings.STAMP, dayLimit);
};

export const getComplicatedWords = (dayLimit) => {
  const userWords = getWords();
  return filterByThing(userWords, userWordThings.DIFFICULTY, dayLimit);
};

export const saveDataToSessionStats = (thingName, keyName, keyValue = 1) => {
  const current = checkForSessionThing(thingName);
  const updated = changeSessionStatsObject(current, keyName, keyValue);
  saveSessionThing(thingName, updated);
};

export const handleGameRightAnswer = (thingName, wordObject) => {
  saveDataToSessionStats(thingName, statsThingNames.RIGHT);
  prepareWordObject(wordObject);
};

export const handleGameWrongAnswer = (thingName, wordObject) => {
  saveDataToSessionStats(thingName, statsThingNames.WRONG);
  updateGameRate(wordObject);
};

export const clearLocalUserInfo = () => {
  clearLocalUserData();
};

// TODO Stats
export const calculateLearnWordsResults = (arrayOfWords) => {
  const stats = {};
  stats.learned = arrayOfWords.filter((el) => el?.userWord?.optional?.rate >= 31).length;
  stats.inScope = arrayOfWords.filter((el) => el?.userWord).length;
  stats.semiLearned = arrayOfWords.filter((el) => el?.userWord?.optional?.rate >= 15).length;
  stats.complicated = arrayOfWords.filter((el) => el?.userWord?.difficulty).length;
  stats.removed = arrayOfWords.filter((el) => el?.userWord?.optional?.removed).length;
  return stats;
};

// TODO Stats
export const saveGameResults = (thingName) => {
  let results;
  if (thingName === applicationThings.LEARN_WORDS) {
    const sessionWords = checkForUserWords(sessionThings, storageThingNames.LEARNING);
    results = calculateLearnWordsResults(sessionWords);
    console.log(results);
  } else {
    results = getSessionData(thingName);
  }
  updateStats(thingName, results);
};

export const separateSessionWords = (arrayOfWords) => {
  const newWords = [];
  const userWords = [];
  const newWordsIds = getNewWordsIds();
  arrayOfWords.forEach((el) => {
    if (newWordsIds.includes(el.id)) {
      newWords.push(el);
    } else {
      userWords.push(el);
    }
  });
  return {
    newWords,
    userWords,
  };
};

export const checkForDone = (arrayOfWords) => {
  const result = arrayOfWords.map((el) => (el?.userWord?.optional?.rate >= 31
    ? { ...el, userWord: removedTemplate }
    : el));
  return result.filter((el) => el?.userWord?.optional?.rate < 31);
};

export const saveSessionWordsToLocal = (thingName) => {
  const storaThing = thingName === applicationThings.LEARN_WORDS
    ? storageThingNames.LEARNING
    : storageThingNames.WORDS;
  const sessionWords = checkForUserWords(sessionThings, storaThing);
  const checked = checkForDone(sessionWords);
  if (checked) {
    checked.forEach((el) => {
      saveLocalUserWord(el, localThings);
    });
  }
};

export const saveSessionInfoToLocal = (thingName) => {
  saveSessionWordsToLocal(thingName);
  saveGameResults(thingName);
  clearSessionData(thingName);
};

export const prepareSessionInfoToServer = (thingName, statsObject) => {
  const storaThing = thingName === applicationThings.LEARN_WORDS
    ? storageThingNames.LEARNING
    : storageThingNames.WORDS;
  const sessionWords = checkForUserWords(sessionThings, storaThing);
  const statsResults = thingName === applicationThings.LEARN_WORDS
    ? calculateLearnWordsResults(sessionWords)
    : getSessionData(thingName);
  const stats = changeStats(thingName, statsResults, statsObject);
  const checked = checkForDone(sessionWords);
  const { newWords, userWords } = separateSessionWords(checked);
  return {
    stats,
    newWords: prepareUserWordsToServer(newWords),
    userWords: prepareUserWordsToServer(userWords),
  };
};
