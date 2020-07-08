import axios from 'axios';
import { AUTH_LOGOUT, AUTH_SUCCESS } from './actionsTypes';

export function logout() {
  localStorage.removeItem('rslangToken');
  localStorage.removeItem('rslangName');
  localStorage.removeItem('rslangUserId');
  localStorage.removeItem('refreshTokenDate');
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
      const url = 'https://kagafon-learn-words.herokuapp.com/signin';

      const response = await axios.post(url, authData);
      const { data } = response;
      const { name, userId, token } = data;
      const refreshTokenDate = new Date(new Date().getTime() + 60 * 60 * 1000 * 4);
      localStorage.setItem('rslangToken', token);
      localStorage.setItem('rslangUserId', userId);
      localStorage.setItem('refreshTokenDate', refreshTokenDate);
      localStorage.setItem('rslangName', name);
      const expData = new Date(localStorage.getItem('refreshTokenDate'));
      dispatch(authSuccess(name, userId, token));
      dispatch(autoLogout((expData.getTime() - new Date().getTime()) / 1000));
    } catch (e) {
      alert("НЕВЕРНЫЙ ЛОГИН ИЛИ ПАРОЛЬ")
    }

  };
}
