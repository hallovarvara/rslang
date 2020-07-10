import axios from 'axios';
import {
  apiLinks,
  count,
  text,
  localStorageItems,
} from '../constants';

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem(localStorageItems.token)}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const axiosuser = axios.create({
  baseURL: apiLinks.base,
  ...getAuthHeader(),
});

export default class UserServiceApi {
  registerUser = async (user) => {
    try {
      const rawResponse = await fetch(`${apiLinks.base}/users`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      return rawResponse.json();
    } catch (e) {
      console.log(e);
      // TODO handle error for showing user
      return false;
    }
  };

  loginUser = async ({ email, password }) => {
    try {
      const authData = {
        email,
        password,
      };
      const response = await axiosuser.post('signin', authData);
      const refreshTokenDate = new Date(new Date().getTime() + count.minInHour * count.msInSec);
      localStorage.setItem(localStorageItems.token, response.data.token);
      localStorage.setItem(localStorageItems.userId, response.data.userId);
      localStorage.setItem(localStorageItems.refreshTokenDate, refreshTokenDate);
      return response.data;
    } catch (e) {
      // TODO Delete alert, add error message below the H1 title
      alert(text.ru.userUndefined);
    }
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
    }
  };

  deleteUserWordById = async ({ userId, wordId }) => {
    axiosuser.delete(`users/${userId}/words/${wordId}`);
  };

  getUserAllWords = async (userId) => {
    const rawResponse = axiosuser.get(`users/${userId}/words`);
    const content = await rawResponse;
    return content.data;
  };

  allUserWordsArray = async (userId) => {
    const result = [];
    const getAllWords = await this.getUserAllWords(userId);
    if (getAllWords.length) {
      getAllWords.forEach((wordCard) => {
        result.push(wordCard.word);
      });
    }
    return result;
  }

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
    }
  };

  getUserStatistics = async (userId) => {
    const rawResponse = axiosuser.get(`users/${userId}/statistics`);
    const content = await rawResponse;
    Object.keys(content.data.optional).forEach((x) => {
      content.data.optional[x] = JSON.parse(content.data.optional[x]);
    });
    return content.data;
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
    }
  };

  getUserSettings = async (userId) => {
    const rawResponse = axiosuser.get(`users/${userId}/settings`);
    const content = await rawResponse;
    Object.keys(content.data.optional).forEach((x) => {
      content.data.optional[x] = JSON.parse(content.data.optional[x]);
    });
    return content.data;
  };

  getUserWordsFilter = async ({ userId, token, filter }) => {
    const url = new URL(apiLinks.base);
    url.pathname = `users/${userId}/aggregatedWords`;
    url.searchParams.append('filter', JSON.stringify(filter));
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Authorization', `Bearer ${token}`);
    const res = await fetch(url, { headers });
    const data = await res.json();
    return data[0];
  }
}
