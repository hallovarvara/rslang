import axios from 'axios';
import { AUTH_LOGOUT, AUTH_SUCCESS } from './actionsTypes';
import UserService from '../../helpers/UserService';

export function auth(email, password) {
  return async (dispatch) => {
    const authData = {
      email,
      password,
    };

    let url = 'https://kagafon-learn-words.herokuapp.com/signin';

    const response = await axios.post(url, authData);
    const { data } = response;
    console.log('data', data)

    // const expirationDate = new Date(new Date().getTime() + data.refreshTokenDate * 1000);
    const refreshTokenDate = new Date(new Date().getTime() + 60 * 1000 * 4);
    console.log(refreshTokenDate)

    localStorage.setItem('rslangToken', data.token);
    localStorage.setItem('rslangUserId', data.userId);
    localStorage.setItem('refreshTokenDate', refreshTokenDate);
    const expData = new Date(localStorage.getItem('refreshTokenDate'));
    console.log('expData', expData.getTime())

    dispatch(authSuccess(data.token))
    dispatch(autoLogout((expData.getTime() - new Date().getTime()) / 1000))

  };
}

export function logout() {
  localStorage.removeItem('rslangToken');
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

export function authSuccess(token) {
  return {
    type: AUTH_SUCCESS,
    token,
  };
}
