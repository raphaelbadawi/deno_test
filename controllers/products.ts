import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { Product } from "../types.ts";
import { Client } from "https://deno.land/x/postgres/mod.ts";
import config from "../config.ts";

// Init client
const client = new Client(config);

// TODO: Get rid of it once database seeded
let products: Product[] = [
  {
    id: "1",
    name: "Cat One",
    description: "This is the first cat on the cat",
    price: 0.99,
  },
  {
    id: "2",
    name: "Cat Two",
    description: "This is the second cat on the cat",
    price: 1.99,
  },
  {
    id: "3",
    name: "Cat Three",
    description: "This is the third cat on the cat",
    price: 2.99,
  },
  {
    id: "4",
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
const getProduct = ({
  params,
  response,
}: {
  params: { id: string };
  response: any;
}) => {
  const product: Product | undefined = products.find((p) => p.id === params.id);
  if (product) {
    response.status = 200;
    response.body = {
      success: true,
      data: product,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: "No matching product found",
    };
  }
};

/*
 * @desc Add product
 * @route POST /api/v1/products
 */
// async keyword because the await keyword is not in the global scope
const addProduct = async ({
  request,
  response,
}: {
  request: any;
  response: any;
}) => {
  const body = await request.body();
  if (!request.hasBody) {
    response.status = 400;
    response.body = {
      success: false,
      msg: "No data",
    };
  } else {
    const product = await body.value;
    try {
      await client.connect();
      const result = await client.queryArray(
        "INSERT INTO products(name, description, price) VALUES ($1, $2, $3)",
        product.name,
        product.description,
        product.price
      );
      response.status = 201;
      response.body = {
        success: true,
        data: product,
      };
    } catch (e) {
      response.status = 500;
      response.body = {
        success: false,
        msg: e.toString(),
      };
    } finally {
      await client.end();
    }
  }
};

/*
 * @desc Update product
 * @route PATCH /api/v1/products/:id
 */
const updateProduct = async ({
  params,
  request,
  response,
}: {
  params: { id: string };
  request: any;
  response: any;
}) => {
  const product: Product | undefined = products.find((p) => p.id === params.id);
  if (product) {
    const body = await request.body();
    const updateData: {
      name?: string;
      description?: string;
      price?: number;
    } = await body.value;
    products = products.map((p) =>
      p.id === params.id ? { ...p, ...updateData } : p
    );
    response.status = 200;
    response.body = {
      success: true,
      data: products,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: "No matching product found",
    };
  }
};

/*
 * @desc Delete product
 * @route DELETE /api/v1/products/:id
 */
const deleteProduct = ({
  params,
  response,
}: {
  params: { id: string };
  response: any;
}) => {
  products = products.filter((p) => p.id !== params.id);
  response.body = {
    success: true,
    msg: "Product removed",
  };
};

export { getProducts, getProduct, addProduct, updateProduct, deleteProduct };
