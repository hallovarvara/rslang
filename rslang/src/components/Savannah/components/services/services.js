import {
  ALL_PAGE, ALL_PAGE_IN_QUERY, TOTAL_GROUP, URL_DATA_RSLANG, URL_WORDS_RSLANG,
} from './constants';

export const getWords = async (page, group) => {
  const url = `${URL_WORDS_RSLANG}?page=${page}&group=${group}`;
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
    arr.push(randomCard(group));
  }
  const result = await Promise.all(arr);
  return result;
};

export const totalQuizInGroup = (totalQuestions) => Math.round(totalQuestions / TOTAL_GROUP);

export const audioPlay = (path) => {
  const audio = new Audio(URL_DATA_RSLANG + path);
  audio.play();
};
