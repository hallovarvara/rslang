import moment from 'moment';
import { axiosuser, getToken } from './axiosUser';
import { statsTemplate } from '../wordsService/statsModel';
import {
  localThings,
  clearSessionData,
} from '../wordsService/storageModel';
import { settingsTemplate } from '../wordsService/dataModels';
import {
  getDayLocalUserWords,
  saveSessionInfoToLocal,
  prepareSessionInfoToServer,
} from '../wordsService';
import { getWordsByAmount } from '../wordsService/wordsApi';
import { shufleWordsArray } from '../wordsService/wordsFilters';

import {
  apiLinks,
  text,
  localStorageItems,
} from '../constants';

import { getTokenLifetimeInMs } from '../functions';

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem(localStorageItems.token)}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default class UserService {
  registerUser = async (user) => {
    try {
      const rawResponse = await fetch(`${apiLinks.base}users`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      return rawResponse.json();
    } catch (e) {
      console.error(e);
      // TODO handle error for showing user
      return false;
    }
  };

  loginUser = async ({ email, password }) => {
    let result;
    try {
      const authData = { email, password };
      const response = await axiosuser.post('signin', authData);
      const refreshTokenDate = new Date(new Date().getTime() + getTokenLifetimeInMs());
      localStorage.setItem(localStorageItems.token, response.data.token);
      localStorage.setItem(localStorageItems.userId, response.data.userId);
      localStorage.setItem(localStorageItems.refreshTokenDate, refreshTokenDate);
      result = response.data;
    } catch (e) {
      // TODO Delete alert, add error message below the H1 title
      alert(text.ru.userUndefined);
    }
    return result;
  }

  getUserById = async (userId) => {
    const response = await axiosuser.get(`users/${userId}`);
    return response.data;
  }

  updateUserById = async (userId) => {
    try {
      await fetch(`${apiLinks.base}users/${userId}`, {
        method: 'PUT',
        withCredentials: true,
        ...getAuthHeader(),
      });
    } catch (e) {
      console.error(e);
      // TODO: implement errors' handler
    }
  }

  createUserWord = async ({ userId, wordId, word }) => {
    try {
      await fetch(`${apiLinks.base}users/${userId}/words/${wordId}`, {
        method: 'POST',
        withCredentials: true,
        ...getAuthHeader(),
        body: JSON.stringify(word),
      });
    } catch (e) {
      console.error(e);
      // TODO: implement errors' handler
    }
  };

  getUserWordById = async ({ userId, wordId }) => {
    const rawResponse = axiosuser.get(`users/${userId}/words/${wordId}`);
    const content = await rawResponse;
    return content.data;
  };

  updateUserWordById = async ({ userId, wordId, word }) => {
    try {
      await fetch(`${apiLinks.base}users/${userId}/words/${wordId}`, {
        method: 'PUT',
        withCredentials: true,
        ...getAuthHeader(),
        body: JSON.stringify(word),
      });
    } catch (e) {
      console.error(e);
      // TODO: implement errors' handler
    }
  };

  deleteUserWordById = async ({ userId, wordId }) => {
    await axiosuser.delete(`users/${userId}/words/${wordId}`);
  };

  getUserAllWords = async (userId) => {
    try {
      const rawResponse = axiosuser.get(`users/${userId}/words?wordsPerPage=0`);
      const content = await rawResponse;
      return content.data;
    } catch (error) {
      console.error(error);
    }
  };

  getAllUserWordsArray = async (userId) => {
    const result = [];
    const allWords = await this.getUserAllWords(userId);
    if (allWords.length) {
      allWords.forEach((wordCard) => {
        result.push(wordCard.word);
      });
    }
    return result;
  }

  getUserWordsNoRemoved = async (userId) => {
    const result = [];
    const getAllWords = await this.getUserAllWords(userId);
    if (getAllWords.length) {
      getAllWords.forEach((wordCard) => {
        if (!wordCard.optional.removed) {
          result.push(wordCard.word);
        }
      });
    }
    return result;
  }

  // TODO need method: get words without duplicates

  createUserStatistics = async ({ userId, option }) => {
    try {
      await fetch(`${apiLinks.base}users/${userId}/statistics`, {
        method: 'PUT',
        withCredentials: true,
        ...getAuthHeader(),
        body: JSON.stringify(option),
      });
    } catch (e) {
      console.error(e);
      // TODO: implement errors' handler
    }
  };

  getUserStatistics = async (userId) => {
    try {
      const rawResponse = axiosuser.get(`users/${userId}/statistics`);
      const content = await rawResponse;
      return content.data;
    } catch (error) {
      console.error(error);
    }
  };

  createUserSettings = async ({ userId, option }) => {
    try {
      await fetch(`${apiLinks.base}users/${userId}/settings`, {
        method: 'PUT',
        withCredentials: true,
        ...getAuthHeader(),
        body: JSON.stringify(option),
      });
    } catch (e) {
      console.error(e);
      // TODO: implement errors' handler
    }
  };

  getUserSettings = async (userId) => {
    try {
      const rawResponse = axiosuser.get(`users/${userId}/settings`);
      const content = await rawResponse;
      return content.data;
    } catch (error) {
      console.error(error);
    }
  };

  getUserWordsFilter = async ({ userId, token, filter }) => {
    const url = new URL(apiLinks.base);
    url.pathname = `users/${userId}/aggregatedWords`;
    url.searchParams.append('filter', JSON.stringify(filter));
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Authorization', `Bearer ${token}`);
    const result = await fetch(url, { headers });
    const data = await result.json();
    return data[0];
  }

  getUserWordsNoRemovedStamp = async (userId) => {
    const currentStamp = moment().valueOf();
    const result = [];
    const getAllWords = await this.getUserAllWords(userId);
    if (getAllWords.length) {
      getAllWords.forEach((wordCard) => {
        if (!wordCard.optional.removed && wordCard.optional.stamp < currentStamp) {
          result.push(wordCard.word);
        }
      });
    }
    return result;
  }

  // all basic structure of using servicesdescribed in
  // https://github.com/hallovarvara/rslang/wiki/all-data-services
  // begin of 1st step
  isUserLogged = () => (
    getToken() || localStorage.getItem(localStorageItems.token)
  )

  setNewStatistics = (userId, stats) => {
    if (!stats) {
      this.createUserStatistics({ userId, option: statsTemplate });
    }
  }

  setNewSettings = (userId, settings) => {
    if (!settings) {
      this.createUserSettings({ userId, option: settingsTemplate });
    }
  }

  firstEnterOfUser = async (errorHandler) => {
    const userIsLogged = await this.isUserLogged();
    let stats;
    let settings;
    if (userIsLogged) {
      try {
        const userId = localStorage.getItem(localStorageItems.userId);
        stats = await this.getUserStatistics(userId);
        this.setNewStatistics(userId, stats);
        settings = await this.getUserSettings(userId);
        this.setNewSettings(userId, settings);
        // TODO - make drop settings into redux store here
      } catch (error) {
        console.error(error);
        // errorHandler(error);
      }
    } else {
      if (!localStorage.getItem(localThings.STATISTICS)) {
        localStorage.setItem(localThings.STATISTICS, JSON.stringify(statsTemplate));
      }
      if (!localStorage.getItem(localThings.SETTINGS)) {
        localStorage.setItem(localThings.SETTINGS, JSON.stringify(settingsTemplate));
      }
      // TODO - make drop settings to redux store here
    }
  }

  // begin of 2nd step
  prepareWordsForGame = async (
    thingName,
    userGroup,
    dayLimit,
    isAllowedToGetUserWords = true,
  ) => {
    clearSessionData(thingName);
    const userIsLogged = await this.isUserLogged();
    const userId = localStorage.getItem(localStorageItems.userId);
    let userWords;
    if (isAllowedToGetUserWords) {
      userWords = !userIsLogged
        ? getDayLocalUserWords(dayLimit)
        : await this.getUserWordsNoRemovedStamp(userId);
      // TODO: here will be filtered request to backend
    }
    const rest = dayLimit - userWords.length;
    const words = await getWordsByAmount(userGroup, rest);
    const grouped = isAllowedToGetUserWords
      ? [...words, ...userWords]
      : [...words];
    const shufled = shufleWordsArray(grouped);
    return shufled;
  }

  prepareToLearnWords = async (dayLimit, userGroup) => {
    const userIsLogged = this.isUserLogged();
    const userId = localStorage.getItem(localStorageItems.userId);
    const userWords = !userIsLogged
      ? getDayLocalUserWords(dayLimit)
      : await this.getUserWordsNoRemovedStamp(userId);
    const rest = dayLimit - userWords.length;
    const words = await getWordsByAmount(userGroup, rest);
    const grouped = userWords.length
      ? [...words, ...userWords]
      : [...words];
    const shufled = shufleWordsArray(grouped);
    return shufled;
  }

  updateUserStatistics = async (stats, userId, prevStats) => {
    try {
      const statsObject = {};
      statsObject.learnedWords = prevStats.learnedWords;
      statsObject.optional = prevStats.optional;
      const option = {};
      option.learnedWords = stats.learnedWords;
      option.optional = stats.optional;
      const data = {
        userId,
        option,
      };
      this.createUserStatistics(data);
    } catch (e) {
      console.log(e);
    }
  }

  recordNewWordsToUserWords = async (newWords, userId) => {
    try {
      newWords.forEach((newWord) => {
        const difficulty = String(newWord.word.difficulty);
        const { optional } = newWord.word;
        const word = {
          difficulty,
          optional,
        };
        const data = {
          userId,
          wordId: newWord.wordId,
          word,
        };
        this.createUserWord(data);
      });
    } catch (e) {
      console.log(e);
    }
  }

  updateUserWords = async (userWords, userId) => {
    try {
      userWords.forEach((userWord) => {
        const difficulty = String(userWord.word.difficulty);
        const { optional } = userWord.word;
        const word = {
          difficulty,
          optional,
        };
        const data = {
          userId,
          wordId: userWord.wordId,
          word,
        };
        this.updateUserWordById(data);
      });
    } catch (e) {
      console.log(e);
    }
  }

  handleEndOfGame = async (thingName) => {
    const userIsLogged = this.isUserLogged();
    if (!userIsLogged) {
      saveSessionInfoToLocal(thingName);
    } else {
      const userId = localStorage.getItem(localStorageItems.userId);
      const prevStats = await this.getUserStatistics(userId);
      const { stats, newWords, userWords } = prepareSessionInfoToServer(thingName, prevStats);
      this.updateUserStatistics(stats, userId, prevStats);
      this.recordNewWordsToUserWords(newWords, userId);
      this.updateUserWords(userWords, userId);
      clearSessionData(thingName);
    }
  }
}
