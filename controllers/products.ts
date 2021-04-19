import { Product } from "../types.ts";

let products: Product[] = [
  {
    id: 1,
    name: "Cat One",
    description: "This is the first cat on the cat",
    price: 0.99,
  },
  {
    id: 2,
    name: "Cat Two",
    description: "This is the second cat on the cat",
    price: 1.99,
  },
  {
    id: 1,
    name: "Cat Three",
    description: "This is the third cat on the cat",
    price: 2.99,
  },
  {
    id: 1,
    name: "Cat Four",
    description: "This is the fourth cat on the cat",
    price: 3.99,
  },
];

/*
 * @desc Get all products
 * @route GET /api/v1/products
 */
const getProducts = ({ response }: { response: any }) => {
  response.body = {
    success: true,
    data: products,
  };
};

export { getProducts };
