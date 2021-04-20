import { Product } from "../types.ts";
import { Client } from "https://deno.land/x/postgres/mod.ts";
import config from "../config.ts";

// Init client
const client = new Client(config);

/*
 * @desc Get all products
 * @route GET /api/v1/products
 */
const getProducts = async ({ response }: { response: any }) => {
  try {
    await client.connect();
    const result = await client.queryArray("SELECT * FROM products");
    const products: any[] = [];
    result.rows.map((p) => {
      let obj: any = {};
      result.rowDescription?.columns.map((el, i) => {
        obj[el.name] = p[i];
      });
      products.push(obj);
    });
    response.body = {
      success: true,
      data: products,
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
};

/*
 * @desc Get single product
 * @route GET /api/v1/products/:id
 */
const getProduct = async ({
  params,
  response,
}: {
  params: { id: string };
  response: any;
}) => {
  try {
    await client.connect();
    const result = await client.queryArray(
      "SELECT * FROM products WHERE id = $1",
      params.id
    );
    if (result.rows.toString() === "") {
      response.status = 404;
      response.body = {
        success: false,
        msg: `No product found with the id ${params.id}`,
      };
    } else {
      const product: any = {};
      result.rows.map((p) => {
        result.rowDescription?.columns.map((el, i) => {
          product[el.name] = p[i];
        });
      });
      response.body = {
        success: true,
        data: product,
      };
    }
  } catch (e) {
    response.status = 500;
    response.body = {
      success: false,
      msg: e.toString(),
    };
  } finally {
    await client.end();
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
  await getProduct({ params: { id: params.id }, response });
  if (response.status === 404) {
    return;
  } else {
    const body = await request.body();
    if (!request.hasBody) {
      response.status = 400;
      response.body = {
        success: false,
        msg: "No data",
      };
    } else {
      const product = await body.value;
      console.log(product);
      try {
        await client.connect();
        const result = await client.queryArray(
          "UPDATE products SET name = $1, description = $2, price = $3 WHERE id = $4",
          product.name || response.body.data.name,
          product.description || response.body.data.description,
          product.price || response.body.data.price,
          params.id
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
  }
};

/*
 * @desc Delete product
 * @route DELETE /api/v1/products/:id
 */
const deleteProduct = async ({
  params,
  response,
}: {
  params: { id: string };
  response: any;
}) => {
  await getProduct({ params: { id: params.id }, response });
  if (response.status === 404) {
    return;
  } else {
    try {
      await client.connect();
      const result = await client.queryArray(
        "DELETE FROM products WHERE id = $1",
        params.id
      );
      response.body = {
        success: true,
        msg: `Product with id ${params.id} deleted`,
      };
      response.status = 204;
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

export { getProducts, getProduct, addProduct, updateProduct, deleteProduct };
