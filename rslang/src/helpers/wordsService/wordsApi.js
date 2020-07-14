import axios from 'axios';

import { apiLinks, count } from '../constants';
import { getRandomNumber } from '../functions';

export const getWords = async (page, group) => {
  const url = `${apiLinks.base}words?page=${page}&group=${group}`;
  const response = await axios.get(url);
  return response.data;
};

// export const getWords = async (page, group) => {
//   const url = `${apiLinks.base}words?page=${page}&group=${group}`;
//   const data = await axios
//     .get(url)
//     .then((response) => {
//       const dat = response.data;
//       return dat;
//     })
//     .catch((error) => {
//       console.log(error);
//     });
//   return data;
// };

export const getWordsById = async (wordId) => {
  const url = `${apiLinks.base}words/${wordId}`;
  const response = await axios.get(url);
  return response.data;
};

export const getRandomWordByGroup = async (group) => {
  const randomPage = getRandomNumber(0, count.pages);
  const data = await getWords(randomPage, group);
  const randomKey = getRandomNumber(0, count.words);
  return data[randomKey];
};

export const getWordsByAmount = async (group, amountOfAnswers) => {
  const result = Array(amountOfAnswers).fill(0)
    .map(() => getRandomWordByGroup(group));
  const words = await Promise.all(result);
  return words;
};
