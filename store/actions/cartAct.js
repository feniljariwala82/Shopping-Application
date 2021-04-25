import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  COUNT_TOTAL_AMOUNT,
  CLEAR_CART,
} from "../types";

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

export const deleteFromCart = (id) => {
  return {
    type: REMOVE_FROM_CART,
    payload: id,
  };
};

export const clearCart = () => {
  return {
    type: CLEAR_CART,
  };
};
