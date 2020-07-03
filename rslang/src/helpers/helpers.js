// TODO helper functions for AudioCallGame
import * as constants from './constants';

export const shuffle = (array) => (array.sort(() => Math.random() - 0.5));

export const replaceAudioSrc = (audio) => (
  constants.audioSrc
    .replace('{audio}', audio)
);

export const replaceImageSrc = (image) => (
  constants.imageSrc
    .replace('{image}', image)
);

export const generateQuestionsArray = (data, amountLevels = 12) => (
  shuffle(data).slice(0, amountLevels)
);

export const playAudio = (audio) => {
  const audioElement = new Audio(audio);
  audioElement.play();
};