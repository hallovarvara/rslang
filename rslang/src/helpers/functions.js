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

const generateStepperMarks = (stepsCount) => (
  (new Array(stepsCount).fill({}))
    .map((obj, index) => ({
      value: index + 1,
      label: `${index + 1}`,
    }))
);

export {
  getFilePath,
  generateQuestionsArray,
  playAudio,
  pauseAudio,
  countQuestionsSets,
  shuffleArray,
  getRandomNumber,
  getAverageNumber,
  getTokenLifetimeInMs,
  getPath,
  generateStepperMarks,
};
