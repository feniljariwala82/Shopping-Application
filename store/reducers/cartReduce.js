import {
  ADD_TO_CART,
  COUNT_TOTAL_AMOUNT,
  REMOVE_FROM_CART,
  CLEAR_CART,
} from "../types";

const initialState = {
  cartItems: [],
  totalAmount: 0,
};

/**
 *
 * @param {array} dataArray
 * @returns total amount
 */
const amountCalculator = (dataArray) => {
  let amount = 0;
  dataArray.forEach((element) => {
    amount += element.price;
  });
  return amount.toFixed(2);
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_TO_CART:
      const addedProduct = payload; // payload contains new product data
      return {
        ...state,
        cartItems: state.cartItems.some(
          (product) => product.id === addedProduct.id
        )
          ? state.cartItems
          : state.cartItems.concat(addedProduct),
      };

    case COUNT_TOTAL_AMOUNT:
      return {
        ...state,
        totalAmount: amountCalculator(state.cartItems),
      };

    case REMOVE_FROM_CART:
      const updatedCartItems = (payload) => {
        for (let i = 0; i < state.cartItems.length; i++) {
          if (state.cartItems[i].id === payload) {
            state.cartItems.splice(i, 1);
          }
        }
      };
      updatedCartItems(payload);
      return {
        ...state,
        cartItems: state.cartItems,
        totalAmount: amountCalculator(state.cartItems),
      };

    case CLEAR_CART:
      return {
        cartItems: [],
        totalAmount: 0,
      };

    default:
      return state;
  }
};
