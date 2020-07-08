import { AUTH_LOGOUT, AUTH_SUCCESS } from '../actions/actionsTypes';

const initialState = {
  name: null,
  userId: null,
  token: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        name: action.name,
        userId: action.userId,
        token: action.token,
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        name: null,
        userId: null,
        token: null,
      };
    default:
      return state;
  }
}
