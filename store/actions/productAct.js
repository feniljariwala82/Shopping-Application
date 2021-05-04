import axios from "axios";
import { CREATE_PRODUCT, ERROR_IN_ADD_PRODUCT } from "../types";

export const createProduct = (title, imageUrl, description, price) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      let res = await axios.post(
        "/api/product/",
        { title, imageUrl, description, price },
        config
      );
      dispatch({
        type: CREATE_PRODUCT,
        payload: {
          title,
          imageUrl,
          description,
          price: parseFloat(price),
        },
      });
    } catch (error) {
      dispatch({
        type: ERROR_IN_ADD_PRODUCT,
      });
    }
  };
};
