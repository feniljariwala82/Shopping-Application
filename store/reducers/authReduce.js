import {
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  REGISTER_ERROR,
  REGISTER_SUCCESS,
  CLEAR_ERROR,
  AUTHENTICATE,
  LOGOUT,
} from "../types";

const initialState = {
  token: null,
  isAuthenticated: false,
  user: null,
  error: null,
  expiresIn: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case AUTHENTICATE:
      return {
        ...state,
        token: payload.token,
        isAuthenticated: true,
        user: payload.userDetails,
        error: null,
      };

    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        token: payload.token,
        isAuthenticated: true,
        user: payload.user,
        expiresIn: payload.expiresIn,
        error: null,
      };

    case LOGIN_ERROR:
    case REGISTER_ERROR:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        error: payload,
      };

    case LOGOUT:
      return initialState;

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
