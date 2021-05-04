import { CREATE_PRODUCT } from "../types";

export const createProduct = (title, imageUrl, description, price) => {
  return {
    type: CREATE_PRODUCT,
    payload: {
      title,
      imageUrl,
      description,
      price: parseFloat(price),
    },
  };
};
