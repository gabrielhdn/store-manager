const conn = require('./connection');

const create = async (newSale) => {
  const columns = 'sale_id, product_id, quantity';
  const placeholders = newSale.map(() => '(?, ?, ?)').join(',');
  const values = [];

  const [{ insertId }] = await conn.execute(
    'INSERT INTO StoreManager.sales (date) VALUE (NOW())',
  );

  newSale.forEach(({ productId, quantity }) => values.push(insertId, productId, quantity));

  await conn.execute(
    `INSERT INTO StoreManager.sales_products (${columns}) VALUES ${placeholders}`,
    values,
  );

  return insertId;
};

const index = async () => {
  const [sales] = await conn.execute(
    `SELECT
      sp.sale_id AS saleId,
      s.date AS date,
      sp.product_id AS productId,
      sp.quantity AS quantity
    FROM StoreManager.sales_products AS sp
    INNER JOIN StoreManager.sales AS s
    ON sp.sale_id = s.id
    ORDER BY saleId, productId`,
  );

  return sales;
};

const show = async (id) => {
  const [sales] = await conn.execute(
    `SELECT
      s.date AS date,
      sp.product_id AS productId,
      sp.quantity AS quantity
    FROM StoreManager.sales_products AS sp
    INNER JOIN StoreManager.sales AS s
    ON sp.sale_id = s.id
    WHERE sp.sale_id = ?
    ORDER BY sp.sale_id, productId`,
    [id],
  );
  
  return sales;
};

const remove = async (id) => {
  const [{ affectedRows }] = await conn.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?',
    [id],
  );

  return affectedRows;
};

const update = async ({ id, productId, quantity }) => {
  const [{ affectedRows }] = await conn.execute(
    `UPDATE StoreManager.sales_products
    SET quantity = ?
    WHERE sale_id = ?
    AND product_id = ?`,
    [quantity, id, productId],
  );

  return { affectedRows };
};

module.exports = {
  create,
  index,
  show,
  remove,
  update,
};