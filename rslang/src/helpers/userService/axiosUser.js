import axios from 'axios';
import { connect } from 'react-redux';
import {
  apiLinks,
  localStorageItems,
} from '../constants';

const getToken = ({ token }) => token;

export const axiosuser = axios.create({
  baseURL: apiLinks.base,
  headers: {
    Authorization: `Bearer ${localStorage.getItem(localStorageItems.token) || getToken()}`,
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
