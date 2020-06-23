import {
  ALL_PAGE, ALL_PAGE_IN_QUERY, TOTAL_GROUP,
} from './constants';

export const getWords = async (page, group) => {
  const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}`;
  const res = await fetch(url);
  const json = await res.json();
  return json;
};

export const getRandomIntInclusive = (min, max) => {
  const minNumber = Math.ceil(min);
  const maxNumber = Math.floor(max);
  return Math.floor(Math.random() * (maxNumber - minNumber + 1)) + min;
};

const randomCard = async (group) => {
  const randomPage = getRandomIntInclusive(0, ALL_PAGE);
  const data = await getWords(randomPage, group);
  const randomKey = getRandomIntInclusive(0, ALL_PAGE_IN_QUERY);
  return data[randomKey];
};

export const getCards = async (group, totalAnswers) => {
  const arr = [];

  for (let i = 0; i < totalAnswers; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    arr.push(await randomCard(group));
  }

  return arr;
};

export const totalQuizInGroup = (totalQuestions) => Math.round(totalQuestions / TOTAL_GROUP);
