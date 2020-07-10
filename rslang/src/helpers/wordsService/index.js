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
} from './storageModel';
import {
  changeStats,
  checkForCurrentUserWord,
  changeUserWord,
  userWordThings,
  changeSettings,
  getWordsDiffAndComplicated,
  statsThingNames,
  changeSessionStatsObject,
} from './dataModels';
import { calculateLearnRate, calculateGameNext } from './spacingRepeating';

export const prepareWordObject = (wordObject) => {
  const userWords = checkForUserWords();
  return checkForCurrentUserWord(userWords, wordObject);
};

export const updateRepeatingWords = (wordObject, twice) => {
  const repeating = checkForSpacingRepeating();
  saveSpacingRepeating(repeating, wordObject, twice);
};

export const convertDifficultLevelToRepeats = (level) => (
  level === levelsOfDifficulty.HARD
);

export const updateUserWord = (
  userOption,
  optionData,
  oldRepeated,
  wordObject,
  level,
  thingName,
) => {
  const newWord = changeUserWord(userOption, optionData, oldRepeated, wordObject);
  saveLocalUserWord(newWord);
  if (thingName === applicationThings.LEARN_WORDS) {
    if (level !== levelsOfDifficulty.EASY && userOption === userWordThings.RATE) {
      const twice = convertDifficultLevelToRepeats(level);
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
  const { oldRate, oldRepeated, oldNext } = getOldData(wordObject);
  const current = prepareWordObject(wordObject);
  if (thingName === applicationThings.LEARN_WORDS) {
    const rate = calculateLearnRate(oldRate, level);
    updateUserWord(userWordThings.RATE, rate, oldRepeated, current, level, thingName);
  } else {
    const newNext = calculateGameNext(oldNext);
    updateUserWord(userWordThings.NEXT, newNext, oldRepeated, current, level, thingName);
  }
};

export const updateUserWordDifficulty = (wordObject) => {
  const current = prepareWordObject(wordObject);
  const { difficulty } = current.userWord;
  updateUserWord(userWordThings.DIFFICULTY, !difficulty, current);
};

export const updateUserWordRemoved = (wordObject) => {
  const current = prepareWordObject(wordObject);
  const { removed } = current.userWord.optional;
  updateUserWord(userWordThings.REMOVED, !removed, current);
};

export const updateStats = (statsOption, optionData) => {
  const stats = checkForStatistics();
  const newStats = changeStats(statsOption, optionData, stats);
  saveLocalStatistics(newStats);
};

export const updateSettings = (settingOption) => {
  const settings = checkForSettings();
  const newSettings = changeSettings(settingOption, settings);
  saveLocalSettings(newSettings);
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

export const saveGameResults = (thingName) => {
  const results = getGameSessionResults(thingName);
  updateStats(thingName, results);
};
