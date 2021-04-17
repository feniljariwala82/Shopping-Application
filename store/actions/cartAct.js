import { ADD_TO_CART, REMOVE_FROM_CART, COUNT_TOTAL_AMOUNT } from "../types";

export const addToCart = (product) => {
  return {
    type: ADD_TO_CART,
    payload: product,
  };
};

export const countTotalAmount = () => {
  return {
    type: COUNT_TOTAL_AMOUNT,
  };
};
