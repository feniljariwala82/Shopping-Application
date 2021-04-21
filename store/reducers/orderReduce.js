import { PLACE_ORDER, CANCEL_ORDER } from "../types";
import Order from "../../models/Orders";
import { uuid4 as uuid } from "uuid";

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
        new Date().toString()
      );
      return { ...state, orders: newOrder };

    default:
      return state;
  }
};
