import {
  PLACE_ORDER,
  ERROR_IN_PLACE_ORDER,
  FETCH_ORDERS,
  ERROR_IN_FETCH_ORDERS,
  RESET_ORDER_DATA,
} from "../types";
import Order from "../../models/Orders";

const initialState = {
  orders: [],
  success: null,
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case PLACE_ORDER:
      const newOrder = new Order(
        payload.orderId,
        payload.cartItems,
        payload.totalAmount,
        payload.orderedDate
      );
      return {
        ...state,
        orders: state.orders.concat(newOrder),
        success: payload.success,
      };

    case FETCH_ORDERS:
      return {
        ...state,
        orders: payload,
      };

    case ERROR_IN_FETCH_ORDERS:
    case ERROR_IN_PLACE_ORDER:
      return {
        ...state,
        orders: [],
        error: payload,
      };

    default:
      return state;
  }
};
