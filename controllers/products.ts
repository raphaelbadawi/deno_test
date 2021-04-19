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

/*
 * @desc Get single product
 * @route GET /api/v1/products/:id
 */
const getProduct = ({ response }: { response: any }) => {
  response.body = "get";
};

/*
 * @desc Add product
 * @route POST /api/v1/products
 */
const addProduct = ({ response }: { response: any }) => {
  response.body = "add";
};

/*
 * @desc Update product
 * @route PATCH /api/v1/products/:id
 */
const updateProduct = ({ response }: { response: any }) => {
  response.body = "update";
};

/*
 * @desc Delete product
 * @route DELETE /api/v1/products/:id
 */
const deleteProduct = ({ response }: { response: any }) => {
  response.body = "delete";
};

export { getProducts, getProduct, addProduct, updateProduct, deleteProduct };
