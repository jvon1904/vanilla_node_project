const { pool } = require("../config/db");

// #Create POST /products
async function create({ name, description, price }) {
  const query = `INSERT INTO products (name, description, price)
                 VALUES ( $1, $2, $3)
                 RETURNING id, name, description, price`;
  try {
    const result = await pool.query(query, [name, description, price]);
    return {
      success: true,
      method: result.command,
      data: result.rows,
    };
  } catch (error) {
    return {
      success: false,
      message: error,
    };
  }
}

// #Index GET /products
async function all() {
  const query = `SELECT * FROM products ORDER BY id;`;
  try {
    const result = await pool.query(query);
    console.log(result.rows);

    return {
      success: true,
      method: result.command,
      data: result.rows,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error,
    };
  }
}

// #Show GET /products/:id
async function find(id) {
  const query = `SELECT * FROM products WHERE products.id = $1`;
  try {
    const result = await pool.query(query, [id]);
    return {
      success: true,
      method: result.command,
      data: result.rows,
    };
  } catch (error) {
    return {
      success: false,
      message: error,
    };
  }
}

// PUT /products/:id
async function update(id, { name, description, price }) {
  let query = `UPDATE products SET name = $1, description = $2, price = $3
               WHERE id = $4
               RETURNING id, name, description, price`;
  try {
    const result = await pool.query(query, [name, description, price, id]);
    return {
      success: true,
      method: result.command,
      data: result.rows,
    };
  } catch (error) {
    return {
      success: false,
      message: error,
    };
  }
}

// DELETE  /products/:id
async function remove(id) {
  let query = `DELETE FROM products WHERE id = $1
               RETURNING id, name, description, price`;
  try {
    const result = await pool.query(query, [id]);
    return {
      success: true,
      method: result.command,
      data: result.rows,
    };
  } catch (error) {
    return {
      success: false,
      message: error,
    };
  }
}

module.exports = {
  create,
  all,
  find,
  update,
  remove,
};
