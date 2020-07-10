import axios from 'axios';
import { apiLinks, localStorageItems } from './constants';

const urlBase = apiLinks.base;

const axiosuser = axios.create({
  baseURL: urlBase,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('rslangToken')}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default class UserService {
  registerUser = async (user) => {
    const rawResponse = await fetch(urlBase, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const content = await rawResponse.json();
    console.log(content);
  };

  loginUser = async ({ email, password }) => {
    const authData = { email, password };
    const { hours, minutes, ms } = { hours: 4, minutes: 60, ms: 1000 };
    const response = await axiosuser.post('signin', authData);

    const refreshTokenDate = new Date(new Date().getTime() + hours * minutes * ms);

    localStorage.setItem(localStorageItems.token, response.data.token);
    localStorage.setItem(localStorageItems.userId, response.data.userId);
    localStorage.setItem(localStorageItems.refreshTokenDate, refreshTokenDate);
  }

  getUserById = async (userId) => {
    const response = await axiosuser.get(`users/${userId}`);
    return response.data;
  }

  updateUserById = async (userId) => {
    try {
      await fetch(`${urlBase}users/${userId}`, {
        method: 'PUT',
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('tokenRslang')}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
    } catch (e) {
      console.error(e);
      // TODO: implement errors' handler
    }
  }

  createUserWord = async ({ userId, wordId, word }) => {
    try {
      await fetch(`${urlBase}users/${userId}/words/${wordId}`, {
        method: 'POST',
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('tokenRslang')}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
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
      await fetch(`${urlBase}users/${userId}/words/${wordId}`, {
        method: 'PUT',
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('tokenRslang')}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(word),
      });
    } catch (e) {
      console.error(e);
      // TODO: implement errors' handler
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
      await fetch(`${urlBase}users/${userId}/statistics`, {
        method: 'PUT',
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('tokenRslang')}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(option),
      });
    } catch (e) {
      console.error(e);
      // TODO: implement errors' handler
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
      await fetch(`${urlBase}users/${userId}/settings`, {
        method: 'PUT',
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('tokenRslang')}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(option),
      });
    } catch (e) {
      console.error(e);
      // TODO: implement errors' handler
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
