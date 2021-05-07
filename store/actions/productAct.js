import axios from "axios";
import {
  CREATE_PRODUCT,
  ERROR_IN_ADD_PRODUCT,
  FETCH_PRODUCTS,
  ERROR_IN_FETCH_PRODUCTS,
} from "../types";
import { API_URL } from "../Defaults";

export const getAllProducts = () => {
  return async (dispatch) => {
    try {
      let res = await axios.get(API_URL + "/product");
      dispatch({
        type: FETCH_PRODUCTS,
        payload: res.data.response,
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
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      let res = await axios.post(
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
