const productsModel = require('../models/productsModel');

const index = async () => {
  const products = await productsModel.index();
  return products;
};

const show = async (id) => {
  const product = await productsModel.show(id);
  return product;
};

const create = async ({ name }) => {
  const id = await productsModel.create(name);
  return { id, name };
};

const update = async (data) => {
  const affectedRows = await productsModel.update(data);
  
  if (!affectedRows) return { type: 'NOT_FOUND', message: 'Product not found' };
  return { type: null, message: data };
};

const remove = async (id) => {
  const affectedRows = await productsModel.remove(id);

  if (!affectedRows) return { type: 'NOT_FOUND', message: 'Product not found' };
  return { type: null, message: '' };
};

const query = async (name) => {
  const products = await productsModel.query(name);
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