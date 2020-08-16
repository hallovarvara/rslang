import {
  settingsTemplate,
} from './dataModels';
import { applicationThings } from '../constants';
import {
  statsTemplate,
  statsLearnObjTemplate,
  statsGameObjTemplate,
} from './statsModel';

export const storageThingNames = {
  STATISTICS: 'STATISTICS',
  WORDS: 'WORDS',
  SETTINGS: 'SETTINGS',
  LEARNING: 'LEARNING',
  NEW_WORDS: 'NEW_WORDS',
};

export const localThings = {
  STATISTICS: 'backupUsSt',
  WORDS: 'backupUsWrd',
  SETTINGS: 'backupUsSet',
};

export const sessionThings = {
  LEARNING: 'backupSesLW',
  WORDS: 'backupSesWords',
  NEW_WORDS: 'backupNewWrd',
};

export const gameSessionThings = {
  learnWords: 'backupLWSes',
  savannah: 'backupSavSes',
  sprint: 'backupSprSes',
  audiocall: 'backupAucSes',
  speakIt: 'backupSpkSes',
  puzzle: 'backupPzlSes',
  unmess: 'backupUnmSes',
};

export const checkForLocalThing = (thingName, template) => (
  !localStorage.getItem(thingName)
    ? template
    : JSON.parse(localStorage.getItem(thingName))
);

export const getSessionThing = (thingName, template) => (
  !localStorage.getItem(thingName)
    ? template
    : JSON.parse(localStorage.getItem(thingName))
);

export const checkForSessionThing = (thingName) => {
  let template;
  if (thingName === applicationThings.LEARN_WORDS) {
    template = { ...statsLearnObjTemplate };
  } else {
    template = { ...statsGameObjTemplate };
    template.games = 1;
    if (thingName === applicationThings.PUZZLE) {
      delete template.right;
    }
  }
  const result = getSessionThing(gameSessionThings[thingName], template);
  return result;
};

export const saveSessionThing = (thingName, thingValue) => {
  localStorage.setItem(gameSessionThings[thingName], JSON.stringify(thingValue));
};

export const checkForStatistics = () => (
  checkForLocalThing(localThings.STATISTICS, statsTemplate)
);

export const saveLocalStatistics = (statsObject) => {
  localStorage.setItem(localThings.STATISTICS, JSON.stringify({ ...statsObject }));
};

export const checkForUserWords = (
  storage = sessionThings,
  storageThing = storageThingNames.WORDS,
) => (
  checkForLocalThing(storage[storageThing], [])
);

export const saveLocalUserWord = (
  wordObject,
  storage = sessionThings,
  storageThing = storageThingNames.WORDS,
) => {
  const areWordsStored = JSON.parse(localStorage.getItem(storage[storageThing]));
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
  checkForLocalThing(localThings.SETTINGS, settingsTemplate)
);

export const saveLocalSettings = (settings) => {
  localStorage.setItem(localThings.SETTINGS, JSON.stringify({ ...settings }));
};

export const clearStorageData = (storage) => {
  Object.values(storage).forEach((el) => {
    localStorage.removeItem(el);
  });
};

export const clearGamesStorageData = () => {
  Object.values(gameSessionThings).forEach((el) => {
    if (el !== gameSessionThings.learnWords) {
      localStorage.removeItem(el);
    }
  });
};

export const clearLocalUserData = () => clearStorageData(localThings);

export const getSessionData = (thingName) => (
  JSON.parse(localStorage.getItem(gameSessionThings[thingName]))
);

export const clearSessionData = (thingName) => {
  if (thingName !== applicationThings.LEARN_WORDS) {
    clearGamesStorageData();
  } else {
    localStorage.removeItem(gameSessionThings[thingName]);
  }
  clearStorageData(sessionThings);
};

export const checkForNewUserWordsIds = () => (
  !localStorage.getItem(sessionThings.NEW_WORDS)
    ? []
    : JSON.parse(localStorage.getItem(sessionThings.NEW_WORDS))
);

export const saveNewUserWordId = (wordObject) => {
  const idTemplate = '_id';
  const wordId = wordObject.id || wordObject[idTemplate];
  const words = checkForNewUserWordsIds();
  localStorage.setItem(sessionThings.NEW_WORDS, JSON.stringify([...words, wordId]));
};

export const getNewWordsIds = () => (
  JSON.parse(localStorage.getItem(sessionThings.NEW_WORDS))
);
