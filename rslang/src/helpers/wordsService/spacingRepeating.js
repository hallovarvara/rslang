import moment from 'moment';
import { levelsOfDifficulty, dateFormatTemplate } from '../constants';

export const defineNewRate = (rate) => {
  let newRate = 0;
  switch (true) {
    case rate <= 2:
      newRate = 4;
      break;
    case rate <= 4:
      newRate = 7;
      break;
    case rate <= 7:
      newRate = 10;
      break;
    case rate <= 10:
      newRate = 15;
      break;
    case rate <= 15:
      newRate = 30;
      break;
    default:
      newRate = rate;
      break;
  }
  return newRate;
};

export const correctedRate = (rate, level) => {
  let coefficient = 0;
  let correction = 0;
  if (level !== levelsOfDifficulty.NORMAL && rate <= 4) {
    correction = level === levelsOfDifficulty.HARD ? -1 : 1;
  }
  switch (level) {
    case levelsOfDifficulty.HARD:
      coefficient = 0.8;
      break;
    case levelsOfDifficulty.EASY:
      coefficient = 1.3;
      break;
    default:
      coefficient = 1;
      break;
  }
  return Math.floor(rate * coefficient) + correction;
};

export const calculateLearnRate = (rate, level) => {
  const newRate = defineNewRate(rate);
  return correctedRate(newRate, level);
};

export const calculateGameNext = (oldNext) => {
  let newNext = '';
  if (!oldNext) {
    newNext = moment().add(1, 'days').format(dateFormatTemplate);
  } else {
    const prepared = oldNext.split('.').reverse().join('-');
    newNext = oldNext === moment().format(dateFormatTemplate)
      ? moment().add(1, 'days').format(dateFormatTemplate)
      : moment(prepared).add(-1, 'days').format(dateFormatTemplate);
  }
  return newNext;
};
