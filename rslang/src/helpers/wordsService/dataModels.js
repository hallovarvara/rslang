import moment from 'moment';
import {
  // userSettingsTemplate,
  dateFormatTemplate,
} from '../constants';

export const userWordTemplate = {
  difficulty: false,
  optional: {
    rate: 0,
    next: '',
    stamp: 0,
    removed: false,
    repeated: 0,
  },
};

export const removedTemplate = {
  difficulty: false,
  optional: {
    rate: 0,
    next: '',
    stamp: 0,
    removed: true,
    repeated: 0,
  },
};

export const settingsTemplate = {
  translation: true,
  complicatedButton: true,
  imageAssociatation: true,
  meaning: true,
  transcription: true,
  showAnswerButton: true,
  exampleSentence: true,
  exampleSentenceTranslation: true,
};

export const userWordThings = {
  DIFFICULTY: 'difficulty',
  OPTIONAL: 'optional',
  RATE: 'rate',
  NEXT: 'next',
  STAMP: 'stamp',
  REMOVED: 'removed',
  REPEATED: 'repeated',
};

// export const generateSettingsTemplate = () => {
//   const settings = {};
//   Object.values(userSettingsTemplate).forEach((setting) => {
//     settings[setting] = true;
//   });
//   return settings;
// };

export const changeSettings = (userOption, wordObject) => {
  const settings = { ...wordObject };
  const optionData = settings[userOption];
  settings[userOption] = !optionData;
  return { ...settings };
};
// ---------------------------------------------------------------

export const createUserWord = (wordObject) => {
  const userWord = { ...userWordTemplate };
  return { ...wordObject, userWord };
};

export const convertDate = (days) => (
  !days
    ? moment().format(dateFormatTemplate)
    : moment().add(days, 'days').format(dateFormatTemplate)
);

export const convertStamp = (days, oldDate) => (
  !days
    ? moment(oldDate.split('.').reverse().join('-')).valueOf()
    : moment().add(days, 'days').valueOf()
);

export const sumUserWordProps = (targetObject, newData) => {
  const result = {};
  Object.keys(targetObject).forEach((key) => {
    result[key] = newData[key] ? newData[key] : targetObject[key];
    if (key === 'repeated' && newData.repeated) {
      result[key] = targetObject[key] + 1;
    }
  });
  return result;
};

export const changeUserWord = (wordObject, updatedUserWord) => {
  const userWord = wordObject?.userWord || { ...userWordTemplate };
  if (updatedUserWord.difficulty) {
    userWord.difficulty = updatedUserWord.difficulty;
  } else {
    userWord.optional = {
      ...sumUserWordProps(userWord.optional, updatedUserWord),
    };
  }
  return {
    ...wordObject,
    userWord,
  };
};
