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

export const paintingObj = (level = 1) => {
  const maxNumber = painting[level].length;
  const numberPicture = getRandomNumber(0, maxNumber);
  return painting[level][numberPicture];
};

export const replaseUrlBackground = (object, isBackground) => {
  if (object && isBackground) {
    const url = `${apiLinks.paintings}${object.cutSrc}`;
    return url;
  } return 'none';
};

export const playAudio = (audio, isShow ) => {
  if (isShow) {
    
    let isClick = false;
    const audioElement = new Audio(audio);
    audioElement.play();
    audioElement.onended = () => {
      isClick = true;
      return isClick;
    };
    return isClick;
  }
};
