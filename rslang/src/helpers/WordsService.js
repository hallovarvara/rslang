import axios from 'axios';
import {
  apiLinks, ALL_PAGE, ALL_CARDS_IN_QUERY, TOTAL_GROUP,
} from './constants';

export default class WordsService {
  getCards = async (page, group) => {
    const url = `${apiLinks.base}words?page=${page}&group=${group}`;
    const response = await axios.get(url);
    return response.data;
  };

  getRandomIntInclusive = (min, max) => {
    const minNumber = Math.ceil(min);
    const maxNumber = Math.floor(max);
    return Math.floor(Math.random() * (maxNumber - minNumber + 1)) + min;
  };

  shuffleArray = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr;
  };

  getCardInGroup = async (group) => {
    const randomPage = this.getRandomIntInclusive(0, ALL_PAGE);
    const data = await this.getCards(randomPage, group);
    const randomKey = this.getRandomIntInclusive(0, ALL_CARDS_IN_QUERY);
    return data[randomKey];
  };

  getCountCardsInGroup = async (group, count) => {
    const arr = [];
    for (let i = 0; i < count; i += 1) {
      arr.push(this.getCardInGroup(group));
    }
    const result = await Promise.all(arr);
    return result;
  };

  totalQuizInGroup = (totalQuestions) => Math.round(totalQuestions / TOTAL_GROUP);

  audioPlay = (path) => {
    const audio = new Audio('https://raw.githubusercontent.com/kejno/rslang-data/master/' + path);
    audio.play();
  };

  audioStop = (path) => {
    const audio = new Audio(apiLinks.file + path);
    audio.pause();
  };
}
