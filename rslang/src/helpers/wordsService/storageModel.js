import {
  statsGameTemplate,
  statsLearnTemplate,
  generateStatsTemplate,
  generateSettingsTemplate,
  generateUserWordsTemplate,
  generateSpacingRepeatingTemplate,
} from './dataModels';
import { applicationThings } from '../constants';

export const localThings = {
  STATISTICS: 'rslangUserStatistics',
  WORDS: 'rslangUserWords',
  SETTINGS: 'rslangUserSettings',
};

export const sessionThings = {
  WORDS: 'rslangSessionWords',
  REPEATING: 'rslangSessionRepeating',
};

export const gameSessionThings = {
  learnWords: 'rslangLearnWordsSession',
  savannah: 'rslangSavannahSession',
  sprint: 'rslangSprintSession',
  audiocall: 'rslangAudiocallSession',
  speakIt: 'rslangSpeakItSession',
  puzzle: 'rslangPuzzleSession',
  unmess: 'rslangUnmessSession',
};

export const checkForLocalThing = (thingName, templateGenerator) => (
  !localStorage.getItem(thingName)
    ? templateGenerator()
    : JSON.parse(localStorage.getItem(thingName))
);

export const getSessionThing = (thingName, template) => (
  !localStorage.getItem(thingName)
    ? template
    : JSON.parse(localStorage.getItem(thingName))
);

export const checkForessionThing = (thingName) => {
  let template = {};
  if (thingName === applicationThings.LEARN_WORDS) {
    template = { ...statsLearnTemplate };
  } else {
    template = { ...statsGameTemplate };
    delete template.games;
    if (thingName === applicationThings.PUZZLE) {
      delete template.right;
    }
  }
  return getSessionThing(gameSessionThings[thingName], template);
};

export const saveSessionThing = (thingName, thingValue) => {
  localStorage.setItem(gameSessionThings[thingName], JSON.stringify(thingValue));
};

export const checkForStatistics = () => (
  checkForLocalThing(localThings.STATISTICS, generateStatsTemplate)
);

export const saveLocalStatistics = (statsObject) => {
  localStorage.setItem(localThings.STATISTICS, JSON.stringify({ ...statsObject }));
};

export const checkForUserWords = (storage = sessionThings) => (
  checkForLocalThing(storage.WORDS, generateUserWordsTemplate)
);

export const saveLocalUserWord = (wordObject, storage = sessionThings) => {
  if (!localStorage.getItem(storage.WORDS)) {
    localStorage.setItem(storage.WORDS, JSON.stringify([wordObject]));
  } else {
    const words = JSON.parse(localStorage.getItem(storage.WORDS));
    let updatedWords = [];
    if (words.findIndex((el) => el.id === wordObject.id) !== -1) {
      updatedWords = words.map((word) => (word.id === wordObject.id
        ? { ...word, ...wordObject }
        : word));
    } else {
      updatedWords = [...words, wordObject];
    }
    localStorage.setItem(storage.WORDS, JSON.stringify([...updatedWords]));
  }
};

export const checkForSettings = () => (
  checkForLocalThing(localThings.SETTINGS, generateSettingsTemplate)
);

export const saveLocalSettings = (settings) => {
  localStorage.setItem(localThings.SETTINGS, JSON.stringify({ ...settings }));
};

export const checkForSpacingRepeating = () => (
  checkForLocalThing(sessionThings.REPEATING, generateSpacingRepeatingTemplate)
);

export const saveSpacingRepeating = (repeatingArray, wordObject, twice = false) => {
  const newWords = twice ? [wordObject, ...repeatingArray, wordObject] : [wordObject];
  localStorage.setItem(sessionThings.REPEATING, JSON.stringify(newWords));
};

export const getDataFromStorage = (storage, data) => (
  JSON.parse(localStorage.getItem(storage[data]))
);

export const clearStorageData = (storage) => {
  Object.values(storage).forEach((el) => {
    localStorage.removeItem(el);
  });
};

export const clearLocalUserData = () => clearStorageData(localThings);

export const getSessionData = (thingName) => (
  JSON.parse(localStorage.getItem(gameSessionThings[thingName]))
);

export const clearSessionData = (thingName) => {
  localStorage.removeItem(gameSessionThings[thingName]);
  clearStorageData(sessionThings);
};

// TODO: check for rate >- 30!!!!
