import moment from 'moment';
import { dateFormatTemplate } from '../constants';
import { userWordThings } from './dataModels';

export const basicFilter = (arrayOfWords, filterName) => {
  let filtered;
  switch (filterName) {
    case userWordThings.DIFFICULTY:
      filtered = arrayOfWords.filter((el) => el?.userWord?.difficulty
        && !el?.userWord?.optional?.removed);
      break;
    case userWordThings.NEXT:
      filtered = arrayOfWords.filter((el) => (
        el?.userWord?.optional?.next === moment().format(dateFormatTemplate)
        && !el?.userWord?.optional?.removed
      ));
      break;
    case userWordThings.STAMP:
      filtered = arrayOfWords.filter((el) => (
        el?.userWord?.optional?.stamp < moment().valueOf()
          && !el?.userWord?.optional?.removed
      ));
      break;
    case userWordThings.REMOVED:
      filtered = arrayOfWords.filter((el) => el?.userWord?.optional?.removed);
      break;
    default:
      filtered = [...arrayOfWords];
      break;
  }
  return filtered;
};

export const sortFilteredByStamp = (arrayOfWords) => (
  arrayOfWords.sort(
    (a, b) => a?.userWord?.optional?.stamp - b?.userWord?.optional?.stamp,
  ));

export const returnAmount = (arrayOfWords, dayLimit) => (dayLimit
  ? arrayOfWords.slice(0, dayLimit)
  : arrayOfWords);

export const shufleWordsArray = (arrayOfWords) => {
  const shuffledArray = [...arrayOfWords];
  let j;
  let temp;
  shuffledArray.forEach((el, i) => {
    j = Math.floor(Math.random() * (i + 1));
    temp = shuffledArray[j];
    shuffledArray[j] = shuffledArray[i];
    shuffledArray[i] = temp;
  });
  return shuffledArray;
};

export const filterByThing = (arrayOfWords, filterThing, dayLimit = 0) => {
  const filtered = basicFilter(arrayOfWords, userWordThings[filterThing]) || [];
  const sorted = sortFilteredByStamp(filtered) || [];
  const limited = returnAmount(sorted, dayLimit) || [];
  return shufleWordsArray(limited) || [];
};
