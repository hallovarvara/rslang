import axios from 'axios';
import { apiLinks } from './constants';

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
    try {
      const rawResponse = await fetch('https://kagafon-learn-words.herokuapp.com/users', {
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
      const refreshTokenDate = new Date(new Date().getTime() + 60 * 1000);
      localStorage.setItem('rslangToken', response.data.token);
      localStorage.setItem('rslangUserId', response.data.userId);
      localStorage.setItem('refreshTokenDate', refreshTokenDate);
      return response.data;
    } catch (e) {
      alert("Такого пользователя не существует");
    }
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
    const url = new URL('https://kagafon-learn-words.herokuapp.com');
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
