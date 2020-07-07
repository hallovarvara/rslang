import {
  generateStatsTemplate,
  generateSettingsTemplate,
  generateUserWordsTemplate,
  generateSpacingRepeatingTemplate,
} from './dataModels';

export const localThings = {
  RSLANG_USER_STATISTICS: 'rslangUserStatistics',
  RSLANG_USER_WORDS: 'rslangUserWords',
  RSLANG_USER_SETTINGS: 'rslangUserSettings',
  RSLANG_USER_REPEATING: 'rslangUserRepeating',
};

export const checkForLocalThing = (thingName, templateGenerator) => (
  !localStorage.getItem(thingName)
    ? templateGenerator()
    : JSON.parse(localStorage.getItem(thingName))
);

export const checkForStatistics = () => (
  checkForLocalThing(localThings.RSLANG_USER_STATISTICS, generateStatsTemplate)
);

export const saveLocalStatistics = (statsObject) => {
  localStorage.setItem(localThings.RSLANG_USER_STATISTICS, JSON.stringify({ ...statsObject }));
};

export const checkForUserWords = () => (
  checkForLocalThing(localThings.RSLANG_USER_WORDS, generateUserWordsTemplate)
);

export const saveLocalUserWord = (wordObject) => {
  if (!localStorage.getItem(localThings.RSLANG_USER_WORDS)) {
    localStorage.setItem(localThings.RSLANG_USER_WORDS, JSON.stringify([wordObject]));
  } else {
    const words = JSON.parse(localStorage.getItem(localThings.RSLANG_USER_WORDS));
    let updatedWords = [];
    if (words.findIndex() !== -1) {
      updatedWords = words.map((word) => (word.id === wordObject.id
        ? { ...word, ...wordObject }
        : word));
    } else {
      updatedWords = [...words, wordObject];
    }
    localStorage.setItem(localThings.RSLANG_USER_WORDS, JSON.stringify([...updatedWords]));
  }
  console.log(wordObject);
  return { ...wordObject };
};

export const checkForSettings = () => (
  checkForLocalThing(localThings.RSLANG_USER_SETTINGS, generateSettingsTemplate)
);

export const saveLocalSettings = (settings) => {
  localStorage.setItem(localThings.RSLANG_USER_SETTINGS, JSON.stringify({ ...settings }));
};

export const checkForSpacingRepeating = () => (
  checkForLocalThing(localThings.RSLANG_USER_REPEATING, generateSpacingRepeatingTemplate)
);

export const saveSpacingRepeating = (repeatingArray, wordObject, twice = false) => {
  const newWords = twice ? [wordObject, ...repeatingArray, wordObject] : [wordObject];
  localStorage.setItem(localThings.RSLANG_USER_REPEATING, JSON.stringify(newWords));
};

export const getStatsToSaveInBack = () => (
  JSON.parse(localStorage.getItem(localThings.RSLANG_USER_STATISTICS))
);

export const getWordsToSaveInBack = () => (
  JSON.parse(localStorage.getItem(localThings.RSLANG_USER_WORDS))
);

export const getSettingsToSaveInBack = () => (
  JSON.parse(localStorage.getItem(localThings.RSLANG_USER_SETTINGS))
);

export const clearStats = () => {
  localStorage.removeItem(localThings.RSLANG_USER_STATISTICS);
};

export const clearWords = () => {
  localStorage.removeItem(localThings.RSLANG_USER_WORDS);
};

export const clearSettings = () => {
  localStorage.removeItem(localThings.RSLANG_USER_SETTINGS);
};
