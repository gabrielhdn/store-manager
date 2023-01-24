const salesService = require('../services/salesService');
const errorMap = require('../utils/errorMap');

const create = async (req, res) => {
  const { type, message } = await salesService.create(req.body);

  if (type) return res.status(errorMap(type)).json({ message });
  
  res.status(201).json(message);
};

const index = async (_req, res) => {
  const result = await salesService.index();
  res.status(200).json(result);
};

const show = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.show(id);

  if (type) return res.status(errorMap(type)).json({ message });

  res.status(200).json(message);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.remove(id);

  if (type) return res.status(errorMap(type)).json({ message });

  res.sendStatus(204);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.update(id, req.body);

  if (type) return res.status(errorMap(type)).json({ message });

  res.status(200).json(message);
};

module.exports = {
  create,
  index,
  show,
  remove,
  update,
};