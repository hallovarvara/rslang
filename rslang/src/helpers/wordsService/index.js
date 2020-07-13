import { levelsOfDifficulty, applicationThings } from '../constants';
import {
  checkForStatistics,
  saveLocalStatistics,
  checkForUserWords,
  saveLocalUserWord,
  checkForSettings,
  saveLocalSettings,
  checkForSpacingRepeating,
  saveSpacingRepeating,
  checkForessionThing,
  saveSessionThing,
  getSessionData,
  clearSessionData,
  clearLocalUserData,
  localThings,
  saveNewUserWordId,
  getNewWordsIds,
} from './storageModel';
import {
  changeStats,
  createUserWord,
  changeUserWord,
  userWordThings,
  changeSettings,
  getWordsDiffAndComplicated,
  statsThingNames,
  changeSessionStatsObject,
  convertStamp,
} from './dataModels';
import { filterByThing, shufleWordsArray } from './wordsFilters';
import { calculateLearnRate, calculateGameNext } from './spacingRepeating';

export const randomizeArray = (arrayOfWords) => {
  shufleWordsArray(arrayOfWords);
};

export const prepareWordObject = (wordObject) => {
  let newWordObject;
  if (!wordObject?.userWord) {
    saveNewUserWordId(wordObject.id);
    newWordObject = createUserWord(wordObject);
  } else {
    newWordObject = { ...wordObject };
  }
  return newWordObject;
};

export const updateRepeatingWords = (wordObject, twice) => {
  const repeating = checkForSpacingRepeating();
  saveSpacingRepeating(repeating, wordObject, twice);
};

export const updateUserWord = (
  userOption,
  optionData,
  oldRepeated,
  stamp,
  wordObject,
  level,
  thingName,
) => {
  const newWord = changeUserWord(userOption, optionData, oldRepeated, stamp, wordObject);
  saveLocalUserWord(newWord);
  if (thingName === applicationThings.LEARN_WORDS) {
    if (level !== levelsOfDifficulty.EASY && userOption === userWordThings.RATE) {
      const twice = level === levelsOfDifficulty.HARD;
      updateRepeatingWords(newWord, twice);
    }
  }
};

const getOldData = ({ userWord }) => (
  {
    oldRate: userWord?.optional?.rate || 0,
    oldRepeated: userWord?.optional?.repeated || 0,
    oldNext: userWord?.optional?.next || '',
  }
);

export const updateUserWordRate = (
  wordObject,
  thingName,
  level = levelsOfDifficulty.HARD,
) => {
  const current = prepareWordObject(wordObject);
  const { oldRate, oldRepeated } = getOldData(wordObject);
  if (thingName === applicationThings.LEARN_WORDS) {
    const rate = calculateLearnRate(oldRate, level);
    const stamp = convertStamp(rate);
    updateUserWord(userWordThings.RATE, rate, oldRepeated, stamp, current, level, thingName);
  } else {
    const newNext = calculateGameNext();
    const stamp = convertStamp(0, newNext);
    updateUserWord(userWordThings.NEXT, newNext, oldRepeated, stamp, current, level, thingName);
  }
};

export const updateUserWordDifficulty = (wordObject) => {
  const current = prepareWordObject(wordObject);
  const { difficulty } = current.userWord;
  updateUserWord(userWordThings.DIFFICULTY, !difficulty, null, null, current);
};

export const updateUserWordRemoved = (wordObject) => {
  const current = prepareWordObject(wordObject);
  const { removed } = current.userWord.optional;
  updateUserWord(userWordThings.REMOVED, !removed, null, null, current);
};

export const updateUserWordRepeated = (wordObject) => {
  const current = prepareWordObject(wordObject);
  const { repeated } = current.userWord.optional;
  updateUserWord(userWordThings.REPEATED, repeated + 1, null, null, current);
};

export const updateStats = (statsOption, optionData) => {
  const stats = checkForStatistics();
  const newStats = changeStats(statsOption, optionData, stats);
  saveLocalStatistics(newStats);
};

export const updateStatsObject = (statsOption, optionData, currentStats) => (
  changeStats(statsOption, optionData, currentStats)
);

