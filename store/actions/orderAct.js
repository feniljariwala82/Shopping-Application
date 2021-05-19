import axios from "axios";
import {
  PLACE_ORDER,
  CANCEL_ORDER,
  ERROR_IN_PLACE_ORDER,
  FETCH_ORDERS,
  ERROR_IN_FETCH_ORDERS,
} from "../types";
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";
import { API_URL } from "../Defaults";
import AxiosInstance from "../utils/AxiosInstance";

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    try {
      const config = {
        headers: {
          "x-auth-token": getState().auth.token,
        },
      };
      let res = await AxiosInstance.get(API_URL + "/order", config);
      dispatch({
        type: FETCH_ORDERS,
        payload: res.data.response,
      });
    } catch (error) {
      dispatch({
        type: ERROR_IN_FETCH_ORDERS,
        payload: error.response.data.error,
      });
    }
  };
};

export const placeOrder = (cartItems, totalAmount) => {
  return async (dispatch, getState) => {
    try {
      let id = uuid();
      const config = {
        headers: {
          "x-auth-token": getState().auth.token,
        },
      };
      let res = await axios.post(
        API_URL + "/order",
        {
          orderId: id,
          items: cartItems,
          totalAmount: totalAmount,
          orderedDate: new Date(),
        },
        config
      );
      dispatch({
        type: PLACE_ORDER,
        payload: {
          orderId: id,
          cartItems: cartItems,
          totalAmount: totalAmount,
          orderedDate: new Date(),
          success: res.data.response,
        },
      });
    } catch (error) {
      dispatch({
        type: ERROR_IN_PLACE_ORDER,
        payload: error.response.data.error,
      });
    }
  };
};

export const cancelOrder = () => {
  return {
    type: CANCEL_ORDER,
  };
};
