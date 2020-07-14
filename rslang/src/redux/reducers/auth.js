import {
  AUTH_LOGOUT,
  AUTH_SUCCESS,
  AUTH_FAILED,
  AUTH_START,
} from '../actions/actionsTypes';

const initialState = {
  name: null,
  userId: null,
  token: null,
  failed: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_START:
      return {
        ...state, failed: false,
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        name: action.name,
        userId: action.userId,
        token: action.token,
        failed: false,
      };
    case AUTH_LOGOUT:
      return { ...state, ...initialState };
    case AUTH_FAILED:
      return {
        ...state, failed: true,
      };
    default:
      return state;
  }
}
