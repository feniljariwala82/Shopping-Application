import {
  CREATE_PRODUCT,
  ERROR_IN_ADD_PRODUCT,
  FETCH_PRODUCTS,
  ERROR_IN_FETCH_PRODUCTS,
} from "../types";

import { API_URL } from "../Defaults";
import AxiosInstance from "../utils/AxiosInstance";

export const getAllProducts = () => {
  return async (dispatch, getState) => {
    const config = {
      headers: {
        "x-auth-token": getState().auth.token,
      },
    };
    try {
      let res = await AxiosInstance.get(API_URL + "/product", config);
      dispatch({
        type: FETCH_PRODUCTS,
        payload: {
          products: res.data.response,
          ownerId: getState().auth.user.email,
        },
      });
    } catch (error) {
      dispatch({
        type: ERROR_IN_FETCH_PRODUCTS,
        payload: error.response.data.error,
      });
    }
  };
};

export const createProduct = (title, imageUrl, description, price) => {
  return async (dispatch, getState) => {
    const config = {
      headers: {
        "x-auth-token": getState().auth.token,
      },
    };
    try {
      let res = await AxiosInstance.post(
        API_URL + "/product",
        {
          title: title.trim(),
          imageUrl: imageUrl.trim(),
          description: description.trim(),
          price: parseFloat(price.trim()),
        },
        config
      );

      dispatch({
        type: CREATE_PRODUCT,
        payload: {
          id: res.data.response._id,
          addedBy: res.data.response.addedBy,
          status: res.data.response.status,
          title: title.trim(),
          imageUrl: imageUrl.trim(),
          description: description.trim(),
          price: parseFloat(price.trim()),
        },
      });
      return Promise.resolve("ok");
    } catch (error) {
      dispatch({
        type: ERROR_IN_ADD_PRODUCT,
        payload: error.response.data.error,
      });
      return Promise.reject(error.response.data.error);
    }
  };
};
