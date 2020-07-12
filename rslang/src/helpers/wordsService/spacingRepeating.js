import moment from 'moment';
import { levelsOfDifficulty, dateFormatTemplate, ratesScale } from '../constants';

export const defineNewRate = (rate) => {
  const newRate = ratesScale.find((el) => el.level <= rate);
  return newRate.rate;
};

export const correctedRate = (rate, level) => {
  let coefficient = 0;
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
  return Math.floor(rate * coefficient);
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
