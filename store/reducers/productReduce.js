import PRODUCTS from "../../data/dummy-data";
import { CREATE_PRODUCT } from "../types";
import Product from "../../models/Product";
import { v4 as uuid } from "uuid";

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((prod) => prod.id === "u1"),
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    /**
     * Add new product
     */
    case CREATE_PRODUCT:
      const newProduct = new Product(
        uuid(),
        "u1",
        payload.title,
        payload.imageUrl,
        payload.description,
        payload.price
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      };

    default:
      return state;
  }
};
