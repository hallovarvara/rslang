import axios from 'axios';

import {
  AUTH_LOGOUT,
  AUTH_SUCCESS,
  AUTH_FAILED,
  AUTH_START,
} from './actionsTypes';

import {
  apiLinks,
  count,
  localStorageItems,
} from '../../helpers/constants';

import { getTokenLifetimeInMs } from '../../helpers/functions';

export function logout() {
  localStorage.removeItem(localStorageItems.token);
  localStorage.removeItem(localStorageItems.username);
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

export function authFailed() {
  return {
    type: AUTH_FAILED,
  };
}

export function authStart() {
  return {
    type: AUTH_START,
  };
}

export function auth(email, password) {
  return async (dispatch) => {
    const authData = {
      email,
      password,
    };
    dispatch(authStart());
    try {
      const url = apiLinks.base;

      const response = await axios.post(`${url}signin`, authData);
      const { data } = response;
      const { name, userId, token } = data;
      const refreshTokenDate = new Date(new Date().getTime() + getTokenLifetimeInMs());

      localStorage.setItem(localStorageItems.token, token);
      localStorage.setItem(localStorageItems.userId, userId);
      localStorage.setItem(localStorageItems.refreshTokenDate, refreshTokenDate);
      localStorage.setItem(localStorageItems.username, name);

      const expData = new Date(localStorage.getItem(localStorageItems.refreshTokenDate));
      dispatch(authSuccess(name, userId, token));
      dispatch(autoLogout((expData.getTime() - new Date().getTime()) / count.msInSec));
    } catch (e) {
      dispatch(authFailed());
    }
  };
}