export const updateSettings = (settingOption) => {
  const settings = checkForSettings();
  const newSettings = changeSettings(settingOption, settings);
  saveLocalSettings(newSettings);
};

export const prepareUserWordsToServer = (arrayOfWords) => (
  arrayOfWords.map((el) => ({ wordId: el.id, word: { ...el.userWord } }))
);

export const getSettings = () => checkForSettings();

export const getStatistics = () => checkForStatistics();

export const getWords = () => checkForUserWords(localThings);

export const saveLocalUserInfoToServer = () => ({
  settings: getSettings() || {},
  statistics: getStatistics() || {},
  words: prepareUserWordsToServer(getWords()) || [],
});

export const getDayLocalUserWords = (dayLimit) => {
  const userWords = getWords();
  return filterByThing(userWords, userWordThings.NEXT, dayLimit)
    || filterByThing(userWords, userWordThings.STAMP, dayLimit);
};

export const getComplicatedWords = (dayLimit) => {
  const userWords = getWords();
  return filterByThing(userWords, userWordThings.DIFFICULTY, dayLimit);
};

export const getDiffAndCoplicatedInProgress = (arrayOfWordsObjects, template) => (
  arrayOfWordsObjects.map((wordObject) => (wordObject?.userWord
    ? { ...template, ...getWordsDiffAndComplicated(wordObject?.userWord) }
    : { ...template }))
);

export const saveDataToSessionStats = (thingName, keyName, keyValue = 1) => {
  const current = checkForessionThing(thingName);
  const updated = changeSessionStatsObject(current, keyName, keyValue);
  saveSessionThing(thingName, updated);
};

export const saveRightToGamesStats = (thingName) => {
  saveDataToSessionStats(thingName, statsThingNames.RIGHT);
};

export const saveWrongToGamesStats = (thingName) => {
  saveDataToSessionStats(thingName, statsThingNames.WRONG);
};

export const getGameSessionResults = (thingName) => (
  getSessionData(thingName)
);

export const clearGameSessionResults = (thingName) => {
  clearSessionData(thingName);
};

export const clearLocalUserInfo = () => {
  clearLocalUserData();
};

export const calculateLearnWordsResults = (arrayOfWords) => {
  const stats = {};
  stats.inProgress = arrayOfWords.filter((el) => el?.userWord?.optional?.repeated <= 2).length;
  stats.complicated = arrayOfWords.filter((el) => el?.userWord?.difficulty).length;
  stats.removed = arrayOfWords.filter((el) => el?.userWord?.optional?.removed).length;
  return stats;
};

export const saveGameResults = (thingName) => {
  let results;
  if (thingName === applicationThings.LEARN_WORDS) {
    const sessionWords = checkForUserWords();
    results = calculateLearnWordsResults(sessionWords);
  } else {
    results = getGameSessionResults(thingName);
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
  const notDone = arrayOfWords.filter((el) => el?.userWord?.optional?.rate < 31);
  return {
    learned: arrayOfWords.length - notDone.length,
    words: notDone,
  };
};

export const saveSessionWordsToLocal = () => {
  const sessionWords = checkForUserWords();
  if (sessionWords) {
    sessionWords.forEach((el) => {
      saveLocalUserWord(el, localThings);
    });
  }
};

export const saveSessionInfoToLocal = (thingName) => {
  saveSessionWordsToLocal();
  saveGameResults(thingName);
  clearGameSessionResults(thingName);
};

export const prepareSessionInfoToServer = (thingName) => {
  const sessionWords = checkForUserWords();
  const stats = thingName === applicationThings.LEARN_WORDS
    ? calculateLearnWordsResults(sessionWords)
    : getGameSessionResults(thingName);
  const checked = checkForDone(sessionWords);
  const { newWords, userWords } = separateSessionWords(checked.words);
  if (thingName === applicationThings.LEARN_WORDS) {
    stats.completed += checked.learned;
    stats.inProgress -= checked.learned;
  }
  return {
    stats,
    newWords,
    userWords,
  };
};
