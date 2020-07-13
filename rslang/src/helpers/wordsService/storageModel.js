import {
  statsGameTemplate,
  statsLearnTemplate,
  generateStatsTemplate,
  generateSettingsTemplate,
  generateUserWordsTemplate,
  generateSpacingRepeatingTemplate,
} from './dataModels';
import { applicationThings } from '../constants';

export const storageThingNames = {
  STATISTICS: 'STATISTICS',
  WORDS: 'WORDS',
  SETTINGS: 'SETTINGS',
  LEARNING: 'LEARNING',
  NEW_WORDS: 'NEW_WORDS',
};

export const localThings = {
  STATISTICS: 'rslangUserStatistics',
  WORDS: 'rslangUserWords',
  SETTINGS: 'rslangUserSettings',
};

export const sessionThings = {
  LEARNING: 'rslangSessionLearningWords',
  WORDS: 'rslangSessionWords',
  NEW_WORDS: 'rslangNewWords',
  // REPEATING: 'rslangSessionRepeating',
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
  let template;
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

export const checkForUserWords = (
  storage = sessionThings,
  storageThing = storageThingNames.WORDS,
) => checkForLocalThing(storage[storageThing], generateUserWordsTemplate);

export const saveLocalUserWord = (
  wordObject,
  storage = sessionThings,
  storageThing = storageThingNames.WORDS,
) => {
  const areWordsStored = localStorage.getItem(storage[storageThing]);
  console.log(areWordsStored, wordObject, storage, storageThing);
  if (!areWordsStored) {
    localStorage.setItem(storage[storageThing], JSON.stringify([wordObject]));
  } else {
    const words = JSON.parse(localStorage.getItem(storage[storageThing]));
    const isWordStored = words.findIndex((el) => el.id === wordObject.id) !== -1;

    let updatedWords = [];
    if (isWordStored) {
      updatedWords = words.map((word) => (word.id === wordObject.id
        ? { ...word, ...wordObject }
        : word));
    } else {
      updatedWords = [...words, wordObject];
    }

    localStorage.setItem(
      storage[storageThing],
      JSON.stringify([...updatedWords]),
    );
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

// export const saveSpacingRepeating = (repeatingArray, wordObject, twice = false) => {
//   const newWords = twice
//     ? [wordObject, ...repeatingArray, wordObject]
//     : [...repeatingArray, wordObject];
//   localStorage.setItem(sessionThings.REPEATING, JSON.stringify(newWords));
// };

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

export const checkForNewUserWordsIds = () => (
  !localStorage.getItem(sessionThings.NEW_WORDS)
    ? []
    : JSON.parse(localStorage.getItem(sessionThings.NEW_WORDS))
);

export const saveNewUserWordId = (wordId) => {
  const words = checkForNewUserWordsIds();
  localStorage.setItem(sessionThings.NEW_WORDS, JSON.stringify([...words, wordId]));
};

export const getNewWordsIds = () => (
  JSON.parse(localStorage.getItem(sessionThings.NEW_WORDS))
);
