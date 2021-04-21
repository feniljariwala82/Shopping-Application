import { PLACE_ORDER, CANCEL_ORDER } from "../types";

export const placeOrder = (cartItems, totalAmount) => {
  return {
    type: PLACE_ORDER,
    payload: {
      cartItems,
      totalAmount,
    },
  };
};

export const cancelOrder = () => {
  return {
    type: CANCEL_ORDER,
  };
};
