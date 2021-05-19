import {
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  REGISTER_ERROR,
  REGISTER_SUCCESS,
  CLEAR_ERROR,
  AUTHENTICATE,
  LOGOUT,
} from "../types";
import { API_URL } from "../Defaults";
import AxiosInstance from "../utils/AxiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const logout = () => {
  return async (dispatch) => {
    clearLogoutTimer();
    await AsyncStorage.removeItem("userData");
    dispatch({
      type: LOGOUT,
    });
  };
};

let timer;

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = (expireTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expireTime * 1000);
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      let response = await AxiosInstance.post(API_URL + "/auth/login", {
        email,
        password,
      });
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          token: response.data.token,
          user: response.data.createdUser,
          expiresIn: response.data.expiresIn,
        },
      });

      let expirationDate = new Date(
        new Date().getTime() + response.data.expiresIn * 1000
      );

      // Save data into async storage
      await saveDataToAsync(
        response.data.token,
        response.data.createdUser,
        expirationDate
      );

      // setting timer for automatic logout
      dispatch(setLogoutTimer(response.data.expiresIn));
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR,
        payload: error.response.data.error,
      });
      return Promise.reject(error.response.data.error);
    }
  };
};

export const register = (email, password) => {
  return async (dispatch) => {
    try {
      let response = await AxiosInstance.post(API_URL + "/auth/register", {
        email,
        password,
      });
      dispatch({
        type: REGISTER_SUCCESS,
        payload: {
          token: response.data.token,
          user: response.data.createdUser,
          expiresIn: response.data.expiresIn,
        },
      });

      let expirationDate = new Date(
        new Date().getTime() + response.data.expiresIn * 1000
      );

      // Save data into async storage
      await saveDataToAsync(
        response.data.token,
        response.data.createdUser,
        expirationDate
      );

      // setting timer for automatic logout
      dispatch(setLogoutTimer(response.data.expiresIn));
    } catch (error) {
      dispatch({
        type: REGISTER_ERROR,
        payload: error.response.data.error,
      });
      return Promise.reject(error.response.data.error);
    }
  };
};

export const clearError = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_ERROR,
    });
  };
};

const saveDataToAsync = async (token, userDetails, expirationDate) => {
  await AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token,
      userDetails,
      expirationDate: expirationDate.toISOString(),
    })
  );
};

export const authenticate = (userDetails, token) => {
  return (dispatch) => {
    dispatch({
      type: AUTHENTICATE,
      payload: {
        userDetails,
        token,
      },
    });
  };
};
