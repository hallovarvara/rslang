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

export const getWidthWord = (item, lengthPhrase) => ((100 * item) / lengthPhrase);

export const getBackgroundPosition = (item, widthPhrase) => ((800 * item) / widthPhrase);

export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};
