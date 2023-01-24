const productsService = require('../services/productsService');

const index = async (_req, res) => {
  const products = await productsService.index();
  res.status(200).json(products);
};

const show = async (req, res) => {
  const { id } = req.params;
  const product = await productsService.show(id);

  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.status(200).json(product);
};

const create = async (req, res) => {
  const product = await productsService.create(req.body);

  res.status(201).json(product);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  
  const { type, message } = await productsService.update({ id, name });

  if (type) return res.status(404).json({ message });

  res.status(200).json(message);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.remove(id);

  if (type) return res.status(404).json({ message });

  res.sendStatus(204);
};

const query = async (req, res) => {
  const { q } = req.query;
  let products;

  if (!q) {
    products = await productsService.index();
  } else {
    products = await productsService.query(q.toLowerCase());
  }

  res.status(200).json(products);
};

module.exports = {
  index,
  show,
  create,
  update,
  remove,
  query,
};