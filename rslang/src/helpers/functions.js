import { apiLinks, audiocallMaxLevels } from './constants';

const shuffle = (array) => (array.sort(() => Math.random() - 0.5));

const getMediaPath = (media) => apiLinks.file + media;

const generateQuestionsArray = (data, amountLevels = audiocallMaxLevels) => (
  shuffle(data).slice(0, amountLevels)
);

const playAudio = (audio) => {
  const audioElement = new Audio(audio);
  audioElement.play();
};

export {
  shuffle,
  getMediaPath,
  generateQuestionsArray,
  playAudio,
};
