import { PLACE_ORDER, CANCEL_ORDER } from "../types";
import Order from "../../models/Orders";
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";

const initialState = {
  orders: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case PLACE_ORDER:
      const newOrder = new Order(
        uuid(),
        payload.cartItems,
        payload.totalAmount,
        new Date()
      );
      return {
        ...state,
        orders: state.orders.concat(newOrder),
      };

    default:
      return state;
  }
};
