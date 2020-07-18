import axios from 'axios';

import { apiLinks, count } from '../constants';
import { getRandomNumber, handleError } from '../functions';

export const getWords = async (page, group) => {
  const url = `${apiLinks.base}words?page=${page}&group=${group}`;

  let data;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    handleError(error);
  }

  return data;
};

export const getWordsById = async (wordId) => {
  let response;
  const url = `${apiLinks.base}words/${wordId}`;
  try {
    response = await axios.get(url);
  } catch (error) {
    console.error(error);
  }
  return response.data;
};

export const getRandomWordByGroup = async (group) => {
  let data;
  const randomPage = getRandomNumber(0, count.pages);
  try {
    data = await getWords(randomPage, group);
  } catch (error) {
    console.error(error);
  }
  const randomKey = getRandomNumber(0, count.words);
  return data[randomKey];
};

export const getRandomWord = async () => {
  let data;
  const randomPage = getRandomNumber(0, count.pages);
  const group = getRandomNumber(0, count.groups);
  try {
    data = await getWords(randomPage, group);
  } catch (error) {
    console.error(error);
  }
  const randomKey = getRandomNumber(0, count.words);
  return data[randomKey];
};

export const getWordsByAmount = async (group, amountOfAnswers) => {
  try {
    const result = Array(amountOfAnswers).fill(0)
      .map(() => getRandomWordByGroup(group));
    const words = await Promise.all(result);
    return words;
  } catch (error) {
    console.error(error);
  }
};
