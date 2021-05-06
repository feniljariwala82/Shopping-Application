import PRODUCTS from "../../data/dummy-data";
import {
  CREATE_PRODUCT,
  ERROR_IN_ADD_PRODUCT,
  FETCH_PRODUCTS,
  ERROR_IN_FETCH_PRODUCTS,
} from "../types";
import Product from "../../models/Product";

const initialState = {
  availableProducts: null,
  userProducts: null,
  error: null,
  success: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    /**
     * Add new product
     */
    case CREATE_PRODUCT:
      const newProduct = new Product(
        payload.id,
        payload.addedBy,
        payload.title,
        payload.imageUrl,
        payload.description,
        payload.price
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
        success: payload.status,
      };

    /**
     * Error in adding new product
     */
    case ERROR_IN_ADD_PRODUCT:
      return {
        ...state,
        error: payload,
      };

    /**
     * Fetching all the products
     */
    case FETCH_PRODUCTS:
      return {
        ...state,
        availableProducts: payload,
        userProducts: payload.filter((prod) => prod.addedBy === "u1"),
        error: null,
        success: null,
      };

    /**
     * Fetching error
     */
    case ERROR_IN_FETCH_PRODUCTS:
      return {
        ...state,
        availableProducts: null,
        userProducts: null,
        error: payload,
      };

    default:
      return state;
  }
};
