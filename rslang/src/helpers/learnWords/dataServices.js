import { levelsOfDifficulty } from '../constants';
import {
  checkForStatistics,
  saveLocalStatistics,
  checkForUserWords,
  saveLocalUserWord,
  checkForSettings,
  saveLocalSettings,
  checkForSpacingRepeating,
  saveSpacingRepeating,
} from './storageModel';
import {
  changeStats,
  checkForCurrentUserWord,
  changeUserWord,
  userWordThings,
  changeSettings,
} from './dataModels';
import { calculateLearnRate } from './spacingRepeating';

export const prepareWordObject = (wordObject) => {
  const userWords = checkForUserWords();
  return checkForCurrentUserWord(userWords, wordObject.id);
};

export const updateUserWord = (userOption, optionData, wordObject) => {
  const newWord = changeUserWord(userOption, optionData, wordObject);
  saveLocalUserWord(newWord);
};

export const updateUserWordRate = (wordObject, level = levelsOfDifficulty.HARD) => {
  const current = prepareWordObject(wordObject);
  const prevRate = current.userWord.optional.rate;
  const rate = calculateLearnRate(prevRate, level);
  updateUserWord(userWordThings.RATE, rate, wordObject);
};

export const updateUserWordDifficulty = (wordObject) => {
  const current = prepareWordObject(wordObject);
  const { difficulty } = current.userWord;
  updateUserWord(userWordThings.DIFFICULTY, !difficulty, current);
};

export const updateUserWordRemoved = (wordObject) => {
  const current = prepareWordObject(wordObject);
  const removed = current.userWord.optional;
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

export const updateRepeatingWords = (wordObject, twice) => {
  const repeating = checkForSpacingRepeating();
  saveSpacingRepeating(repeating, wordObject, twice);
};
