import axios from 'axios';

import { apiLinks, count } from '../constants';
import { getRandomNumber } from '../functions';

const getWords = async (page, group) => {
  const url = `${apiLinks.base}words?page=${page}&group=${group}`;
  const response = await axios.get(url);
  return response.data;
};

const randomCard = async (group) => {
  const randomPage = getRandomNumber(0, count.pages);
  const data = await getWords(randomPage, group);
  const randomKey = getRandomNumber(0, count.words);
  return data[randomKey];
};

export const getCardsWithTotalAnswers = async (group, totalAnswers) => {
  const arr = [];
  for (let i = 0; i < totalAnswers; i += 1) {
    arr.push(randomCard(group));
  }
  const result = await Promise.all(arr);
  return result;
};

export const getCardsByAmount = async (group, amount) => {
  const arr = [];
  for (let i = 0; i < amount; i += 1) {
    arr.push(this.getCards(group));
  }
  const result = await Promise.all(arr);
  return result;
};
