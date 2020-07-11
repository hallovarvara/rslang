import * as constants from './constants';
import { apiLinks } from '../../helpers/constants';
import { getRandomNumber } from '../../helpers/functions';
import painting from './galleryData';

export const shuffle = (array) => (array.sort(() => Math.random() - 0.5));

export const generateQuestionsArray = (data, amountLevels = 12) => (
  shuffle(data).slice(0, amountLevels)
);

export const replaceAudioSrc = (audio) => (
  constants.audioSrc
    .replace('{audioExample}', audio)
);

export const replaseUrlBackground = (level = 1, isBackground) => {
  const maxNumber = painting[level].length;
  const numberPicture = getRandomNumber(0, maxNumber);
  if (level && isBackground) {
    const url = `url(${apiLinks.paintings}${painting[level][numberPicture].cutSrc})`;
    return url;
  } return 'none';
};

export const playAudio = (audio, isShow) => {
  if (isShow) {
    const audioElement = new Audio(replaceAudioSrc(audio));
    audioElement.play();
  }
};
