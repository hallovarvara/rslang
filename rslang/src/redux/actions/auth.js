import axios from 'axios';

import { AUTH_LOGOUT, AUTH_SUCCESS } from './actionsTypes';

import {
  apiLinks,
  count,
  localStorageItems,
  text,
} from '../../helpers/constants';

import { getTokenLifetimeInMs } from '../../helpers/functions';

export function logout() {
  localStorage.removeItem(localStorageItems.token);
  localStorage.removeItem(localStorageItems.nickname);
  localStorage.removeItem(localStorageItems.userId);
  localStorage.removeItem(localStorageItems.refreshTokenDate);
  return {
    type: AUTH_LOGOUT,
  };
}

export function autoLogout(time) {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, time * 1000);
  };
}

export function authSuccess(name, userId, token) {
  return {
    type: AUTH_SUCCESS,
    name,
    userId,
    token,
  };
}

export function auth(email, password) {
  return async (dispatch) => {
    const authData = {
      email,
      password,
    };
    try {
      const url = apiLinks.base

      const response = await axios.post(`${url}signin`, authData);
      const { data } = response;
      const { name, userId, token } = data;
      const refreshTokenDate = new Date(new Date().getTime() + getTokenLifetimeInMs());

      localStorage.setItem(localStorageItems.token, token);
      localStorage.setItem(localStorageItems.userId, userId);
      localStorage.setItem(localStorageItems.refreshTokenDate, refreshTokenDate);
      localStorage.setItem(localStorageItems.nickname, name);

      const expData = new Date(localStorage.getItem(localStorageItems.refreshTokenDate));
      dispatch(authSuccess(name, userId, token));
      dispatch(autoLogout((expData.getTime() - new Date().getTime()) / count.msInSec));
    } catch (e) {
      // TODO Delete alert, add error message below the H1 title
      alert(text.ru.incorrectLoginData);
    }
  };
}
