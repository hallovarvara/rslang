import axios from 'axios';
import { connect } from 'react-redux';
import { apiLinks } from './constants';

const urlBase = apiLinks.base;

const getToken = ({ token }) => token;

export const axiosuser = axios.create({
  baseURL: urlBase,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('rslangToken') || getToken()}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

function mapStateToProps(state) {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
  };
}

export default connect(mapStateToProps)(getToken);
