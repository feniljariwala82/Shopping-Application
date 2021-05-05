import axios from "axios";
import { CREATE_PRODUCT, ERROR_IN_ADD_PRODUCT } from "../types";
import { API_URL } from "../DefaultData";

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
        { title, imageUrl, description, price: parseFloat(price) },
        config
      );
      dispatch({
        type: CREATE_PRODUCT,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: ERROR_IN_ADD_PRODUCT,
        payload: error.response.data,
      });
    }
  };
};
