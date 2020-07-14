import {
  apiLinks,
  count,
} from './constants';

const getPath = (modulePath = '') => `/${modulePath}`;

const getRandomNumber = (min, max) => (
  Math.floor(
    Math.random() * (
      Math.floor(max) - Math.ceil(min) + 1
    ),
  ) + min
);

const getAverageNumber = (min, max) => Math.round((max - min) / 2);

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const getTokenLifetimeInMs = () => {
  const {
    minInHour, secInMin, msInSec, tokenLifetimeInHours,
  } = count;
  return tokenLifetimeInHours * minInHour * secInMin * msInSec;
};

/* Words */
const countQuestionsSets = (questionsNumber) => (
  Math.round(questionsNumber / count.groups)
);

const generateQuestionsArray = (
  data,
  amountLevels = count.audiocall.maxLevels,
) => (
  shuffleArray(data).slice(0, amountLevels)
);

const removeTag = (str) => {
  const [withTag, withoutTag] = str.match(/<.*>(.*?)<\/.*>/);
  return str.replace(withTag, withoutTag);
};

/* Media */
const getFilePath = (mediaPath) => apiLinks.file + mediaPath;

const playAudio = (path) => {
  const audioElement = new Audio(path);
  audioElement.play();
};

const pauseAudio = (path) => {
  const audioElement = new Audio(path);
  audioElement.pause();
};

export {
  getFilePath,
  generateQuestionsArray,
  removeTag,
  playAudio,
  pauseAudio,
  countQuestionsSets,
  shuffleArray,
  getRandomNumber,
  getAverageNumber,
  getTokenLifetimeInMs,
  getPath,
};
