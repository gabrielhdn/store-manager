const conn = require('./connection');

const index = async () => {
  const [products] = await conn.execute(
    'SELECT * FROM StoreManager.products',
    [],
  );

  return products;
};

const show = async (id) => {
  const [product] = await conn.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );

  return product[0];
};

const create = async (product) => {
  const [{ insertId }] = await conn.execute(
    'INSERT INTO StoreManager.products (name) VALUE (?)',
    [product],
  );

  return insertId;
};

const update = async ({ id, name }) => {
  const [{ affectedRows }] = await conn.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?',
    [name, id],
  );

  return affectedRows;
};

const remove = async (id) => {
  const [{ affectedRows }] = await conn.execute(
    'DELETE FROM StoreManager.products WHERE id = ?',
    [id],
  );

  return affectedRows;
};

const query = async (name) => {
  const [products] = await conn.execute(
    `SELECT * FROM StoreManager.products WHERE LOWER(name) LIKE '%${name}%'`,
  );
  
  return products;
};

module.exports = {
  index,
  show,
  create,
  update,
  remove,
  query,
};